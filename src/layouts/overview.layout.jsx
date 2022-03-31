import React from "react";
import Footer from "../components/Footer/Footer.component";
import SideBarOverview from "../components/SideBarOverview/SideBarOverview.component";
const OverviewLayout = ({ children }) => {
  return (
    <>
      <SideBarOverview />
      <main>{children}</main>
      {/* <Footer /> */}
    </>
  );
};
export default OverviewLayout;
