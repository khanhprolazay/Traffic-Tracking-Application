import cv2
from ultralytics import YOLO
import supervision as sv
import argparse


#     1: "Nguyễn Trãi - Nguyễn Cư Trinh"
#     2: "Cách Mạng Tháng Tám – Phạm Văn Hai"
#     3: "Trường Chinh - Nguyễn Hồng Đào"
#     4: "Hoàng Văn Thụ - Trần Huy Liệu":
#     5: "Phan Đăng Lưu - Phan Xích Long"
#     6: "Đinh Bộ Lĩnh - Chu Văn An"
#     7: "Nguyễn Thị Minh Khai - Đinh Tiên Hoàng 1"
#     8: "Bạch Đằng - Đặng Văn Sâm"

jam_criteria = {
    '1': {"Heavy": (18, 7), "Busy": (12, 4)},
    '2': {"Heavy": (16, 6), "Busy": (10, 3)},
    '3': {"Heavy": (30, 8), "Busy": (20, 5)},
    '4': {"Heavy": (23, 7), "Busy": (15, 5)},
    '5': {"Heavy": (20, 6), "Busy": (13, 4)},
    '6': {"Heavy": (20, 6), "Busy": (12, 4)},
    '7': {"Heavy": (25, 6), "Busy": (15, 4)},
    '8': {"Heavy": (16, 6), "Busy": (10, 3)}
}

def jam_level(num_motor, num_car, area):
    criteria = jam_criteria.get(area)
    if criteria:
        for level, (motor_threshold, car_threshold) in criteria.items():
            if num_motor > motor_threshold or num_car > car_threshold:
                return level
        return "Smooth"
    else:
        return "No area found"

def parse_argument() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Supervision")
    parser.add_argument("--source_path", type=str, required=True, help="Path to the source image file")
    parser.add_argument("--area", type=str, required=True, help="Name of the area")
    return parser.parse_args()

def process_image(image_path, area):
    image = cv2.imread(image_path)
    model = YOLO("../weight/best.pt")  # Load model (adjust path if needed)

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
    jam = jam_level(num_motor, num_car, area)

    print(f"Number of motorbikes: {num_motor}")
    print(f"Number of cars: {num_car}")
    print(f"Congestion level at {area}: {jam}")

    model.predict(source=image, show=True)  
    cv2.waitKey(0)

if __name__ == "__main__":
    args = parse_argument()
    process_image(args.source_path, args.area)

# python test.py --source_path "../input/test1.jpg" --area '1'