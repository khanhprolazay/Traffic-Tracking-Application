import schedule
import random
import json
from time import time, sleep
from constant import TOPIC

from dotenv import load_dotenv
load_dotenv("./env/.env")

from services.producer import Producer
producer = Producer()

def job():
  bike = random.randint(0, 10)
  car = random.randint(0, 10)
  bus = random.randint(0, 10)
  truck = random.randint(0, 10)
  total = bike + car + bus + truck
  unix_time = int(time())

  data = {
    "city": "ho-chi-minh",
    "camera": "abc_xyz",
    "bike": bike,
    "car": car,
    "bus": bus,
    "truck": truck,
    "total": total,
    "time": unix_time,
  }

  producer.produce(topic=TOPIC,value=json.dumps(data).encode('utf-8'))
  producer.flush()

  # print(f"Data: {data}")
  
schedule.every(1).seconds.do(job)

while True:
  schedule.run_pending()
