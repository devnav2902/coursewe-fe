import { FaPencilAlt, FaTrash } from "react-icons/fa";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { GoChevronDown, GoChevronUp } from "react-icons/go";
import CURRICULUM from "../utils/constants";

const LectureTitle = (props) => {
  const {
    data: { order, title, src, id },
    handleDisplayResources,
    displayResources,
    editTitleFunc: onEditTitle,
  } = props;

  return (
    <div className="lecture-content__title">
      <div className="lecture-editor">
        <span className="lecture">
          <BsFillCheckCircleFill />
          <span className="order">Bài giảng {order}:</span>
        </span>
        <span className="curriculum-title">{title}</span>
        <button
          onClick={() => onEditTitle(id, CURRICULUM.LECTURE)}
          className="lecture-edit-btn item-icon-button"
        >
          <FaPencilAlt />
        </button>
        <button className="lecture-delete-btn item-icon-button">
          <FaTrash />
        </button>
      </div>
      {!src && (
        <div className="add-content">
          <button className="lecture-add-content">+ Nội dung</button>
        </div>
      )}
      <div className="lecture-collapse">
        <button
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
