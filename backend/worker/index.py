import schedule
import random
from services.config import ConfigService
from dotenv import load_dotenv
from constant import TOPIC
from datetime import datetime, timezone

from confluent_kafka import Producer
import requests
from jwt import decode
import json
from time import time, sleep
import logging
import functools
from datetime import datetime

load_dotenv("./env/.env")

configService = ConfigService()
ssoServer = configService.get("SSO_SERVER")
clientId = configService.get("CLIENT_ID")
clientSecret = configService.get("CLIENT_SECRET")

def requestAccessToken(config):
  url = f"{ssoServer}/protocol/openid-connect/token"
  headers = {
    "Content-Type": "application/x-www-form-urlencoded"
  }
  data = {
    "grant_type": "client_credentials",
    "client_id": clientId,
    "client_secret": clientSecret
  }
  response = requests.post(url, headers=headers, data=data)
  if response.status_code == 200:
    accessToken = response.json()['access_token']
    exp = decode(jwt=accessToken, options={"verify_signature": False})['exp']
    return accessToken, exp - 10
  else:
    raise Exception("Failed to get access token")

  
def producer_config():
  return {
      'bootstrap.servers': configService.get('BOOTSTRAP_SERVERS'),
      'security.protocol': 'SASL_PLAINTEXT',
      'sasl.mechanisms': 'OAUTHBEARER',
      # sasl.oauthbearer.config can be used to pass argument to your oauth_cb
      # It is not used in this example since we are passing all the arguments
      # from command line
      # 'sasl.oauthbearer.config': 'not-used',
      'sasl.oauthbearer.config': 'oauth_cb',
      'oauth_cb': functools.partial(requestAccessToken),
  }
producer = Producer(producer_config())

def job():
  bike = random.randint(0, 10)
  car = random.randint(0, 10)
  bus = random.randint(0, 10)
  truck = random.randint(0, 10)
  total = bike + car + bus + truck
  unix_time = int(time())

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

  producer.produce(topic=TOPIC,value=json.dumps(data).encode('utf-8'))
  producer.flush()

  print(f"Data: {data}")
  
schedule.every(1).seconds.do(job)

while True:
  schedule.run_pending()
  sleep(1)