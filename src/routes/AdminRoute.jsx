import { Navigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";


const AdminRoute = ({ children }) => {
   // Get the current location using react-router-dom's useLocation hook
  const location = useLocation();

  // Extract necessary authentication context values using useAuthContext hook
  const {isAuthLoading, user_data,isUserLoading } = useAuthContext();

  // If authentication or user data is still loading, display a loader
  if (isAuthLoading || isUserLoading) {
    return (
      <div
        className="loader"
        style={{
          margin: "200px auto",
        }}
      ></div>
    );
  }

   // If the user is an admin, render the children components
  if (user_data?.role === 'admin') {
    return children;
  } else {
     // If the user is not an admin, redirect to the home page with the current location stored in state
    return <Navigate to="/" state={{ from: location }} replace />;
  }
};

export default AdminRoute;
