import cameras from "../mock/cameras.mock.json";

export const CameraSelector = (state) => {
  const camera = state.app.camera;
  return cameras.find((c) => c.id === camera);
} 