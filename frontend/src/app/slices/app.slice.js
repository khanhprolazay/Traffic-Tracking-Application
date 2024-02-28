import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  darkMode: localStorage.getItem('darkMode') === 'true',
}

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setDarkMode: (state, action) => {
      state.darkMode = action.payload
      localStorage.setItem('darkMode', action.payload)
    }
  }
})

export const { setDarkMode } = appSlice.actions;
export default appSlice.reducer;