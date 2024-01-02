import { Link, NavLink } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import logo from "/assets/logo2-removebg-preview.png";
import "./Navbar.css";
import { Button } from "@mui/material";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useEffect, useRef, useState } from "react";
import { Toast } from "../../Toast/Toast";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
const Navbar = () => {
  // Ref to the header element
  const headerRef = useRef();

  // State for managing the mobile navigation menu
  const [isNavOpen, setIsNavOpen] = useState(false);

  // Auth context for handling authentication actions
  const { toggleSignInSignUpModal, currentUser, logOut, user_data } =
    useAuthContext();

  // Function to handle user sign-out
  const handleSignOut = () => {
    logOut()
      .then(() => {
        // Show success toast if user was signed out successfully
        if (currentUser) {
          Toast.fire({
            icon: "success",
            title: "Succesfully Signed Out",
          });
        }
      })
      .catch(() => {
        // Show error toast if an error occurred during sign-out
        Toast.fire({
          icon: "error",
          title: "Error ocurred! Try Again",
        });
      });
  };

  // Function to toggle the mobile navigation menu
  const handleToggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  useEffect(() => {
    function handleScroll(e) {
      e.stopPropagation();
      const scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;

      // Apply header animation based on scroll position
      if (scrollTop > 100) {
        headerRef.current.style.transform = "translate3d(0, -100%, 0)";
      } else {
        headerRef.current.style.transform = "translate3d(0, 0, 0)";
      }
    }

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll, false);

    // Remove scroll event listener on component unmount
    return () => window.removeEventListener("scroll", handleScroll, false);
  }, []);
  return (
    <header ref={headerRef}>
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
                        ? "statistics"
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

        {isNavOpen ? (
          <CloseIcon className="hamburger-menu" onClick={handleToggleNav} />
        ) : (
          <MenuIcon className="hamburger-menu" onClick={handleToggleNav} />
        )}
      </div>
    </header>
  );
};

export default Navbar;
