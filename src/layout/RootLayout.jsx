import { Outlet } from "react-router-dom";

import MainNavigation from "./MainNavigation";
import Footer from "./Footer";

const RootLayout = (props) => {
  return (
    <>
      <MainNavigation setCurrency={props.setCurrency} />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default RootLayout;
