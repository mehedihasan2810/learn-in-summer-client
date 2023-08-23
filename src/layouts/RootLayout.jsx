import SignInSignUpModal from "../shared-components/SignInSignUpModal/SignInSignUpModal";
import Navbar from "../shared-components/Navbar/Navbar";
import { Outlet, ScrollRestoration } from "react-router-dom";
import Footer from "../shared-components/Footer/Footer";
import { createPortal } from "react-dom";
import UserProfile from "../shared-components/ui/UserProfile/UserProfile";

const RootLayout = () => {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
      {createPortal(<SignInSignUpModal />, document.body)}
      <ScrollRestoration />
     
      <UserProfile/>
    </>
  );
};

export default RootLayout;
