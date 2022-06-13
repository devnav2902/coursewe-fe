import { FC, useContext, useEffect, useState } from "react";
import Loading from "../../../../components/Loading/Loading.component";
import { CheckVideoContext } from "../../hooks/leaning.hooks";
import {
  StyledSectionWrapper,
  StyledSidebar,
} from "../../styles/learning.styles";
import SectionItem from "./SectionItem.component";

const Sidebar: FC = () => {
  const [offset, setOffset] = useState<number>(0);

  const {
    dataCourse: { data, loaded },
  } = useContext(CheckVideoContext);

  useEffect(() => {
    const onScroll = () => setOffset(window.pageYOffset);
    // clean up code
    window.removeEventListener("scroll", onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const positionSidebar = offset <= 56 ? 56 - offset : 0;

  return (
    <StyledSidebar
      position={positionSidebar + "px"}
      className="sidebar-container"
    >
      <div className="sidebar-container__header d-flex align-items-center">
        <div className="title">Nội dung khóa học</div>
        <button type="button" id="sidebar-close-btn">
          {/* <IoMdClose size="20px" /> */}
        </button>
      </div>
      <StyledSectionWrapper className="sections">
        {!loaded ? (
          <Loading />
        ) : (
          data?.section.map((section) => (
            <SectionItem key={section.id} section={section} />
          ))
        )}
      </StyledSectionWrapper>
    </StyledSidebar>
  );
};

export default Sidebar;
