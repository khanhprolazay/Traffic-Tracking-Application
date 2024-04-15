import { create } from "zustand";

export const useCameraStore = create((set) => ({
	cameras: [],
	time: Date.now(),
	openCamerasDrawler: false,

	toggleTime: () => set({ time: Date.now() }),
	setOpenAppDrawer: (open) => set({ openCamerasDrawler: open }),

	pushCamera: (camera) =>
		set((state) => {
			if (!state.cameras.find((c) => c.id === camera.id)) {
				return {
					cameras: [...state.cameras, camera],
					openCamerasDrawler: true,
				};
			}
			return {};
		}),
	removeCamera: (id) =>
		set((state) => {
			const cameras = state.cameras.filter((camera) => camera.id !== id);
			if (cameras.length === 0) {
				return { cameras, openCamerasDrawler: false };
			}
			return { cameras };
		}),
}));
