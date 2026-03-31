import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Root from "./components/Root/Root";
import Home from "./components/Home/Home";
import Apps from "./components/Apps/Apps";
import ErrorPage from "./components/ErrorPage/ErrorPage";
import AppDetails from "./components/AppDetails/AppDetails";
import InstalledApps from "./components/InstalledApps/InstalledApps";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/apps",
        element: <Apps></Apps>,
      },
      {
        path: "/app/:id",
        element: <AppDetails></AppDetails>,
      },
      {
        path: "/installation",
        element: <InstalledApps></InstalledApps>,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />,
  </StrictMode>,
);
