import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home";
import Instructors from "../pages/Instructors/Instructors";
import AllClasses from "../pages/AllClasses/AllClasses";
import DashboardLayout from "../layouts/DashboardLayout";
import UpdateClass from "../pages/Dashboard/Instructor/UpdateClass/UpdateClass";
import AddClass from "../pages/Dashboard/Instructor/AddClass/AddClass";
import MyClasses from "../pages/Dashboard/Instructor/MyClasses/MyClasses";
import Swal from "sweetalert2";
import SelectedClasses from "../pages/Dashboard/Student/SelectedClasses/SelectedClasses";
import EnrolledClasses from "../pages/Dashboard/Student/EnrolledClasses/EnrolledClasses";
import SignInSignUpModal from "../shared-components/SignInSignUpModal/SignInSignUpModal";


export const Toast = Swal.mixin({
  toast: true,
  position: 'bottom',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})



export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/instructors",
        element: <Instructors />,
      },
      {
        path: "/all-classes",
        element: <AllClasses />,
      },
      {
        path: "/signin",
        element: <SignInSignUpModal />,
      },
      // {
      //   path: "/signup",
      //   element: <SignUp/>,
      // },
    ],
  },
  {
    path: "dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "/dashboard/add-class",
        element: <AddClass />,
      },
      {
        path: "/dashboard/my-classes",
        element: <MyClasses />,
      },
      {
        path: "/dashboard/my-classes/update-class/:id",
        element: <UpdateClass />,
      },
      {
        path: "/dashboard/selected-classes",
        element: <SelectedClasses />,
      },
      {
        path: "/dashboard/enrolled-classes",
        element: <EnrolledClasses />,
      },
    ],
  },
]);
