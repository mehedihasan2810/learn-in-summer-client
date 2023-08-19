import SignInSignUpModal from "../shared-components/SignInSignUpModal/SignInSignUpModal";
import Navbar from "../shared-components/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../shared-components/Footer/Footer";
import { useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
const lenis = new Lenis();

const RootLayout = () => {
  // const { isSignInSignUpModalOpen } = useAuthContext();

  // useEffect(() => {
  //   if (isSignInSignUpModalOpen) {
  //     document.body.style.overflow = "hidden";
  //   } else {
  //     document.body.style.overflow = "visible";
  //   }
  // }, [isSignInSignUpModalOpen]);

  useLayoutEffect(() => {
    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);
  }, []);
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
      <SignInSignUpModal />
    </>
  );
};

export default RootLayout;
