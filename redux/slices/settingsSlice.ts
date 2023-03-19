import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type SettingsState = {
  minDelay: number;
  maxDelay: number;
  sleepAfter: number;
  enableSleep: boolean;
  enableBTG: boolean;
};

const initialState: SettingsState = {
  minDelay: 0,
  maxDelay: 0,
  sleepAfter: 0,
  enableSleep: false,
  enableBTG: false,
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    update: (state, action: PayloadAction<SettingsState>) => {
      return action.payload
    },
    reset: () => {
      return initialState
    }
  }
})

export const { update, reset } = settingsSlice.actions;
export default settingsSlice.reducer;