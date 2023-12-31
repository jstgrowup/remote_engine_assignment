import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import SignupForDevelopers from "./components/SignupForDevelopers.jsx";
import SignupForClient from "./components/SignupForClient.jsx";
import LoginForClient from "./components/LoginForClient.jsx";
import LoginForDevelopers from "./components/LoginForDevelopers.jsx";
import DeveloperOnboarding from "./components/DeveloperOnboarding.jsx";
import ClientOnboarding from "./components/ClientOnboarding.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <SignupForDevelopers />,
  },
  {
    path: "/clientsignup",
    element: <SignupForClient />,
  },
  {
    path: "/clientlogin",
    element: <LoginForClient />,
  },
  {
    path: "/developerslogin",
    element: <LoginForDevelopers />,
  },
  {
    path: "/developerOnboarding",
    element: <DeveloperOnboarding />,
  },
  {
    path: "/client",
    element: <ClientOnboarding />,
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
