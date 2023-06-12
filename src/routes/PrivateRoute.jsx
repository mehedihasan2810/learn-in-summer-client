import { Navigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

const PrivateRoute = ({ children }) => {
  const location = useLocation();

  const { currentUser, isAuthLoading } = useAuthContext();

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

  if (currentUser) {
    return children;
  } else {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
};

export default PrivateRoute;
