import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { createHashRouter, RouterProvider } from "react-router-dom"
import toast, { Toaster } from "react-hot-toast"

import Main from "./routes/main"
import Layout from "./routes/app"
import ClientLayout from "./routes/app/client/layout"
import Client from "./routes/app/client/client"
import ClientIndex from "./routes/app/client"
import Filter from "./routes/app/filter"
import BroadcastLayout from "./routes/app/broadcast/layout"
import Broadcast from "./routes/app/broadcast/client"
import BroadcastIndex from "./routes/app/broadcast"
import Settings from "./routes/app/settings"

import { store } from "../redux/store"
import { Client as TClient, remClient, setDefault, upCon } from "@/redux/slices/clientSlice";


api.onConnection((data: TClient) => {
  if(data.data && !store.getState().client.defaultClient) {
    store.dispatch(setDefault(data.name))
  }
  store.dispatch(upCon(data))
})

api.onRemoved((name: string) => {
  store.dispatch(remClient(name))
  toast.success(`${name} Client removed`)
})

store.subscribe(() => {
  const state = store.getState()
  localStorage.setItem("data", JSON.stringify(state))
})

const router = createHashRouter([
  {
    path: "/",
    element: <Main/>
  },
  {
    path: "/app",
    element: <Layout/>,
    children: [
      {
        path: "client",
        element: <ClientLayout/>,
        children: [
          { index: true, element: <ClientIndex/> },
          {
            path: ":id",
            element: <Client/>
          }
        ]
      },
      {
        path: "filter",
        element: <Filter/>,
      },
      {
        path: "broadcast",
        element: <BroadcastLayout/>,
        children: [
          { index: true, element: <BroadcastIndex/> },
          {
            path: ":id",
            element: <Broadcast/>
          }
        ]
      },
      {
        path: "settings",
        element: <Settings/>,
      },
    ]
  }
])

const root = createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <Toaster position="bottom-right" toastOptions={{
      className: "bg-secondary text-white"
    }}/>
    <RouterProvider router={router}/>
  </Provider>
);