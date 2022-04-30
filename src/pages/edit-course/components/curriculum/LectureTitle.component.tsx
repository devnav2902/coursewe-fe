import { FaPencilAlt, FaTrash } from "react-icons/fa";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { GoChevronDown, GoChevronUp } from "react-icons/go";
import { CURRICULUM_TYPES } from "../../utils/constants";
import { FC } from "react";
import { Lecture } from "../../../../ts/types/course.types";
import { LectureType, SectionType } from "../../utils/instructor-course.types";
import { useParams } from "react-router-dom";

type LectureTitleProps = {
  data: Lecture;
  handleDisplayResources: () => void;
  displayResources: boolean;
  editTitleFunc: (id: number, type: LectureType | SectionType) => void;
  deleteLecture: (lectureId: number, courseId: number) => void;
};

const LectureTitle: FC<LectureTitleProps> = (props) => {
  const {
    data: { order, title, src, id },
    handleDisplayResources,
    displayResources,
    editTitleFunc: onEditTitle,
    deleteLecture,
  } = props;

  const { id: courseId } = useParams();

  return (
    <div className="lecture-content__title">
      <div className="lecture-editor">
        <span className="lecture">
          <BsFillCheckCircleFill />
          <span className="order">Bài giảng {order}:</span>
        </span>
        <span className="curriculum-title">{title}</span>
        <button
          type="button"
          onClick={() => onEditTitle(id, CURRICULUM_TYPES.LECTURE)}
          className="lecture-edit-btn item-icon-button"
        >
          <FaPencilAlt />
        </button>
        <button
          onClick={() => courseId && deleteLecture(id, parseInt(courseId))}
          type="button"
          className="lecture-delete-btn item-icon-button"
        >
          <FaTrash />
        </button>
      </div>
      {!src && (
        <div className="add-content">
          <button type="button" className="lecture-add-content">
            + Nội dung
          </button>
        </div>
      )}
      <div className="lecture-collapse">
        <button
          type="button"
          onClick={handleDisplayResources}
          className="lecture-collapse-btn d-flex align-items-center"
        >
          {displayResources ? <GoChevronUp /> : <GoChevronDown />}
        </button>
      </div>
    </div>
  );
};

export default LectureTitle;
