import schedule
import time
import random
from services.client import Client
from services.config import ConfigService
from dotenv import load_dotenv
from constant import TOPIC
import time
from datetime import datetime, timezone

load_dotenv("./env/.env")

configService = ConfigService()
client = Client(configService)


def job():
  bike = random.randint(0, 10)
  car = random.randint(0, 10)
  bus = random.randint(0, 10)
  truck = random.randint(0, 10)
  total = bike + car + bus + truck
  unix_time = int(time.time())

  data = {
    "city_id": "Ha Noi",
    "street_id": "Nguyen Van Linh",
    "camera_id": "abc_xyz",
    "bike": bike,
    "car": car,
    "bus": bus,
    "truck": truck,
    "total": total,
    "time": unix_time,
  }

  client.write(
    topic=TOPIC,
    data=data
  )

  print(f"Data: {data}")
  
schedule.every(1).seconds.do(job)

while True:
  schedule.run_pending()
  time.sleep(1)