import { FC } from "react";
import styled from "styled-components";
import SideBarOverview from "../components/SideBarOverview/SideBarOverview.component";
import { NavTop } from "./components/instructor-view.components";

const StyledWrapper = styled.div`
  min-height: 100vh;
  .main-page {
    display: flex;
    > main {
      flex-grow: 1;

      max-width: 1200px;
      width: 100%;
      margin: auto;
      padding: 3rem 6rem;
    }
  }
`;

const OverviewLayout: FC = ({ children }) => {
  return (
    <StyledWrapper>
      <NavTop />
      <div className="main-page spacing-top-nav">
        <SideBarOverview />
        <main>{children}</main>
      </div>
    </StyledWrapper>
  );
};
export default OverviewLayout;
