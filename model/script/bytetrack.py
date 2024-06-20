import cv2
import pafy
import numpy as np
from inference.models.utils import get_roboflow_model, get_model
import supervision as sv
from collections import defaultdict, deque
from ultralytics import YOLO
import argparse
import time

TARGET_WITDH = 8 # Chiều rộng mục tiêu (8 mét)
TARGET_HEIGHT = 30 # Chiều dài mục tiêu (30 mét)
AREA = TARGET_WITDH * TARGET_HEIGHT # Diện tích


SOURCE = np.array([
    [1070, 305], #1070, 310
    [1458, 369], # 1458, 369
    [924, 892], # 924, 892
    [140, 518]  # 128, 518
]) # 

SOURCE1 = np.array([
    [884, 317], #1070, 310
    [1110, 265], # 1458, 369
    [1909, 666], # 924, 892
    [1294, 1045]  # 128, 518
]) # 


TARGET = np.array([
    [0, 0],
    [TARGET_WITDH -1, 0],
    [TARGET_WITDH -1, TARGET_HEIGHT-1],
    [0, TARGET_HEIGHT-1]
])


font = cv2.FONT_HERSHEY_SIMPLEX
font_scale = 1
font_color = (255, 255, 255)
line_type = 2


class ViewTransformer:
    def __init__(self, source: np.array, target: np.ndarray):
        source = source.astype(np.float32)
        target = target.astype(np.float32)
        self.m = cv2.getPerspectiveTransform(source, target)

    def transform_points(self, points: np.array) -> np.array: 
        reshaped_points = points.reshape(-1, 1, 2).astype(np.float32) # Chuyển đổi điểm thành mảng 3 chiều 
        transformed_points = cv2.perspectiveTransform(reshaped_points, self.m) 

        if transformed_points is None:
            return None
        return transformed_points.reshape(-1, 2)

def parse_argument() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Supervision")
    parser.add_argument("--source_path", type=str, required=True, help="Path to the source video file")
    return parser.parse_args()

def click_event(event, x, y, flags, param):
    if event == cv2.EVENT_LBUTTONDOWN:
        print(f'Clicked at ({x}, {y})')

def process_frame(frame):
    cv2.namedWindow('frame', cv2.WINDOW_NORMAL)
    cv2.setMouseCallback('frame', click_event)
    cv2.namedWindow("annotated_frame", cv2.WINDOW_NORMAL)
    cv2.imshow('frame', frame)

def setup_model_and_annotators(size, fps):
    model =  YOLO("../weight/best.pt") # Load model
    byte_track = sv.ByteTrack(frame_rate=fps) # để theo dõi các đối tượng qua các frame
    thickness = sv.calculate_dynamic_line_thickness(resolution_wh=size) # Tính toán độ dày của đường
    text_scale = sv.calculate_dynamic_text_scale(resolution_wh=size)  # Tính toán tỉ lệ văn bản động
    bounding_box_annotator = sv.BoundingBoxAnnotator(thickness=thickness, color_lookup=sv.ColorLookup.TRACK) # để vẽ bounding box
    label_annotator = sv.LabelAnnotator(text_scale=text_scale, text_thickness=thickness, text_position=sv.Position.BOTTOM_CENTER, color_lookup=sv.ColorLookup.TRACK) # để vẽ nhãn
    trace_annotator = sv.TraceAnnotator(thickness=thickness, trace_length=fps * 2, position=sv.Position.BOTTOM_CENTER, color_lookup=sv.ColorLookup.TRACK) # để vẽ đường dẫn
    polygon_zone = sv.PolygonZone(SOURCE, frame_resolution_wh=size) # để xác định vùng quan tâm
    view_transformer = ViewTransformer(SOURCE, TARGET) # để chuyển đổi tọa độ
    coordinates = defaultdict(lambda: deque(maxlen=fps)) # để lưu trữ tọa độ của các đối tượng
    return model, byte_track, bounding_box_annotator, label_annotator, trace_annotator, polygon_zone, view_transformer, coordinates # Trả về model và các annotators

