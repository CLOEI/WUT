import { Contact } from "@adiwajshing/baileys";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type ClientState = {
  defaultClient: string;
  clients: {
    [x: string]: Client
  }
};

export type Client = {
  name: string;
  qr?: string;
  conStatus?: string;
  data?: undefined | Contact;
}

const initialState: ClientState = {
  defaultClient: "",
  clients: {}
};

export const clientSlice = createSlice({
  name: "client",
  initialState,
  reducers: {
    newClient: (state, action: PayloadAction<Client>) => {
      state.clients[action.payload.name] = {
        name: action.payload.name,
        conStatus: "close",
        qr: "",
        data: undefined,
      };
    },
    remClient : (state, action: PayloadAction<string>) => {
      delete state.clients[action.payload];
      if (state.defaultClient === action.payload) {
        state.defaultClient = "";
      }
    },
    upCon: (state, action: PayloadAction<Client>) => {
      if (action.payload.name in state.clients) {
        if(action.payload.conStatus){
          state.clients[action.payload.name].conStatus = action.payload.conStatus;
        } 

        state.clients[action.payload.name] = {
          ...state.clients[action.payload.name],
          qr: action.payload.qr,
          data: action.payload.data || undefined
        }
      }
    },
    setDefault: (state, action: PayloadAction<string>) => {
      state.defaultClient = action.payload
    }
  }
})

export const { newClient, upCon, setDefault, remClient } = clientSlice.actions;
export default clientSlice.reducer;