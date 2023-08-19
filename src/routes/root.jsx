import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import InstructorRoute from "./InstructorRoute";
import ManageClasses from "../pages/Dashboard/Admin/ManageClasses/ManageClasses";
import AdminRoute from "./AdminRoute";
import PrivateRoute from "./PrivateRoute";
import Home from "../pages/Home/Home";
import Instructors from "../pages/Instructors/Instructors";
// import AllClasses from "../pages/AllClasses/AllClasses";
import UpdateClass from "../pages/Dashboard/Instructor/UpdateClass/UpdateClass";
import AddClass from "../pages/Dashboard/Instructor/AddClass/AddClass";
import MyClasses from "../pages/Dashboard/Instructor/MyClasses/MyClasses";
import SelectedClasses from "../pages/Dashboard/Student/SelectedClasses/SelectedClasses";
import EnrolledClasses from "../pages/Dashboard/Student/EnrolledClasses/EnrolledClasses";
import SignInSignUpModal from "../shared-components/SignInSignUpModal/SignInSignUpModal";
import Payment from "../pages/Dashboard/Student/Payment/Payment";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers/ManageUsers";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import PaymentDetails from "../pages/Dashboard/Student/PaymentDetails/PaymentDetails";
import { Suspense, lazy } from "react";

const AllClasses = lazy(() => import("../pages/AllClasses/AllClasses"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
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
        element: (
          <Suspense fallback={<div>loading.............</div>}>
            <AllClasses />
          </Suspense>
        ),
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
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/dashboard/add-class",
        element: (
          <InstructorRoute>
            <AddClass />
          </InstructorRoute>
        ),
      },
      {
        path: "/dashboard/my-classes",
        element: (
          <InstructorRoute>
            <MyClasses />
          </InstructorRoute>
        ),
      },
      {
        path: "/dashboard/my-classes/update-class/:id",
        element: (
          <InstructorRoute>
            <UpdateClass />
          </InstructorRoute>
        ),
      },
      {
        path: "/dashboard/selected-classes",
        element: (
          <PrivateRoute>
            <SelectedClasses />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/enrolled-classes",
        element: (
          <PrivateRoute>
            <EnrolledClasses />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/selected-classes/payment/:id",
        element: (
          <PrivateRoute>
            <Payment />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/payment-details",
        element: (
          <PrivateRoute>
            <PaymentDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/manage-classes",
        element: (
          <AdminRoute>
            <ManageClasses />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/manage-users",
        element: (
          <AdminRoute>
            <ManageUsers />
          </AdminRoute>
        ),
      },
    ],
  },
]);
