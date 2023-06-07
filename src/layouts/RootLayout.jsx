import Navbar from "../shared-components/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../shared-components/Footer/Footer";

const RootLayout = () => {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default RootLayout;
