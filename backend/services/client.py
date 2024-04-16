import influxdb_client
from .config import INFLUX_BUCKET, INFLUX_ORGANIZATION, INFLUX_URL, INFLUX_WRITE_TOKEN
from influxdb_client.client.write_api import SYNCHRONOUS

class Client:
  def __init__(self):
    self.bucket = INFLUX_BUCKET
    self.org = INFLUX_ORGANIZATION
    self.token = INFLUX_WRITE_TOKEN
    self.url = INFLUX_URL

    self.client = influxdb_client.InfluxDBClient(url=self.url, token=self.token, org=self.org)
    self.write_api = self.client.write_api(write_options=SYNCHRONOUS)

  def write(self, measurement: str, tags, fields):
    point = influxdb_client.Point(measurement)
    for key, value in tags.items():
      point = point.tag(key, value)
    for key, value in fields.items():
      point = point.field(key, value)
    self.write_api.write(bucket=self.bucket, record=point, org=self.org)