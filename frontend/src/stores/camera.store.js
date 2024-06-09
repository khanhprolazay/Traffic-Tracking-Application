/** @format */

import { create } from 'zustand';
import cameras from '../mock/data.camera.dashboard.json';

export const useCameraStore = create((set) => ({
	cameras: cameras.reduce((acc, camera) => ({ ...acc, [camera.id]: camera }), {}),
	drawlerCameras: [],
	time: Date.now(),
	openCamerasDrawler: false,

	toggleTime: () => set({ time: Date.now() }),
	setOpenAppDrawer: (open) => set({ openCamerasDrawler: open }),

	pushDrawlerCamera: (camera) =>
		set((state) => {
			console.log('camera', camera);
			if (!state.drawlerCameras.find((c) => c.id === camera.id)) {
				return {
					drawlerCameras: [...state.drawlerCameras, camera],
					openCamerasDrawler: true,
				};
			}
			return {};
		}),

	removeDrawlerCamera: (id) =>
		set((state) => {
			const drawlerCameras = state.drawlerCameras.filter((camera) => camera.id !== id);
			if (drawlerCameras.length === 0) {
				return { drawlerCameras, openCamerasDrawler: false };
			}
			return { drawlerCameras };
		}),
}));
