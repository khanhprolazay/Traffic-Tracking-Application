import cv2
import pafy
import asyncio
import reactivex as rx
from reactivex.operators import map, start_with

import sys
sys.path.append("..")
from services.producer import Producer
from utils import ApplicationArgument, FrameContext, parse_argument, encode_frame, get_time

from dotenv import load_dotenv
load_dotenv("../env/.env")

TOPIC = "STREET.STREAMING"
INTERVAL = 12

def publish_frame(context: FrameContext):
    topic = f"{TOPIC}.{camera_id}"
    producer.produce(topic , context.frame, key=camera_id)
    producer.flush()
        
if __name__ == "__main__":
    loop = asyncio.get_event_loop()

    camera_arg = ApplicationArgument("--camera_id", "An Id of camera", True)
    video_arg = ApplicationArgument("--video_id", "Path to the input video file", True)
    args = parse_argument([camera_arg, video_arg])

    global camera_id, video_id
    camera_id = args.camera_id
    video_id = args.video_id

    url = f"https://www.youtube.com/watch?v={video_id}"
    video = pafy.new(url)
    best = video.getbest(preftype="mp4")
    cap = cv2.VideoCapture(best.url)

    producer = Producer()
    subject = rx.Subject()
    subject.subscribe(publish_frame)

    rx.interval(INTERVAL).pipe(
        start_with(0),
        map(lambda _: cap.read()[1]),
        map(encode_frame),
        map(lambda frame: FrameContext(frame))
    ).subscribe(subject)

    loop.run_forever()

    