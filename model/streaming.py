import cv2
import pafy
import numpy as np
from inference.models.utils import get_roboflow_model, get_model
import supervision as sv
from collections import defaultdict, deque
from ultralytics import YOLO
import argparse

SOURCE = np.array([
    [1065, 305], #1070, 310
    [1458, 369], # 1458, 369
    [924, 892], # 924, 892
    [123, 508]  # 128, 518
]) # 

TARGET_WITDH = 8 # Chiều rộng mục tiêu
TARGET_HEIGHT = 25 # Chiều dài mục tiêu
AREA = 200 # Diện tích

TARGET = np.array([
    [0, 0],
    [TARGET_WITDH -1, 0],
    [TARGET_WITDH -1, TARGET_HEIGHT-1],
    [0, TARGET_HEIGHT-1]
])



class ViewTransformer:
    def __init__(self, source: np.array, target: np.ndarray):
        source = source.astype(np.float32)
        target = target.astype(np.float32)
        self.m = cv2.getPerspectiveTransform(source, target)

    def transform_points(self, points: np.array) -> np.array: 
        reshaped_points = points.reshape(-1, 1, 2).astype(np.float32) # Chuyển đổi điểm thành mảng 3 chiều 
        transformed_points = cv2.perspectiveTransform(reshaped_points, self.m) 
        # Check if the transformation was successful
        
        if transformed_points is None:
            return None
        return transformed_points.reshape(-1, 2)

def parse_argument() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Supervision")
    parser.add_argument("--source_video_path", type=str, required=True, help="Path to the source video file")
    return parser.parse_args()

def click_event(event, x, y, flags, param):
    if event == cv2.EVENT_LBUTTONDOWN:
        print(f'Clicked at ({x}, {y})')

def process_frame(frame):
    # Get the screen size
    window_width = 1920
    window_height = 1080

    # cv2.WINDOW_NORMAL makes the output window resizealbe
    cv2.namedWindow('frame', cv2.WINDOW_NORMAL)

    # Resize the window to the specified size
    cv2.resizeWindow('frame', window_width, window_height)


    # Set the mouse callback function to `click_event`
    cv2.setMouseCallback('frame', click_event)

    cv2.imshow('frame', frame)

def check_jam_traffic(nums, avg_speed):
    density = nums / AREA
    

def stream_video(url):
    
    video = pafy.new(url)
    best = video.getbest(preftype="mp4")
    cap = cv2.VideoCapture(best.url)

    w, h, fps = (int(cap.get(x)) for x in (cv2.CAP_PROP_FRAME_WIDTH, cv2.CAP_PROP_FRAME_HEIGHT, cv2.CAP_PROP_FPS))
    size = (w, h)
    
    font = cv2.FONT_HERSHEY_SIMPLEX
    font_scale = 1
    font_color = (255, 255, 255)
    line_type = 2
    
    ##############################
    # model = get_roboflow_model('./best.pt')
    model =  YOLO("best.pt")

    byte_track = sv.ByteTrack(frame_rate=fps) # Theo dõi byte

    thickness = sv.calculate_dynamic_line_thickness(resolution_wh=size) # Tính toán độ dày động của đường
    text_scale = sv.calculate_dynamic_text_scale(resolution_wh=size) # Tính toán tỷ lệ văn bản động
    bounding_box_annotator = sv.BoundingBoxAnnotator(thickness=thickness, color_lookup=sv.ColorLookup.TRACK) # loại hộp giới hạn
    label_annotator = sv.LabelAnnotator(text_scale=text_scale, text_thickness=thickness, text_position=sv.Position.BOTTOM_CENTER, color_lookup=sv.ColorLookup.TRACK) # loại nhãn
    trace_annotator = sv.TraceAnnotator(thickness=thickness, trace_length=fps * 2, position=sv.Position.BOTTOM_CENTER, color_lookup=sv.ColorLookup.TRACK) # loại theo dõi
  
    polygon_zone = sv.PolygonZone(SOURCE, frame_resolution_wh=size) # Tạo một vùng đa giác
    view_transformer = ViewTransformer(SOURCE, TARGET) # Tạo một chuyển đổi góc nhìn

    coordinates = defaultdict(lambda: deque(maxlen=fps))
  
    ############################
    while True:
        ret, frame = cap.read()
        if not ret:
            break
        # process_frame(frame)

        # result = model.infer(frame)[0]
        result = model(frame)[0]


        # detections = sv.Detections.from_inference(result) 
        detections = sv.Detections.from_ultralytics(result) # Tạo một phiên của phát hiện

        detections = detections[polygon_zone.trigger(detections)]
        detections = byte_track.update_with_detections(detections)

        # labels = [f"tracker_id: {tracker_id}" for tracker_id in detections.tracker_id]


        points = detections.get_anchors_coordinates(sv.Position.BOTTOM_CENTER)            
        ## check if the points could be transformed
        transformed_points = view_transformer.transform_points(points) 
        if transformed_points is not None:
            points = transformed_points.astype(np.int32)
        else:
            print("Error: Points could not be transformed")


        labels = []

        total_speed = 0
        num_objects = 0
        for tracker_id, [_,y] in zip(detections.tracker_id, points):
            coordinates[tracker_id].append(y)
            if len(coordinates[tracker_id]) < fps /2:
                labels.append(f"tracker_id: {tracker_id}")
            else:
                coordinates_start = coordinates[tracker_id][-1]
                coordinates_end = coordinates[tracker_id][0]
                distance = abs(coordinates_start - coordinates_end)
                time = len(coordinates[tracker_id]) / fps
                speed = distance / time * 3.6
                labels.append(f"tracker_id: {tracker_id}, speed: {speed:.2f} km/h")
                
                # Add the speed to the total speed and increment the number of objects
                total_speed += speed
                num_objects += 1

        if num_objects > 0:
            average_speed = total_speed / num_objects
            avg_speed_text = f"Average speed: {average_speed:.2f} km/h"
        else:
            avg_speed_text = f"Average speed: 0 km/h"
        num_objects_text = f"Number of objects: {num_objects}"


        annotated_frame = frame.copy()
        annotated_frame = sv.draw_polygon(annotated_frame, SOURCE, color=sv.Color.RED)
        annotated_frame = trace_annotator.annotate(annotated_frame, detections)
        annotated_frame = bounding_box_annotator.annotate(annotated_frame, detections)
        annotated_frame = label_annotator.annotate(annotated_frame, detections)

        cv2.putText(annotated_frame, avg_speed_text, (10, 30), font, font_scale, font_color, line_type)
        cv2.putText(annotated_frame, num_objects_text, (10, 60), font, font_scale, font_color, line_type)
        cv2.imshow("annotated_frame", annotated_frame)

        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    cap.release()
    cv2.destroyAllWindows()

if __name__ == "__main__":
    # args = parse_argument()
    youtube_url = 'https://www.youtube.com/watch?v=40u5_BBHNTY'

    stream_video(youtube_url)

# python streaming.py --source_video_path https://www.youtube.com/watch?v=40u5_BBHNTY
# python streaming.py --source_video_path https://www.youtube.com/watch?v=ojcp6BTYHSU