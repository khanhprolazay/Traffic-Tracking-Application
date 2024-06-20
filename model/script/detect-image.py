import cv2
from ultralytics import YOLO
import supervision as sv
import argparse

def jam_level(num_motor, num_car):
    if (num_motor > 30 or num_car > 20):
        return "Severe congestion"
    elif (20 <= num_motor <= 30 or 10 <= num_car <= 20):
        return "Slow traffic"
    else:
        return "Normal traffic"
    
def parse_argument() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Supervision")
    parser.add_argument("--source_path", type=str, required=True, help="Path to the source video file")
    return parser.parse_args()

def process_image(image_path):
    image = cv2.imread(image_path)
    model =  YOLO("../weight/best.pt") # Load model

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

    print(f"Number of motorbikes: {num_motor}")
    print(f"Number of cars: {num_car}")
    print(f"Number of cars: {jam}")

    model.predict(source=image, show=True)  
    cv2.waitKey(0)

if __name__ == "__main__":
    # image_path = "../input/test1.jpg"  
    args = parse_argument()

    process_image(args.source_path)

# python detect-image.py --source_path ../input/test1.jpg