## url utube path
def setup_video_capture(url):
    video = pafy.new(url) # Load video
    best = video.getbest(preftype="mp4") # Chọn chất lượng tốt nhất
    cap = cv2.VideoCapture(best.url) # Mở video bằng OpenCV
    w, h, fps = (int(cap.get(x)) for x in (cv2.CAP_PROP_FRAME_WIDTH, cv2.CAP_PROP_FRAME_HEIGHT, cv2.CAP_PROP_FPS)) # Lấy thông số của video
    size = (w, h) # Kích thước video
    print(f"Video size: {size}, fps: {fps}")
    return cap, size, fps  # Trả về video, kích thước và fps


## video path
# def setup_video_capture(video_path):
#     cap = cv2.VideoCapture(video_path)
#     w, h, fps = (int(cap.get(x)) for x in (cv2.CAP_PROP_FRAME_WIDTH, cv2.CAP_PROP_FRAME_HEIGHT, cv2.CAP_PROP_FPS)) 
#     size = (w, h) 
#     print(f"Video size: {size}, fps: {fps}")
#     return cap, size, fps  #

def calculate_traffic_level(vehicle_info, avg_speeds):
    density_motorbikes = vehicle_info[0]['count'] / AREA
    density_cars = vehicle_info[1]['count']  / AREA

    avg_speed_motorbikes = avg_speeds[0]
    avg_speed_cars = avg_speeds[1]

    if (density_motorbikes > 0.4 or density_cars > 0.06):
        return "Severe congestion"
    elif (0.2 <= density_motorbikes <= 0.4 or 0.03 <= density_cars <= 0.06):
        return "Slow traffic"
    else:
        return "Normal traffic"
    # if (density_motorbikes > 0.4 or density_cars > 0.06) and (avg_speed_motorbikes < 10 or avg_speed_cars < 15):
    #     return "Severe congestion"
    # elif (density_motorbikes > 0.4 or density_cars > 0.06) and (10 <= avg_speed_motorbikes <= 20 or 15 <= avg_speed_cars <= 25):
    #     return "Light congestion"
    # elif (0.2 <= density_motorbikes <= 0.4 or 0.03 <= density_cars <= 0.06) and (avg_speed_motorbikes < 10 or avg_speed_cars < 15):
    #     return "Light congestion"
    # elif (0.2 <= density_motorbikes <= 0.4 or 0.03 <= density_cars <= 0.06) and (10 <= avg_speed_motorbikes <= 20 or 15 <= avg_speed_cars <= 25):
    #     return "Slow traffic"
    # else:
    #     return "Normal traffic"
    

def process_detections(detections, coordinates, fps, view_transformer):
    vehicle_info = {
        0: {'count': 0, 'total_speed': 0},  # motorbike
        1: {'count': 0, 'total_speed': 0}   # car
    }

    points = detections.get_anchors_coordinates(sv.Position.BOTTOM_CENTER) # Lấy tọa độ của các đối tượng
    transformed_points = view_transformer.transform_points(points) # Chuyển đổi tọa độ
    if transformed_points is not None:   
        points = transformed_points.astype(np.int32)

    labels = []

    for class_id, tracker_id, [_,y] in zip(detections.class_id, detections.tracker_id, points):
        coordinates[tracker_id].append(y)
        if len(coordinates[tracker_id]) < fps /2:
            labels.append(f"id:{tracker_id}, cls:{class_id}")
        else:
            coordinates_start = coordinates[tracker_id][-1]
            coordinates_end = coordinates[tracker_id][0]
            distance = abs(coordinates_start - coordinates_end)
            time = len(coordinates[tracker_id]) / fps
            speed = distance / time * 3.6
            labels.append(f"id:{tracker_id}, cls:{class_id} {speed:.2f} km/h") #km/h

            # Update count and total speed for the vehicle type
            vehicle_info[class_id]['count'] += 1
            vehicle_info[class_id]['total_speed'] += speed

        #     total_speed += speed
        # num_objects += 1
    
    # Calculate average speed and determine traffic level for each vehicle type
    avg_speeds = {}
    for vehicle_type, info in vehicle_info.items():
        if info["count"] > 0:  
            avg_speeds[vehicle_type] = info["total_speed"] / info["count"]
        else:
            avg_speeds[vehicle_type] = 0

    traffic_level = calculate_traffic_level(vehicle_info, avg_speeds)

    return vehicle_info, traffic_level, labels

    """
        traffic_level = {}
        if vehicle_info[0]['count'] > 0 or vehicle_info[1]['count'] > 0:
            avg_speed_motorbikes = vehicle_info[0]['total_speed'] / vehicle_info[0]['count']
            avg_speed_cars = vehicle_info[1]['total_speed'] / vehicle_info[1]['count']
            traffic_level['traffic'] = calculate_traffic_level(vehicle_info[0]['count'], vehicle_info[1]['count'], avg_speed_motorbikes, avg_speed_cars)
        return vehicle_info[0]['count'], vehicle_info[1]['count'], traffic_level,  labels

        # vehicle_info = {
        #     '0': {'count': 5, 'total_speed': 300},
        #     '1': {'count': 3, 'total_speed': 180}
        # }
        # avge_speed = {
        #     '0': 60.0,  # 300 / 5
        #     '1': 60.0  # 180 / 3
        # }
    """
