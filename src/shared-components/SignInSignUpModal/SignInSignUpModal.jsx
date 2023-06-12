import { useRef, useState } from "react";
import "./SignInSignUpModal.css";
import SignIn from "./SignIn/SignIn";
import SignUp from "./SignUp/SignUp";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useAuthContext } from "../../hooks/useAuthContext";

const tabs = ["Sign In", "Sign Up"];

function SignInSignUpModal() {
  const [currentTab, setCurrentTab] = useState(0);

  const underRef = useRef(null);

  const handleTab = (index) => {
    underRef.current.style.left = `calc(calc(100% / 2) * ${index})`;
    setCurrentTab(index);
  };

  const { toggleSignInSignUpModal, isSignInSignUpModalOpen } = useAuthContext();

  return (
    <div
      className={
        isSignInSignUpModalOpen
          ? "modal-container modal-open"
          : "modal-container"
      }
    >
      <div className="form-container">
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
