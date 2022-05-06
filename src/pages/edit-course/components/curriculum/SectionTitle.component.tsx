import { FC } from "react";
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import { Section } from "../../../../ts/types/course.types";
import { LectureType, SectionType } from "../../utils/instructor-course.types";
import { CURRICULUM_TYPES } from "../../utils/constants";

export type SectionTitleProps = {
  data: Section;
  editTitleFunc: (id: number, type: LectureType | SectionType) => void;
};

const SectionTitle: FC<SectionTitleProps> = (props) => {
  const {
    data: { order, title, id },
    editTitleFunc: onEditTitle,
  } = props;

  return (
    <div className="section-content__title">
      <span className="section">Chương {order}:</span>
      <span className="curriculum-title">
        <i className="fas fa-file-alt"></i>
        <span>{title}</span>
      </span>
      <button
        type="button"
        onClick={() => onEditTitle(id, CURRICULUM_TYPES.SECTION)}
        className="item-icon-button section-edit-btn"
      >
        <FaPencilAlt />
      </button>
      <button type="button" className="item-icon-button section-delete-btn">
        <FaTrash />
      </button>
    </div>
  );
};

export default SectionTitle;
