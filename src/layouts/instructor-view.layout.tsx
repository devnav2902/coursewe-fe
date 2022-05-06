import { FC } from "react";
import SideBarOverview from "../components/SideBarOverview/SideBarOverview.component";
import styled from "styled-components";

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
      <div className="main-page">
        <SideBarOverview />
        <main>{children}</main>
      </div>
    </StyledWrapper>
  );
};
export default OverviewLayout;
