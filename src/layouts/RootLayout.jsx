import Navbar from "../shared-components/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../shared-components/Footer/Footer";
import SignInSignUpModal from "../shared-components/SignInSignUpModal/SignInSignUpModal";
import { useAuthContext } from "../hooks/useAuthContext";
import { useEffect } from "react";

const RootLayout = () => {
  const { isSignInSignUpModalOpen } = useAuthContext();

  useEffect(() => {
    if (isSignInSignUpModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "visible";
    }
  }, [isSignInSignUpModalOpen]);
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
      {isSignInSignUpModalOpen && <SignInSignUpModal />}
    </>
  );
};

export default RootLayout;
