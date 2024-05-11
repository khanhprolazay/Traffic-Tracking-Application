
import cv2
import numpy as np
import reactivex as rx
import supervision as sv
from reactivex.operators import map
from inference.models.utils import get_roboflow_model
from utils import ViewTransformer, Topic, FrameWithTime, ApplicationArgument, parse_argument, get_time, encode_frame

from dotenv import load_dotenv
from services.producer import Producer

load_dotenv("./env/.env")

INTERVAL = 12 # Update the street image after running model each 12s
SOURCE = np.array([
    [1252, 787],
    [2298, 803],
    [5039, 2159],
    [-550, 2159]
]) # 

TARGET_WITDH = 25 # Chiều rộng mục tiêu
TARGET_HEIGHT = 250 # Chiều cao mục tiêu

TARGET = np.array([
    [0, 0],
    [TARGET_WITDH -1, 0],
    [TARGET_WITDH -1, TARGET_HEIGHT-1],
    [0, TARGET_HEIGHT-1]
])

def process_frame(frame):
    time = get_time()

    result = model.infer(frame)[0]    
    detections = sv.Detections.from_inference(result)   
    detections = detections[pylogon_zone.trigger(detections)]
    detections = byte_track.update_with_detections(detections)

    points = detections.get_anchors_coordinates(anchor=sv.Position.BOTTOM_CENTER)
    points = view_transformer.transform_points(points).astype(int)

    annotated_frame = frame
    annotated_frame = sv.draw_polygon(annotated_frame, SOURCE, color=sv.Color.RED, thickness=2)
    annotated_frame = bounding_box_annotator.annotate(
        scene=annotated_frame, detections=detections)
    annotated_frame = label_annotator.annotate(
        scene=annotated_frame, detections=detections)

    annotated_frame = cv2.resize(annotated_frame, None, fx=scale, fy=scale)
    return FrameWithTime(annotated_frame, time)

def show_frame(ft: FrameWithTime):
    cv2.imshow('frame', ft.frame)
    cv2.waitKey(1)

def publish_frame(ft: FrameWithTime):
    global last_update_time

    if ft.time - last_update_time >= INTERVAL:
        last_update_time = ft.time
        base64_frame = encode_frame(ft.frame)
        producer.produce(Topic.STREET_STREAMING_IMAGE.value, base64_frame)
        producer.flush()
        print(f"Publishing frame at {ft.time} with size {len(base64_frame)} bytes")

if __name__ == "__main__":
    global last_update_time

    arg = ApplicationArgument(name="--input_video", required=True, help="Path to the input video file")
    args = parse_argument([arg])    
  
    video_info = sv.VideoInfo.from_video_path(args.input_video)
    model = get_roboflow_model('yolov8s-640')
    byte_track = sv.ByteTrack(frame_rate=video_info.fps)

    thickness = sv.calculate_dynamic_line_thickness(resolution_wh=video_info.resolution_wh)
    text_scale = sv.calculate_dynamic_text_scale(resolution_wh=video_info.resolution_wh)
    bounding_box_annotator = sv.BoundingBoxAnnotator(thickness=thickness) #
    label_annotator = sv.LabelAnnotator(text_scale=text_scale) #

    frame_generator = sv.get_video_frames_generator(args.input_video)

    pylogon_zone = sv.PolygonZone(SOURCE, video_info.resolution_wh)
    view_transformer = ViewTransformer(SOURCE, TARGET)
   
    screen_res = 1280, 720  # Thay đổi kích thước này phù hợp với kích thước màn hình của bạn
    scale_width = screen_res[0] / video_info.resolution_wh[0]
    scale_height = screen_res[1] / video_info.resolution_wh[1]
    scale = min(scale_width, scale_height)

    producer = Producer()
    last_update_time = get_time() - INTERVAL

    subject = rx.Subject()
    subject.subscribe(publish_frame)
    subject.subscribe(show_frame)

    rx.from_iterable(frame_generator).pipe(map(process_frame)).subscribe(subject)


# python main.py --input_video C:\Users\TotNguyen\Desktop\khoa-luan\input\vehicles.mp4
# python main.py --input_video D:\video\1min.mp4