import { Link } from "react-router-dom";
import "./ErrorPage.css";
import { useTitlePerPage } from "../../hooks/useTitlePerPage";

const ErrorPage = () => {
  useTitlePerPage("Error Page");
  return (
    <div className="error-page-container">
      <div>
        <h2>404!</h2>
        <img
          src="https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80"
          alt="Not Found Image"
        />

        <Link className="link" to="/">
          back to home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
