import { FC } from "react";
import {
  useAppDispatch,
  useTypedSelector,
} from "../../../../hooks/redux.hooks";
import {
  cancelCreateLecture,
  cancelEditTitle,
} from "../../../../redux/actions/curriculum.actions";
import { CURRICULUM_TYPES } from "../../utils/constants";
import { LectureType, SectionType } from "../../utils/instructor-course.types";

type FormEditTitleProps = {
  title: string;
  type: SectionType | LectureType;
  edit?: boolean;
};

const FormEditTitle: FC<FormEditTitleProps> = ({
  title,
  type,
  edit = true,
}) => {
  const action = edit ? "Lưu" : "Thêm";
  const dispatch = useAppDispatch();
  const { displayCreateLecture, displayCreateSection } = useTypedSelector(
    (state) => state.curriculum
  );

  const handleCancelEditTitle = () => {
    if (!edit && type === CURRICULUM_TYPES.LECTURE) {
      // cancel create lecture
      dispatch(cancelCreateLecture);
    } else {
      // edit section/lecture & create section
      dispatch(cancelEditTitle);
    }
  };

  return (
    <div className="curriculum-form">
      <div className={"curriculum-form__title"}>
        <span className={"curriculum-form-txt"}>
          {type === "lecture" ? "Bài giảng" : "Chương học"}
        </span>
        <input
          maxLength={80}
          name="title"
          placeholder="Nhập tiêu đề..."
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
    </div>
  );
};

export default FormEditTitle;
