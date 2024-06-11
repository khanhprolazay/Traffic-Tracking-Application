/** @format */

import { create } from 'zustand';
import cameras from '../mock/data.camera.dashboard.json';

let initialAnalysys = {
	0: 0,
	1: 0,
	2: 0,
};

export const useCameraStore = create((set) => ({
	total: cameras.length,
	analysys: initialAnalysys,
	cameras: cameras.reduce(
		(acc, camera) => ({ ...acc, [camera.id]: camera }),
		{}
	),
	drawlerCameras: [],
	time: Date.now(),
	openCamerasDrawler: false,

	updateCamera: (camera) =>
		set((state) => {
			const { camera_id, status, motobikes, cars } = camera;
			const { cameras, analysys } = state;

			// Update status of camera
			const updatedCameras = {
				...cameras,
				[camera_id]: {
					...cameras[camera_id],
					status,
					motobikes,
					cars,
				},
			};

			// Update analysis
			const beforeStatus = cameras[camera_id].status;
			const updatedAnalysys = analysys;
			if (analysys[beforeStatus] > 0) {
				updatedAnalysys[beforeStatus] -= 1;
				updatedAnalysys[status] += 1;
			} else {
				updatedAnalysys[status] += 1;
			}

			return {
				cameras: updatedCameras,
				analysys: updatedAnalysys,
			};
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
