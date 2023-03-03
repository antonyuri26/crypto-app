import { Outlet } from "react-router-dom";

import MainNavigation from "./MainNavigation";
import Footer from "./Footer";

const styles = {
  background: {
    background: "#000",
  },
};

const RootLayout = () => {
  return (
    <>
      <MainNavigation />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default RootLayout;
