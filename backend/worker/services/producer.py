import requests
from jwt import decode
import functools
from confluent_kafka import Producer as KafkaProducer
from .config import ConfigService

config_service = ConfigService()

def producer_config():
  return {
      'bootstrap.servers': config_service.get("BOOTSTRAP_SERVERS"),
      'security.protocol': 'SASL_PLAINTEXT',
      'sasl.mechanisms': 'OAUTHBEARER',
      'sasl.oauthbearer.config': 'oauth_cb',
      'oauth_cb': functools.partial(request_access_token),
  }

def request_access_token(config = {}):
  sso_server = config_service.get("SSO_SERVER")
  client_id = config_service.get("CLIENT_ID")
  client_secret = config_service.get("CLIENT_SECRET")

  url = f"{sso_server}/protocol/openid-connect/token"
  headers = {
    "Content-Type": "application/x-www-form-urlencoded"
  }
  data = {
    "grant_type": "client_credentials",
    "client_id": client_id,
    "client_secret": client_secret
  }
  response = requests.post(url, headers=headers, data=data)
  if response.status_code == 200:
    access_token = response.json()['access_token']
    exp = decode(jwt=access_token, options={"verify_signature": False})['exp']
    return access_token, exp - 10
  else:
    raise Exception("Failed to get access token")
  
class Producer(KafkaProducer):
  def __init__(self):
    super().__init__(producer_config())
