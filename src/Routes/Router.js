import { createBrowserRouter } from "react-router-dom";
import RootComponent from "../RootComponents/RootComponents";
import Home from "../components/Home";
import About from "../components/About";
import Login from "../components/Login";
import Signup from "../components/Signup";

// Created routes for different tabs
export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootComponent />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
    ],
  },
]);
