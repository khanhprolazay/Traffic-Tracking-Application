/** @format */

import { create } from 'zustand';
import cameras from '../mock/data.camera.dashboard.json';

export const useCameraStore = create((set) => ({
	total: cameras.length,
	analysys: {},
	cameras: cameras.reduce(
		(acc, camera) => ({ ...acc, [camera.id]: camera }),
		{}
	),
	drawlerCameras: [],
	time: Date.now(),
	openCamerasDrawler: false,

	updateAnalysys: (analysys) => set({ analysys }),
	updateCameraStatus: (id, status) =>
		set((state) => {
			const camera = state.cameras[id];
			if (camera) {
				return {
					cameras: {
						...state.cameras,
						[id]: { ...camera, status },
					},
				};
			}
			return {};
		}),
	toggleTime: () => set({ time: Date.now() }),
	setOpenAppDrawer: (open) => set({ openCamerasDrawler: open }),

	pushDrawlerCamera: (camera) =>
		set((state) => {
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
			const drawlerCameras = state.drawlerCameras.filter(
				(camera) => camera.id !== id
			);
			if (drawlerCameras.length === 0) {
				return { drawlerCameras, openCamerasDrawler: false };
			}
			return { drawlerCameras };
		}),
}));
