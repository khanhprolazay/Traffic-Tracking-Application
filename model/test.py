import cv2
import pafy
from ultralytics import YOLO

# url = 'https://www.youtube.com/watch?v=40u5_BBHNTY'
# video = pafy.new(url)
# best = video.getbest(preftype="mp4")
# cap = cv2.VideoCapture(best.url)
# ####
# # Create window with normal flags to allow resizing
# cv2.namedWindow("frame", cv2.WINDOW_NORMAL)
# cv2.resizeWindow("frame", 1920, 1080)
# ####
# model = YOLO('yolov8n.pt')

# ####
# ret, frame = cap.read()
# while ret:
#     detections = model(frame)
    
#     for detection in detections:
        

#     ret, frame = cap.read()
#     cv2.imshow('frame', frame)
#     if cv2.waitKey(10) & 0xFF == ord('q'):
#         break

# Mở video
cap = cv2.VideoCapture("D:\\video\\1140r.mp4")

# Lấy số khung hình mỗi giây (fps)
fps = cap.get(cv2.CAP_PROP_FPS)

print(f"The video has {fps} frames per second.")
# Lấy kích thước của mỗi frame
frame_width = cap.get(cv2.CAP_PROP_FRAME_WIDTH)
frame_height = cap.get(cv2.CAP_PROP_FRAME_HEIGHT)

print(f"Each frame has width {frame_width} pixels and height {frame_height} pixels.")