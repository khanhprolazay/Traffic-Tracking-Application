from kafka import KafkaProducer
from .config import ConfigService
import json

# class Client:
#   def __init__(self):
#     self.bucket = INFLUX_BUCKET
#     self.org = INFLUX_ORGANIZATION
#     self.token = INFLUX_WRITE_TOKEN
#     self.url = INFLUX_URL

#     self.client = influxdb_client.InfluxDBClient(url=self.url, token=self.token, org=self.org)
#     self.write_api = self.client.write_api(write_options=SYNCHRONOUS)

#   def write(self, measurement: str, tags, fields):
#     point = influxdb_client.Point(measurement)
#     for key, value in tags.items():
#       point = point.tag(key, value)
#     for key, value in fields.items():
#       point = point.field(key, value)
#     self.write_api.write(bucket=self.bucket, record=point, org=self.org)

class Client:
  def __init__(self, configService: ConfigService) -> None:
    self.configService = configService
    self.producer = KafkaProducer(
      bootstrap_servers=configService.get("KAFKA_SERVER"),
      value_serializer=lambda v: json.dumps(v).encode('utf-8')
    )

  def write(self, topic: str, data: dict):
    self.producer.send(topic, value=data)
    self.producer.flush()
