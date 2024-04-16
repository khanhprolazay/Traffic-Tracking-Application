import { create } from "zustand";

const theme = localStorage.getItem("theme") || "light";
if (theme === "dark") {
	document.body.classList.add("dark");
}

export const useThemeStore = create((set) => ({
	darkMode: theme === "dark",
	toggleDarkMode: () =>
		set((state) => {
			const darkMode = !state.darkMode;
			localStorage.setItem("theme", darkMode ? "dark" : "light");

			if (darkMode) {
				document.body.classList.add("dark");
			} else {
				document.body.classList.remove("dark");
			}
			return { darkMode };
		}),
}));
