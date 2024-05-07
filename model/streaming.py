import cv2
import pafy
import base64

from dotenv import load_dotenv
load_dotenv("./env/.env")

from services.producer import Producer
producer = Producer()
TOPIC = "STREET.STREAMING"

def process_frame(frame):
    cv2.imshow('frame', frame)
    # ret, buffer = cv2.imencode('.png', frame)
    # bytes = buffer.tobytes()
    # base64_image = base64.b64encode(bytes)
    # producer.produce(TOPIC, base64_image, key="streaming")

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
    youtube_url = 'https://www.youtube.com/watch?v=ojcp6BTYHSU'
    stream_video(youtube_url)