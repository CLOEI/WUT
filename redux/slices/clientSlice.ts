import { Contact } from "@adiwajshing/baileys";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type ClientState = {
  [x: string]: Client
};

export type Client = {
  name: string;
  qr?: string;
  conStatus?: string;
  data?: undefined | Contact;
}

const initialState: ClientState = {};

export const clientSlice = createSlice({
  name: "client",
  initialState,
  reducers: {
    newClient: (state, action: PayloadAction<Client>) => {
      api.createClient(action.payload.name)
      state[action.payload.name] = {
        name: action.payload.name,
        conStatus: "closed",
        qr: "",
        data: undefined,
      };
    },
    upCon: (state, action: PayloadAction<Client>) => {
      if (action.payload.name in state) {
        if(action.payload.conStatus){
          state[action.payload.name].conStatus = action.payload.conStatus;
        } 

        state[action.payload.name] = {
          ...state[action.payload.name],
          qr: action.payload.qr,
          data: action.payload.data || undefined
        }
      }
    }
  }
})

export const { newClient, upCon } = clientSlice.actions;
export default clientSlice.reducer;