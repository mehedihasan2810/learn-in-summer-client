import {
    createBrowserRouter,
  } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home";
import Instructors from "../pages/Instructors/Instructors";

  export const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout/>,
      children: [
        {
          path: '/',
          element: <Home/>
        },
        {
          path: '/instructors',
          element: <Instructors/>
        },
      ]
    },
  ]);