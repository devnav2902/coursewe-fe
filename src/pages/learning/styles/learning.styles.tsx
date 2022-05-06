import styled from "styled-components";

interface SidebarProps {
  position: string;
}

const StyledSidebar = styled.div<SidebarProps>`
  &.sidebar-container {
    max-height: 400px;
    width: 25%;
    position: fixed;
    right: 0;
    top: ${(props) => (props.position ? props.position : "56px")};
    z-index: 200;
    overflow-y: auto;

    .sidebar-container__header {
      z-index: 20;
      position: sticky;
      top: 0px;
      background-color: #fff;
      justify-content: space-between;
      border: 1px solid #d1d7dc;
      border-right: 0;
      padding: 16px;
      font-weight: 700;
    }
  }
`;

const StyledSectionWrapper = styled.div`
  background-color: #f7f9fa;

  .section {
    .container .bottom {
      font-size: 13px;
    }
    .title-section {
      font-weight: 700;
      margin-bottom: 6px;
    }
  }
`;

export { StyledSidebar, StyledSectionWrapper };
