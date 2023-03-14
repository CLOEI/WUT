import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { createHashRouter, RouterProvider } from "react-router-dom"

import Main from "./routes/main"
import Layout from "./routes/app"
import ClientLayout from "./routes/app/client/layout"
import Client from "./routes/app/client/client"
import ClientIndex from "./routes/app/client"
import Filter from "./routes/app/filter"
import BroadcastLayout from "./routes/app/broadcast/layout"
import Broadcast from "./routes/app/broadcast/client"
import BroadcastIndex from "./routes/app/broadcast"

import { store } from "../redux/store"


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
      }
    ]
  }
])

const root = createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <RouterProvider router={router}/>
  </Provider>
);