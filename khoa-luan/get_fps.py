import cv2

# Khởi tạo video
video_path = "D:\\video\\1min.mp4"
video = cv2.VideoCapture(video_path)

# Hàm callback cho sự kiện click chuột
def get_coordinates(event, x, y, flags, param):
    if event == cv2.EVENT_LBUTTONDOWN:
        print(f'Tọa độ: ({x}, {y})')

# Tạo cửa sổ OpenCV
cv2.namedWindow('Video')

# Liên kết hàm callback với cửa sổ
cv2.setMouseCallback('Video', get_coordinates)


# Kích thước mới mà bạn muốn thay đổi
new_width = 960
new_height = 540

while True:
    ret, frame = video.read()
    if not ret:
        break

    # Thay đổi kích thước khung hình
    frame = cv2.resize(frame, (new_width, new_height))

    # Hiển thị video
    cv2.imshow('Video', frame)

    # Nếu nhấn 'q', thoát vòng lặp
    if cv2.waitKey(30) & 0xFF == ord('q'):
        break

video.release()
cv2.destroyAllWindows()