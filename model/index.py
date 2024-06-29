import json, asyncio , pafy, base64, io
import reactivex as rx
from utils import create_camera, jam_level, get_image, VideoCapture
from reactivex.operators import map, start_with
from ultralytics import YOLO
from PIL import Image
import supervision as sv

from cv2.typing import MatLike

from dotenv import load_dotenv
load_dotenv("./env/.env")
from utils import FrameContext, Camera, CameraType

from services.producer import Producer
STREAMING_TOPIC = "camera.streaming"
UPDATE_TOPIC = "camera.update"
IMAGE_INTERVAL = 12
VIDEO_INTERVAL = 1

def publish_frame(context: FrameContext):
  producer.produce(STREAMING_TOPIC, context.frame, key=context.camera_id)
  producer.produce(UPDATE_TOPIC, context.to_json())
  producer.flush()

def predict(id: str, city: str, image: MatLike) -> bytes:
  result = model(image)[0]
  detections = sv.Detections.from_ultralytics(result)

  vehicle_info = {
      0: {'count': 0},  # motorbike
      1: {'count': 0}   # car
  }

  for class_id in detections.class_id:
    vehicle_info[class_id]['count'] += 1

  num_motor = vehicle_info[0]['count']
  num_car = vehicle_info[1]['count']
  jam = jam_level(num_motor, num_car)

  result = model.predict(image)
  bgr_array = result[0].plot()
  rgb_array = bgr_array[..., ::-1]
  predicted_image = Image.fromarray(rgb_array)

  output = io.BytesIO()
  predicted_image.save(output, format="jpeg")
  frame = base64.b64encode(output.getvalue())
  return FrameContext(id, city, frame, num_motor, num_car, jam)

def handle_image(camera: Camera):
  subject = rx.Subject()
  subject.subscribe(publish_frame)

  rx.interval(IMAGE_INTERVAL).pipe(
      start_with(0),
      map(lambda _: get_image(camera)),
      map(lambda image: predict(camera.id, camera.city, image)),
  ).subscribe(subject)

def handle_video(camera: Camera):
  url = f"https://www.youtube.com/watch?v={camera.src}"
  video = pafy.new(url)
  best = video.getbest(preftype="mp4")
  cap = VideoCapture(best.url)

  subject = rx.Subject()
  subject.subscribe(publish_frame)

  rx.interval(VIDEO_INTERVAL).pipe(
      start_with(0),
      map(lambda _: cap.read()),
      map(lambda image: predict(camera.id, camera.city, image))
  ).subscribe(subject)

if __name__ == '__main__':
  loop = asyncio.new_event_loop()

  with open('mock/cameras.mock.json') as f:
    data = json.load(f)

  producer = Producer()
  model = YOLO("weight/best.pt")

  for item in data:
    camera = create_camera(item)
    if camera.type == CameraType.VIDEO:
      handle_video(camera)
    else:
      handle_image(camera)

  # camera = create_camera(data[-1])
  # handle_video(camera)

  loop.run_forever()    