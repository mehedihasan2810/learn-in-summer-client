import { Navigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

const InstructorRoute = ({ children }) => {
  const location = useLocation();

  const { currentUser, isAuthLoading, user_data, role } = useAuthContext();

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

  if (user_data.role === "instructor") {
    return children;
  } else {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
};

export default InstructorRoute;
