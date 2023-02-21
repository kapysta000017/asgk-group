import { createRoot } from "react-dom/client"
import Auth from "./pages/auth"
import Customers from "./pages/customers"
import "./index.css"
import { RouterProvider, createBrowserRouter, Navigate } from "react-router-dom"
import { Provider } from "react-redux"
import store from "./store"

const container = document.getElementById("root") as HTMLElement
const root = createRoot(container)

const router = createBrowserRouter([
  {
    path: "/auth",
    element: <Auth />,
  },
  {
    path: "/customers",
    element: (
      <Provider store={store}>
        <Customers />,
      </Provider>
    ),
  },
  {
    path: "/",
    element: <Navigate to="/auth" replace={true} />,
  },
])

root.render(<RouterProvider router={router} />)
