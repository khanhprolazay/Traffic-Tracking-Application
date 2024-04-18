import os

class ConfigService:
  def __init__(self) -> None:
    self.environment = os.environ

  def get(self, key) -> str:
    return self.environment[key]