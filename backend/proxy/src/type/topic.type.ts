export const TOPIC = {
  "STREET_UPDATE": "STREET.UPDATE"
}

export interface StreetUpdatePayload {
  "street_id": string,
  "city_id": string,
  "camera_id": string,
  time: number,
  bike: number,
  car: number,
  bus: number,
  truck: number,
}