def annotate_and_display_frame(size, frame, detections, num_motor_text, num_car_text,traffic_level, trace_annotator, bounding_box_annotator, label_annotator, labels):
    annotated_frame = frame.copy()
    annotated_frame = sv.draw_polygon(annotated_frame, SOURCE, color=sv.Color.RED)
    annotated_frame = trace_annotator.annotate(annotated_frame, detections) 
    annotated_frame = bounding_box_annotator.annotate(annotated_frame, detections) 
    annotated_frame = label_annotator.annotate(annotated_frame, detections, labels) 
    # cv2.putText(annotated_frame, avg_speed_text, (10, 30), font, font_scale, font_color, line_type)n
    # cv2.putText(annotated_frame, num_objects_text, (10, 60), font, font_scale, font_color, line_type) 
    cv2.putText(annotated_frame, traffic_level, (10, 90), font, font_scale, font_color, line_type) 
    cv2.putText(annotated_frame, num_motor_text, (10, 120), font, font_scale, font_color, line_type) 
    cv2.putText(annotated_frame, num_car_text, (10, 150), font, font_scale, font_color, line_type) 
    cv2.namedWindow("annotated_frame", cv2.WINDOW_NORMAL) 
    cv2.resizeWindow('annotated_frame', size[0], size[1])

    cv2.imshow("annotated_frame", annotated_frame) 

def stream_video(url):
    cap, size, fps = setup_video_capture(url)
    model, byte_track, bounding_box_annotator, label_annotator, trace_annotator, polygon_zone, view_transformer, coordinates = setup_model_and_annotators(size, fps)
    
    while True:
        ret, frame = cap.read()
        if not ret:
            break
            # time.sleep(1)  # wait for 1 second before retrying
            # continue

        result = model(frame)[0]
        detections = sv.Detections.from_ultralytics(result)
        detections = detections[polygon_zone.trigger(detections)]
        detections = byte_track.update_with_detections(detections)
    
        vehicle_info, traffic_level, labels= process_detections(detections, coordinates, fps, view_transformer)
        num_motor = vehicle_info[0]['count']
        num_car = vehicle_info[1]['count']

        num_objects_text = f"So luong xe: {num_motor + num_car}"
        num_motor_text = f"So luong xe may: {num_motor}"
        num_car_text = f"So luong xe oto: {num_car}"
        traffic_level_text = f"Muc do un tac: {traffic_level}"

        annotate_and_display_frame(size,frame, detections,num_motor_text, num_car_text, traffic_level_text, trace_annotator, bounding_box_annotator, label_annotator, labels)
        # process_frame(frame)
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

            # time.sleep(2)  # wait for 5 seconds before retrying

    cap.release()
    cv2.destroyAllWindows()

if __name__ == "__main__":
    args = parse_argument()
    try:
        stream_video(args.source_path)
    except Exception as e:
        print(f"Error reading from stream: {e}")


#num_motor
#num_car
#average_speed

# youtube_url_1 = 'https://www.youtube.com/watch?v=Fu3nDsqC1J0' 
# youtube_url_2 = 'https://www.youtube.com/watch?v=8vHp9b8ZlJc'
# video_url = '../video/video1.mp4'
# python bytetrack.py --source_path  ../video/video1.mp4
# "C:\Users\TotNguyen\Desktop\khoa-luan\py310\Scripts\activate"
# python bytetrack.py --source_path  https://www.youtube.com/watch?v=Fu3nDsqC1J0
