import schedule
import time
import random
from services.client import Client
from services.config import MEASUREMENT
from services.helper import create_tags, create_fields

client = Client()

def job():
  bike = random.randint(0, 10)
  car = random.randint(0, 10)
  bus = random.randint(0, 10)
  truck = random.randint(0, 10)
  client.write(MEASUREMENT, create_tags(1, 1, 1), create_fields(bike, car, bus, truck))
  
schedule.every(1).seconds.do(job)

while True:
  schedule.run_pending()
  time.sleep(1)