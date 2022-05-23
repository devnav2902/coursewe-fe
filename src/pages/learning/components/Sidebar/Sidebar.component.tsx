import { FC, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import Loading from "../../../../components/Loading/Loading.component";
import {
  useAppDispatch,
  useTypedSelector,
} from "../../../../hooks/redux.hooks";
import { getSections } from "../../../../redux/slices/learning.slice";
import {
  StyledSectionWrapper,
  StyledSidebar,
} from "../../styles/learning.styles";
import SectionItem from "./SectionItem.component";

const Sidebar: FC = () => {
  const [offset, setOffset] = useState<number>(0);

  const { dataCourse, sections } = useTypedSelector((state) => state.learning);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (dataCourse.course) {
      const { id } = dataCourse.course;
      dispatch(getSections(id));
    }
  }, [dataCourse.loadedCourse, dispatch, dataCourse.course]);

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
          <IoMdClose size="20px" />
        </button>
      </div>
      <StyledSectionWrapper className="sections">
        {!sections.loaded ? (
          <Loading />
        ) : (
          sections.data.map((section) => (
            <SectionItem key={section.id} section={section} />
          ))
        )}
      </StyledSectionWrapper>
    </StyledSidebar>
  );
};

export default Sidebar;
