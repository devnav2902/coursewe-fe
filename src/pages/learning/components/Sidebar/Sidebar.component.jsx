import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import Loading from "../../../../components/Loading/Loading.component";
import { getSections } from "../../../../redux/actions/learning.actions";
import {
  StyledSectionWrapper,
  StyledSidebar,
} from "../../styles/learning.styles";
import SectionItem from "./SectionItem.component";

const Sidebar = () => {
  const [offset, setOffset] = useState(0);

  const { dataCourse, sections } = useSelector((state) => state.learning);
  const dispatch = useDispatch();
  // console.log(dataCourse.course.slug);

  useEffect(() => {
    if (dataCourse.course) {
      const { id } = dataCourse.course;
      dispatch(getSections(id));
    }
  }, [dataCourse.loadedCourse, dispatch]);

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
            <SectionItem
              key={section.id}
              section={section}
              dataCourse={dataCourse}
            />
          ))
        )}
      </StyledSectionWrapper>
    </StyledSidebar>
  );
};

export default Sidebar;
