import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type SettingsState = {
  delay: number;
  sleepAfter: number;
  enableSleep: boolean;
};

const initialState: SettingsState = {
  delay: 0,
  sleepAfter: 0,
  enableSleep: false
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    update: (state, action: PayloadAction<SettingsState>) => {
      return action.payload
    },
  }
})

export const { update } = settingsSlice.actions;
export default settingsSlice.reducer;