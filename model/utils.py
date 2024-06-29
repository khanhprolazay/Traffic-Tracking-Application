import cv2, argparse, base64, json, urllib.request, queue, threading
import numpy as np
from time import time
from enum import Enum
from typing import List

def get_time() -> int:
  return int(time()) 

class ViewTransformer:
  def __init__(self, source: np.array, target: np.ndarray):
    source = source.astype(np.float32)
    target = target.astype(np.float32) 
    self.m = cv2.getPerspectiveTransform(source, target)    
        
  def transform_points(self, points: np.array) -> np.array: 
    reshaped_points = points.reshape(-1, 1, 2).astype(np.float32) # Chuyển đổi điểm thành mảng 3 chiều 
    transformed_points = cv2.perspectiveTransform(reshaped_points, self.m) 
    return transformed_points.reshape(-1, 2)

def encode_frame(frame: np.array) -> bytes:
  _, buffer = cv2.imencode('.png', frame)
  bytes = buffer.tobytes()
  return base64.b64encode(bytes)

class FrameContext:
  def __init__(self, camera_id: str, city_id: str, frame: bytes, motobikes: int, cars: int, status: str) -> None:
    self.frame = frame
    self.time = get_time()
    self.camera_id = camera_id
    self.motobikes = motobikes
    self.cars = cars
    self.status = status
    self.city_id = city_id  

  def to_json(self):
    content = {
      "time": self.time,
      "camera_id": self.camera_id,
      "motobikes": self.motobikes,
      "cars": self.cars,
      "status": self.status,
      "city_id": self.city_id
    }
    return json.dumps(content)

class Topic(Enum):
  STREET_STREAMING_IMAGE = "STREET.STREAMING.IMAGE" # Update the street image after running model each 12s
  STREET_UPDATE = "STREET.UPDATE"                   # Update the street state (number of vehicles, traffic jam): 1s with live video, 12s with image

class ApplicationArgument():
  def __init__(self, name: str, help: str, required: bool = True) -> None:
    self.name = name
    self.help = help
    self.required = required

class CameraType(Enum):
  VIDEO = "VIDEO"
  IMAGE = "IMAGE"

class Position:
  def __init__(self, lat: float, lng: float) -> None:
    self.lat = lat
    self.lng = lng

class Camera():
  def __init__(self, id: str, name: str, city: str, type: CameraType, position: Position, src:str = None) -> None:
    self.id = id
    self.name = name
    self.city = city
    self.type = type
    self.src = src
    self.position = position
    

def parse_argument(args: List[ApplicationArgument]) -> argparse.Namespace:
  parser = argparse.ArgumentParser(description="Supervision")
  for arg in args:
    parser.add_argument(arg.name, type=str, required=arg.required, help=arg.help)
  return parser.parse_args()

def create_camera(opts: dict):
  type = CameraType(opts["type"])
  position = Position(opts["position"]["lat"], opts["position"]["lng"])
  return Camera(opts["id"], opts["name"], opts["city"], type, position, opts.get("src"))


def get_image(camera: Camera):
  url = f"http://giaothong.hochiminhcity.gov.vn/render/ImageHandler.ashx?id={camera.id}"
  resp = urllib.request.urlopen(url)
  image = np.asarray(bytearray(resp.read()), dtype=np.uint8)
  image = cv2.imdecode(image, -1)
  return image

def jam_level(num_motor, num_car):
  if (num_motor > 30 or num_car > 20):
      return 0 # Heavy traffic
  elif (20 <= num_motor <= 30 or 10 <= num_car <= 20):
      return 1 # Moderate traffic
  else:
      return 2 # Light traffic
  
class VideoCapture:
  def __init__(self, name):
    self.cap = cv2.VideoCapture(name)
    self.q = queue.Queue()
    t = threading.Thread(target=self._reader)
    t.daemon = True
    t.start()

  # read frames as soon as they are available, keeping only most recent one
  def _reader(self):
    while True:
      ret, frame = self.cap.read()
      if not ret:
        break
      if not self.q.empty():
        try:
          self.q.get_nowait()   # discard previous (unprocessed) frame
        except queue.Empty:
          pass
      self.q.put(frame)

  def read(self):
    return self.q.get()