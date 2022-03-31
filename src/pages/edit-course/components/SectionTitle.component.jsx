import { FaPencilAlt, FaTrash } from "react-icons/fa";

const SectionTitle = (props) => {
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
        onClick={() => onEditTitle(id, "section")}
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
