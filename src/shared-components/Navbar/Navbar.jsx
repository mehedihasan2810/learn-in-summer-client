import { Link, NavLink } from "react-router-dom";
import logo from '/assets/logo2-removebg-preview.png'
import "./Navbar.css";
const Navbar = () => {
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
            <li>
              <NavLink
                to="/"
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
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
