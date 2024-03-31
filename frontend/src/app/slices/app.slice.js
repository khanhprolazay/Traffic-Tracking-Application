import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	darkMode: localStorage.getItem("darkMode") === "true",
	time: Date.now(),
	cameras: [],
  openCamerasDrawler: false,
};

if (initialState.darkMode) {
	document.documentElement.classList.add("dark");
}

const appSlice = createSlice({
	name: "app",
	initialState,
	reducers: {
		setDarkMode: (state, action) => {
			state.darkMode = action.payload;
			localStorage.setItem("darkMode", action.payload);

			if (action.payload) {
				document.documentElement.classList.add("dark");
			} else {
				document.documentElement.classList.remove("dark");
			}
		},

		toggleTime: (state, _) => {
			state.time = Date.now();
		},

		pushCamera: (state, action) => {
			if (!state.cameras.find(camera => camera.id === action.payload.id)) {
				state.cameras.push(action.payload);
			}
      state.openCamerasDrawler = true;
		},

		removeCamera: (state, action) => {
			state.cameras = state.cameras.filter(
				(camera) => camera.id !== action.payload
			);
      if (state.cameras.length === 0) {
        state.openCamerasDrawler = false;
      }
		},

		setOpenAppDrawer: (state, action) => {
			state.openCamerasDrawler = action.payload;
		}
	},
});

export const { setDarkMode, toggleTime, pushCamera, removeCamera, setOpenAppDrawer } =
	appSlice.actions;
export default appSlice.reducer;
