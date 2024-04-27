import argparse
import cv2
import numpy as np
import supervision as sv
from ultralytics import YOLO
from inference.models.utils import get_roboflow_model

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

class ViewTransformer:
    def __init__(self, source: np.array, target: np.ndarray):
        source = source.astype(np.float32)
        target = target.astype(np.float32) 
        self.m = cv2.getPerspectiveTransform(source, target)        
    def transform_points(self, points: np.array) -> np.array: 
        reshaped_points = points.reshape(-1, 1, 2).astype(np.float32) # Chuyển đổi điểm thành mảng 3 chiều 
        transformed_points = cv2.perspectiveTransform(reshaped_points, self.m) 
        return transformed_points.reshape(-1, 2)
    

def parse_argument() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Supervision")
    parser.add_argument("--input_video", type=str, required=True, help="Path to the input video file")

    return parser.parse_args()

if __name__ == "__main__":
    args = parse_argument()    
  
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


    for frame in frame_generator:
        result = model.infer(frame)[0]    
        detections = sv.Detections.from_inference(result)   
        detections = detections[pylogon_zone.trigger(detections)]
        detections = byte_track.update_with_detections(detections)

        points = detections.get_anchors_coordinates(anchor=sv.Position.BOTTOM_CENTER)
        points = view_transformer.transform_points(points).astype(int)

        labels = [ f"#{track_id}" for track_id in detections.tracker_id]

        annotated_frame = frame.copy()
        annotated_frame = sv.draw_polygon(annotated_frame, SOURCE, color=sv.Color.RED, thickness=2)
        annotated_frame = bounding_box_annotator.annotate(
            scene=annotated_frame, detections=detections)
        annotated_frame = label_annotator.annotate(
            scene=annotated_frame, detections=detections)
       
        annotated_frame = cv2.resize(annotated_frame, None, fx=scale, fy=scale)
         
        cv2.imshow("annotated_frame", annotated_frame)
        if cv2.waitKey(1) == ord('q'):
            break

    cv2.destroyAllWindows()

# python main.py --input_video C:\Users\TotNguyen\Desktop\khoa-luan\input\vehicles.mp4
# python main.py --input_video D:\video\1min.mp4