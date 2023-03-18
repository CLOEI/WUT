import clientReducer from "./slices/clientSlice";
import settingsReducer from "./slices/settingsSlice";

export default {
  client: clientReducer,
  settings: settingsReducer,
}