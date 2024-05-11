import json
import pafy
import cv2
import asyncio
import numpy as np
import urllib.request
import reactivex as rx
from utils import create_camera
from reactivex.operators import map, start_with

from dotenv import load_dotenv
load_dotenv("./env/.env")
from utils import FrameContext, Camera, CameraType, encode_frame

from services.producer import Producer
TOPIC = "street.streaming"
INTERVAL = 12

def publish_frame(context: FrameContext):
  producer.produce(TOPIC, context.frame, key=context.camera_id)
  producer.flush()

def get_image(camera: Camera):
  url = f"http://giaothong.hochiminhcity.gov.vn/render/ImageHandler.ashx?id={camera.id}"
  resp = urllib.request.urlopen(url)
  image = np.asarray(bytearray(resp.read()), dtype=np.uint8)
  image = cv2.imdecode(image, -1)
  return image

def handle_video(camera: Camera):
  url = f"https://www.youtube.com/watch?v={camera.src}"
  video = pafy.new(url)
  best = video.getbest(preftype="mp4")
  cap = cv2.VideoCapture(best.url)

  subject = rx.Subject()
  subject.subscribe(publish_frame)

  rx.interval(INTERVAL).pipe(
      start_with(0),
      map(lambda _: cap.read()[1]),
      map(encode_frame),
      map(lambda frame: FrameContext(frame, camera.id))
  ).subscribe(subject)

def handle_image(camera: Camera):
  subject = rx.Subject()
  subject.subscribe(publish_frame)

  rx.interval(INTERVAL).pipe(
      start_with(0),
      map(lambda _: get_image(camera)),
      map(encode_frame),
      map(lambda frame: FrameContext(frame, camera.id))
  ).subscribe(subject)

if __name__ == '__main__':
  loop = asyncio.new_event_loop()

  with open('mock/cameras.mock.json') as f:
    data = json.load(f)

  producer = Producer()

  for item in data[0:4]:
    camera = create_camera(item)
    if camera.type == CameraType.VIDEO:
      handle_video(camera)
    else:
      handle_image(camera)

  loop.run_forever()
    