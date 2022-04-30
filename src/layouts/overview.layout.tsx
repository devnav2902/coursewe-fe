import { FC } from "react";
import SideBarOverview from "../components/SideBarOverview/SideBarOverview.component";

const OverviewLayout: FC = ({ children }) => {
  return (
    <div className="body-overview">
      <div className="wrapper instructor-page">
        <div className="main-overview-page">
          <SideBarOverview />
          <main>{children}</main>
          {/* <Footer /> */}
        </div>
      </div>
    </div>
  );
};
export default OverviewLayout;
