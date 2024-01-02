import { Navigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

const PrivateRoute = ({ children }) => {
  // Get the current location using react-router-dom's useLocation hook
  const location = useLocation();

  // Extract necessary authentication context values using useAuthContext hook
  const { currentUser, isAuthLoading } = useAuthContext();

  // If authentication is still loading, display a loader
  if (isAuthLoading) {
    return (
      <div
        className="loader"
        style={{
          margin: "200px auto",
        }}
      ></div>
    );
  }

  // If the user is authenticated, render the children components
  if (currentUser) {
    return children;
  } else {
    // If the user is not authenticated, redirect to the home page with the current location stored in state
    return <Navigate to="/" state={{ from: location }} replace />;
  }
};

export default PrivateRoute;
