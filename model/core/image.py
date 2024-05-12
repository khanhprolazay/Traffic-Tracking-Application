import reactivex as rx
from reactivex.operators import map, start_with
import numpy as np
import urllib.request
import cv2
import asyncio

import sys
sys.path.append("..")
from utils import ApplicationArgument, parse_argument

from dotenv import load_dotenv
load_dotenv("../env/.env")

from services.producer import Producer
TOPIC = "STREET.STREAMING"
INTERVAL = 12

def publish_frame(frame):
    topic = f"{TOPIC}.{camera_id}"
    producer.produce(topic, frame)
    producer.flush()

def process_frame(frame):
    return frame

def get_image(_):
    global camera_id
    url = f"http://giaothong.hochiminhcity.gov.vn/render/ImageHandler.ashx?id={camera_id}"
    resp = urllib.request.urlopen(url)
    image = np.asarray(bytearray(resp.read()), dtype=np.uint8)
    image = cv2.imdecode(image, -1)
    return image

if __name__ == '__main__':
    loop = asyncio.new_event_loop()

    arg = ApplicationArgument("--camera_id", "An Id of camera", True)
    args = parse_argument([arg])

    global camera_id
    camera_id = args.camera_id

    producer = Producer()

    subject = rx.Subject()
    subject.subscribe(publish_frame)

    rx.interval(INTERVAL).pipe(
        start_with(0),
        map(get_image),
        map(process_frame)
    ).subscribe(subject)

    loop.run_forever()
