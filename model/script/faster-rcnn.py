from PIL import Image
from torchvision.models.detection.faster_rcnn import FastRCNNPredictor
import torch
import cv2
import torchvision.transforms as T
from torchvision.models.detection import fasterrcnn_resnet50_fpn, FasterRCNN_ResNet50_FPN_Weights
import argparse
import time
from collections import Counter



def parse_argument() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Supervision")
    parser.add_argument("--source_path", type=str, required=True, help="Path to the source image file")
    parser.add_argument("--road", type=str, required=True, help="Name of the road")
    return parser.parse_args()

def get_model(num_classes):
    model = fasterrcnn_resnet50_fpn(pretrained=False, weights=FasterRCNN_ResNet50_FPN_Weights.COCO_V1)
    in_features = model.roi_heads.box_predictor.cls_score.in_features
    model.roi_heads.box_predictor = FastRCNNPredictor(in_features, num_classes)
    return model

def filter_predictions(preds, threshold):
    for id in range(len(preds)):
        idx_list = [idx for idx, score in enumerate(preds[id]['scores']) if score > threshold]
        preds[id]['boxes'] = preds[id]['boxes'][idx_list]
        preds[id]['labels'] = preds[id]['labels'][idx_list]
        preds[id]['scores'] = preds[id]['scores'][idx_list]
    return preds

def make_prediction(model, img, threshold):
    model.eval()
    preds = model(img)
    return filter_predictions(preds, threshold)

def load_image(image_path, device):
    with Image.open(image_path) as img:
        transform = T.Compose([T.ToTensor()])
        img = transform(img).unsqueeze(0)
        img = list(im.to(device) for im in img)
    return img

def predict_image(image_path, model, device, detection_threshold):
    img = load_image(image_path, device)
    with torch.no_grad():
        pred = make_prediction(model, img, detection_threshold)
        labels = [label.item() for label in pred[0]['labels']]
        count = Counter(labels)
    return count, pred

def jam_level(area, count):
        # Traffic Congestion Calculation
        two_wheeler_area = count.get(1, 0) * 2.75  # Area occupied by a typical 2-wheeler
        four_wheeler_area = count.get(2, 0) * 8.75  # Area occupied by a typical 4-wheeler
        density = (two_wheeler_area + four_wheeler_area) / area * 100

        congestion_label = "Thoang"
        if 20 < density <= 35:
            congestion_label = "Dong"
        elif density > 35:
            congestion_label = "Ket"

        return congestion_label, density
        # Display congestion label
        # text_position = (10, 30 + 20 * list(road_areas.keys()).index(road))
        # cv2.putText(img, f"{road}: {congestion_label} ({density:.1f}%)", text_position,
        #             cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 0, 255), 2)

def plot_image_from_output(image_path, predictions):
        img = cv2.imread(image_path)
        img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        scale_percent = 150
        width = int(img.shape[1] * scale_percent / 100)
        height = int(img.shape[0] * scale_percent / 100)
        dim = (width, height)
        img = cv2.resize(img, dim, interpolation = cv2.INTER_AREA)


        for box, label, score in zip(predictions[0]['boxes'], predictions[0]['labels'], predictions[0]['scores']):
            xmin, ymin, xmax, ymax = [int(x * scale_percent / 100) for x in box]
            start_point = (xmin, ymin)
            end_point = (xmax, ymax)
            color = (0, 255, 0) if label == 1 else (0, 0, 255)
            img = cv2.rectangle(img, start_point, end_point, color, 1)
            img = cv2.putText(img, f'{label}: {score:.2f}', (xmin, ymin - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.4, color, 2)
        cv2.imshow('Image', img)
        cv2.waitKey(0)
        cv2.destroyAllWindows()

if __name__ == "__main__":
    road_areas = {
        '1': 260,
        '2': 240,
        '3': 550,
        '4': 460,
        '5': 340,
        '6': 330,
        '7': 375,
        '8': 255
    }

    checkpoint_path = "..\\weight\\checkpoint_epoch_171.pth"
    args = parse_argument()

    # model
    model = get_model(3)
    checkpoint = torch.load(checkpoint_path, map_location=torch.device('cpu'))
    model.load_state_dict(checkpoint['model_state_dict'])
    device = torch.device('cuda') if torch.cuda.is_available() else torch.device('cpu')
    model.to(device)

    # predict
    start_time = time.time()
    count, predictions = predict_image(args.source_path, model, device, 0.5)
    end_time = time.time()


    area = road_areas[args.road]
    level, density = jam_level(area, count)
    print("Jam level: " + level)
    print(f"Density: {density:.1f}%")
    print(f"Prediction time: {end_time - start_time} seconds")
    for label, quantity in count.items():
        print(f"Label {label}: {quantity}")

    plot_image_from_output(args.source_path, predictions)

# python faster-rcnn.py  --source_path ../input/test5.jpg --road '5'