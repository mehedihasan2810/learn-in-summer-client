import { useRef, useState } from "react";
import "./SignUp.css";

const tabs = ["Sign In", "Sign Up"];

function SignUp() {
  const [open, setOpen] = useState(true);
  const [currentTab, setCurrentTab] = useState(0);

  const [activeTab, setActiveTab] = useState("Sign In");
  const underRef = useRef(null);

  const handleTab = (e, index, tab) => {
    underRef.current.style.left = `calc(calc(100% / 2) * ${index})`;
    setActiveTab(tab);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleTabChange = (tabIndex) => {
    setCurrentTab(tabIndex);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // Handle sign in or sign up form submission
  };

  return (
    <div className="modal-container">
      <div className="form-container">
        <div className="tab-container">
          {tabs.map((tab, index) => (
            <button
              key={index}
              className={activeTab === tab ? "active" : ""}
              onClick={(e) => handleTab(e, index, tab)}
            >
              {tab}
            </button>
          ))}

          {/* <button onClick={() => handleTabChange(1)}>Sign Up</button> */}
          <div ref={underRef} className="under"></div>
        </div>
        {currentTab === 0 && (
          <form onSubmit={handleFormSubmit}>
            <h2>Sign In</h2>
            {/* Sign In form fields */}
            <input
              type="text"
              placeholder="Username"
              style={{ marginBottom: "1rem" }}
            />
            <input
              type="password"
              placeholder="Password"
              style={{ marginBottom: "1rem" }}
            />
            <button type="submit">Sign In</button>
          </form>
        )}
        {currentTab === 1 && (
          <form onSubmit={handleFormSubmit}>
            <h2>Sign Up</h2>
            {/* Sign Up form fields */}
            <input
              type="text"
              placeholder="Username"
              style={{ marginBottom: "1rem" }}
            />
            <input
              type="email"
              placeholder="Email"
              style={{ marginBottom: "1rem" }}
            />
            <input
              type="password"
              placeholder="Password"
              style={{ marginBottom: "1rem" }}
            />
            <button type="submit">Sign Up</button>
          </form>
        )}
        <button onClick={handleClose}>Close</button>
      </div>
    </div>
  );
}

export default SignUp;
