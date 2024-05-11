export const TOPIC = {
  "STREET_UPDATE": "STREET.UPDATE",
  "STREET_STREAMING": "STREET.STREAMING.*",
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