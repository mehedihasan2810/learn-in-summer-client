import { Navigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";


const AdminRoute = ({ children }) => {
  const location = useLocation();

  const {isAuthLoading, user_data,isUserLoading } = useAuthContext();

  if (isAuthLoading || isUserLoading) {
    console.log('loading')
    return (
      <div
        className="loader"
        style={{
          margin: "200px auto",
        }}
      ></div>
    );
  }

  if (user_data?.role === 'admin') {
    return children;
  } else {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
};

export default AdminRoute;
