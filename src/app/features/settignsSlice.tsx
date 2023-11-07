import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface settings {
  darkMode: boolean;
}

const initialState: settings = {
  darkMode: true,
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    changeMode: (state) => {
      return {
        ...state,
        darkMode: !state.darkMode,
      };
    },
  },
});

export const { changeMode } = settingsSlice.actions;

export default settingsSlice.reducer;
