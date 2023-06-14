import { Link, NavLink } from "react-router-dom";
import logo from "/assets/logo2-removebg-preview.png";
import "./Navbar.css";
import { Button } from "@mui/material";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useState } from "react";
import { Toast } from "../../Toast/Toast";
import { motion } from "framer-motion";
const Navbar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const { toggleSignInSignUpModal, currentUser, logOut, user_data } =
    useAuthContext();

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
        Toast.fire({
          icon: "error",
          title: "Error ocurred! Try Again",
        });
      });
  };

  const handleToggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };
  return (
    <header>
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
        <div className="center-container flex-center">
          <div className="logo-container flex-center">
            <img src={logo} alt="Logo" />
            <Link to="/">
              <h4>LearnInSummer</h4>
            </Link>
          </div>
          <nav className={isNavOpen ? "toggle-nav" : ""}>
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
                      to={`/dashboard/${
                        user_data?.role === "admin"
                          ? "manage-classes"
                          : user_data?.role === "instructor"
                          ? "my-classes"
                          : "selected-classes"
                      }`}
                      className={({ isActive, isPending }) =>
                        isPending ? "pending" : isActive ? "active" : ""
                      }
                    >
                      Dashboard
                    </NavLink>
                  </li>
                  <li>
                    <img
                      title={user_data?.name}
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "50%",
                        objectFit: "cover",
                      }}
                      src={user_data?.photoUrl}
                      alt=""
                    />
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

          <img
            onClick={handleToggleNav}
            className="hamburger-menu"
            src=""
            alt="toggle"
          />
        </div>
      </motion.div>
    </header>
  );
};

export default Navbar;
