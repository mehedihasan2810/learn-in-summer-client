import { Link, NavLink } from "react-router-dom";
import logo from "/assets/logo2-removebg-preview.png";
import "./Navbar.css";
import { Button } from "@mui/material";
import { useAuthContext } from "../../hooks/useAuthContext";
import { Toast } from "../../routes/root";
const Navbar = () => {
  const { toggleSignInSignUpModal, currentUser, logOut } = useAuthContext();
  console.log(currentUser);

  const handleSignOut = () => {
    logOut()
    .then(() => {

      // *show toast
      if (currentUser) {
        Toast.fire({
          icon: "success",
          title: "Succesfully Signed Out",
        });
      }

    })
    .catch((error) => {
      console.log(error)
      Toast.fire({
        icon: "error",
        title: "Error ocurred! Try Again",
      });
    });
  }
  return (
    <header>
      <div className="center-container flex-center">
        <div className="logo-container flex-center">
          <img src={logo} alt="Logo" />
          <Link to="/">
            <h4>LearnInSummer</h4>
          </Link>
        </div>
        <nav>
          <ul className="flex-center">
            <li>
              <NavLink
                to="/"
                className={({ isActive, isPending }) =>
                  isPending ? "pending" : isActive ? "active" : ""
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/instructors"
                className={({ isActive, isPending }) =>
                  isPending ? "pending" : isActive ? "active" : ""
                }
              >
                Instructor
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/all-classes"
                className={({ isActive, isPending }) =>
                  isPending ? "pending" : isActive ? "active" : ""
                }
              >
                Classes
              </NavLink>
            </li>
            {currentUser ? (
              <>
                <li>
                  <NavLink
                    to="/dashboard"
                    className={({ isActive, isPending }) =>
                      isPending ? "pending" : isActive ? "active" : ""
                    }
                  >
                    Dashboard
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/"
                    className={({ isActive, isPending }) =>
                      isPending ? "pending" : isActive ? "active" : ""
                    }
                  >
                    Profile
                  </NavLink>
                </li>
                <li>
                  <Button
                    onClick={handleSignOut}
                    sx={{
                      color: "#fff",
                    }}
                    variant="outlined"
                  >
                    Sign Out
                  </Button>
                </li>
              </>
            ) : (
              <li>
                <Button
                  onClick={toggleSignInSignUpModal}
                  sx={{
                    color: "#fff",
                  }}
                  variant="outlined"
                >
                  Sign In
                </Button>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
