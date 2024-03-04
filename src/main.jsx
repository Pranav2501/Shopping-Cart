import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Card from "./components/Card";
import Table from "./components/Table";  

import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/card",
    element: <Card />,
  },
  {
    path: "/table",
    element: <Table />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);