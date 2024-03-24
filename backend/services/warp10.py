import time
from helpers import post

def write_data(camera_id: str, number_of_cars: int):
    current_timestamp = int(time.time() * 1000)
    data = "%d// cameras{id=%s} %d" % (current_timestamp, camera_id, number_of_cars)
    return post(data)