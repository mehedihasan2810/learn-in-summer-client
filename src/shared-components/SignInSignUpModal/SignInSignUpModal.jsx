import { useRef, useState } from "react";
import "./SignInSignUpModal.css";
import SignIn from "./SignIn/SignIn";
import SignUp from "./SignUp/SignUp";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useAuthContext } from "../../hooks/useAuthContext";

// Array representing the tabs
const tabs = ["Sign In", "Sign Up"];

function SignInSignUpModal() {
  // State to track the current active tab
  const [currentTab, setCurrentTab] = useState(0);

  // Ref for the underline element
  const underRef = useRef(null);

  // Function to handle tab switch
  const handleTab = (index) => {
    // Move the underline element based on the selected tab
    underRef.current.style.left = `calc(calc(100% / 2) * ${index})`;

    // Set the current active tab
    setCurrentTab(index);
  };

  // Auth context for accessing authentication actions and modal state
  const { toggleSignInSignUpModal, isSignInSignUpModalOpen } = useAuthContext();

  return (
    <div
      className={
        isSignInSignUpModalOpen
          ? "modal-container modal-open"
          : "modal-container"
      }
    >
      <div
        className={
          isSignInSignUpModalOpen
            ? "form-container form-open"
            : "form-container"
        }
      >
        <div className="tab-container">
          {tabs.map((tab, index) => (
            <button
              key={index}
              className={currentTab === index ? "active" : ""}
              onClick={() => handleTab(index)}
            >
              {tab}
            </button>
          ))}

          <div ref={underRef} className="under"></div>
        </div>
        {currentTab === 0 && <SignIn />}
        {currentTab === 1 && <SignUp />}

        <div className="close-container">
          <IconButton
            onClick={toggleSignInSignUpModal}
            color="primary"
            size="large"
            aria-label="close the modal"
          >
            <CloseIcon />
          </IconButton>
        </div>
      </div>
    </div>
  );
}

export default SignInSignUpModal;
