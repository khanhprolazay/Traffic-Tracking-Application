import schedule
import time
import random
from services.warp10 import write_data


def job():
  number = random.randint(0, 100)
  write_data(number)
  
schedule.every(1).seconds.do(job)

while True:
  schedule.run_pending()
  time.sleep(1)