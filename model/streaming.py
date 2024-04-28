import cv2
import pafy

def process_frame(frame):
    cv2.imshow('frame', frame)

def stream_video(url):
    video = pafy.new(url)
    best = video.getbest(preftype="mp4")
    cap = cv2.VideoCapture(best.url)

    while True:
        ret, frame = cap.read()
        if not ret:
            break

        process_frame(frame)

        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    cap.release()
    cv2.destroyAllWindows()


if __name__ == "__main__":
    youtube_url = 'https://www.youtube.com/watch?v=40u5_BBHNTY'
    stream_video(youtube_url)