import { useDispatch, useSelector } from "react-redux";
import {
  cancelCreateLecture,
  cancelEditTitle,
} from "../../../redux/actions/curriculum.actions";
import CURRICULUM from "../utils/constants";

const FormEditTitle = ({ title, type, edit = true }) => {
  const action = edit ? "Lưu" : "Thêm";
  const dispatch = useDispatch();
  const { displayCreateLecture, displayCreateSection } = useSelector(
    (state) => state.curriculum
  );

  const handleCancelEditTitle = () => {
    if (!edit && type === CURRICULUM.LECTURE) {
      // create lecture
      dispatch(cancelCreateLecture);
    } else {
      // edit section/lecture & create section
      dispatch(cancelEditTitle);
    }
  };

  return (
    <form className="curriculum-form">
      <div className={"curriculum-form__title"}>
        <span className={"curriculum-form-txt"}>
          {type === "lecture" ? "Bài giảng" : "Chương học"}
        </span>
        <input
          maxLength="80"
          name="title"
          placeholder="Enter a Title"
          type="text"
          defaultValue={title}
        />
      </div>
      <div className="curriculum-form__footer">
        {/* Trường hợp click button tạo lecture */}
        {(edit || displayCreateLecture || displayCreateSection) && (
          <button type="button" onClick={handleCancelEditTitle}>
            Hủy bỏ
          </button>
        )}

        <button type="button">{action}</button>
      </div>
    </form>
  );
};

export default FormEditTitle;
