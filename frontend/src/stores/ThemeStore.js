import { create } from "zustand";

export const useThemeStore = create((set) => ({
	darkMode: true,
	toggleDarkMode: () => set(state => ({ darkMode: !state.darkMode })),
}));