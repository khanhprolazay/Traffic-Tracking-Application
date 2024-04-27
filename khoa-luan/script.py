import argparse
import numpy as np

import cv2
from inference.models.utils import get_roboflow_model

import supervision as sv
from collections import defaultdict, deque

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

# Tạo một lớp chuyển đổi góc nhìn 
class ViewTransformer:
    def __init__(self, source: np.array, target: np.ndarray):
        source = source.astype(np.float32)
        target = target.astype(np.float32) 
        self.m = cv2.getPerspectiveTransform(source, target)        
    def transform_points(self, points: np.array) -> np.array: 
        reshaped_points = points.reshape(-1, 1, 2).astype(np.float32) # Chuyển đổi điểm thành mảng 3 chiều 
        transformed_points = cv2.perspectiveTransform(reshaped_points, self.m) 
        return transformed_points.reshape(-1, 2)
        # if transformed_points is None:
        #     return np.array([]).reshape(-1, 2)
        # return transformed_points.reshape(-1, 2)    

def parse_argument() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Supervision"
    )
    parser.add_argument("--source_video_path", type=str, required=True, help="Path to the source video file")

    return parser.parse_args()

if __name__ == "__main__":
    args = parse_argument()

    video_info = sv.VideoInfo.from_video_path(args.source_video_path)
    model = get_roboflow_model('yolov8s-640') # Tải mô hình
    
    byte_Track = sv.ByteTrack(frame_rate=video_info.fps) # Theo dõi byte
 

    thickness = sv.calculate_dynamic_line_thickness(resolution_wh=video_info.resolution_wh) # Tính toán độ dày động của đường
    text_scale = sv.calculate_dynamic_text_scale(resolution_wh=video_info.resolution_wh) # Tính toán tỷ lệ văn bản động
    bounding_box_annotator = sv.BoundingBoxAnnotator(thickness=thickness, color_lookup=sv.ColorLookup.TRACK) # loại hộp giới hạn
    label_annotator = sv.LabelAnnotator(text_scale=text_scale, text_thickness=thickness, text_position=sv.Position.BOTTOM_CENTER, color_lookup=sv.ColorLookup.TRACK) # loại nhãn
    trace_annotator = sv.TraceAnnotator(thickness=thickness, trace_length=video_info.fps * 2, position=sv.Position.BOTTOM_CENTER, color_lookup=sv.ColorLookup.TRACK) # loại theo dõi
    frame_generator = sv.get_video_frames_generator(args.source_video_path) # Tạo một phiên của trình tạo khung

    polygon_zone = sv.PolygonZone(SOURCE, frame_resolution_wh=video_info.resolution_wh) # Tạo một vùng đa giác
    
    view_transformer = ViewTransformer(SOURCE, TARGET) # Tạo một chuyển đổi góc nhìn
    
    coordinates = defaultdict(lambda: deque(maxlen=video_info.fps))  # Tạo một từ điển với giá trị mặc định là một hàng đợi với độ dài tối đa là fps
    
    cv2.namedWindow("annotated_frame", cv2.WINDOW_NORMAL) # Tạo cửa sổ

    for frame in frame_generator: # Vòng lặp qua các khung
        result = model.infer(frame)[0]
        detections = sv.Detections.from_inference(result) # Tạo một phiên của phát hiện
        detections = detections[polygon_zone.trigger(detections)] # Lọc các phát hiện bằng cách sử dụng vùng đa giác
        detections = byte_Track.update_with_detections(detections) # Cập nhật theo dõi byte với phát hiện

        points = detections.get_anchors_coordinates(sv.Position.BOTTOM_CENTER) # Lấy tọa độ của các phát hiện
        points = view_transformer.transform_points(points).astype(int) # Chuyển đổi tọa độ của các phát hiện

        labels = []
        for tracker_id, [_, y] in zip(detections.tracker_id, points):
            coordinates[tracker_id].append(y)
            if len(coordinates[tracker_id]) < video_info.fps / 2:
                labels.append(f"#{tracker_id}")
            else:
                # calculate speed
                coordinate_start = coordinates[tracker_id][-1]
                coordinate_end = coordinates[tracker_id][0]
                distance = abs(coordinate_start - coordinate_end)
                time = len(coordinates[tracker_id]) / video_info.fps
                speed = distance / time * 3.6
                labels.append(f"#{tracker_id} {int(speed)} km/h")

        annotated_frame = frame.copy()
        annotated_frame = trace_annotator.annotate(
            scene=annotated_frame, detections=detections
        )
        annotated_frame = sv.draw_polygon(annotated_frame, polygon=SOURCE, color=sv.Color.RED) # Vẽ đa giác
        annotated_frame = bounding_box_annotator.annotate(
            scene=annotated_frame, detections=detections)
        annotated_frame = label_annotator.annotate(
            scene=annotated_frame, detections=detections, labels=labels)
        vehicles_in_zone = len(detections)

        cv2.imshow("annotated_frame", annotated_frame)
        if cv2.waitKey(30) == ord('q'):
            break
    cv2.destroyAllWindows()
    
# python script.py --source_video_path C:\Users\TotNguyen\Desktop\khoa-luan\input\vehicles.mp4

