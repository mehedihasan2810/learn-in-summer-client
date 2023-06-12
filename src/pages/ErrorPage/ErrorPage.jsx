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
          src="https://cdn.pixabay.com/photo/2021/01/30/21/26/magnifying-5965372_960_720.jpg"
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
