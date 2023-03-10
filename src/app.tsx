import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { createHashRouter, RouterProvider } from "react-router-dom"

import Main from "./routes/main"
import Layout from "./routes/app"
import ClientLayout from "./routes/app/client/layout"
import Client from "./routes/app/client/client"
import ClientIndex from "./routes/app/client"

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