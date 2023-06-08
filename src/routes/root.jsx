import {
    createBrowserRouter,
  } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home";
import Instructors from "../pages/Instructors/Instructors";
import AllClasses from "../pages/AllClasses/AllClasses";
import DashboardLayout from "../layouts/DashboardLayout";
import AddClass from "../pages/Dashboard/AddClass/AddClass";
import MyClasses from "../pages/Dashboard/MyClasses/MyClasses";

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
        {
          path: '/all-classes',
          element: <AllClasses/>
        },
      ],
    },
    {
      path: "dashboard",
      element: <DashboardLayout/>,
      children: [
        {
          path: '/dashboard/add-class',
          element: <AddClass/>
        },
        {
          path: '/dashboard/my-classes',
          element: <MyClasses/>
        },
      ]
    }
  ]);