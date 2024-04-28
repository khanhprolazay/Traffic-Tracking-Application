def create_tags(camera_id, city_id, street_id):
  return {
    "camera_id": camera_id,
    "city_id": city_id,
    "street_id": street_id
  }

def create_fields(bike, car, bus, truck):
  return {
    "bike": bike,
    "car": car,
    "bus": bus,
    "truck": truck,
    "total": bike + car + bus + truck
  }