import { FC, useRef } from "react";
import { useParams } from "react-router-dom";
import LectureApi from "../../../../api/lecture.api";
import SectionApi from "../../../../api/section.api";
import {
  useAppDispatch,
  useTypedSelector,
} from "../../../../hooks/redux.hooks";
import {
  cancelCreateLecture,
  cancelEditTitle,
  getSections,
  hideCreateSection,
} from "../../../../redux/slices/curriculum.slice";
import { openNotification } from "../../../../utils/functions";
import { CURRICULUM_TYPES } from "../../utils/constants";
import { LectureType, SectionType } from "../../utils/instructor-course.types";

type FormEditTitleProps = {
  title: string;
  type: SectionType | LectureType;
  edit?: boolean;
  setUpdatedTitle?: (title: string) => void;
  sectionId?: number | string;
  getLatestSection?: () => void;
};

const FormEditTitle: FC<FormEditTitleProps> = ({
  title,
  type,
  edit = true,
  setUpdatedTitle,
  sectionId,
  getLatestSection,
}) => {
  const action = edit ? "Lưu" : "Thêm";

  const dispatch = useAppDispatch();

  const { displayCreateLecture, displayCreateSection, elementDisplay } =
    useTypedSelector((state) => state.curriculum);

  const { id: courseId } = useParams() as { id: string };

  const titleRef = useRef<HTMLInputElement>(null);

  function handleCancelEditTitle() {
    if (!edit && type === CURRICULUM_TYPES.LECTURE) {
      // cancel create lecture
      dispatch(cancelCreateLecture());
    } else {
      // edit section/lecture & create section
      dispatch(cancelEditTitle());
    }
  }

  function saveTitle() {
    if (!titleRef.current) return;
    const value = titleRef.current.value;

    if (edit && elementDisplay.id) {
      if (type === "lecture") {
        LectureApi.update({
          lectureId: elementDisplay.id,
          courseId,
          title: value,
        }).then((res) => {
          console.log(res);
          openNotification("success", "Lưu thành công!");
          setUpdatedTitle && setUpdatedTitle(value);
          dispatch(cancelEditTitle());
        });

        return;
      }

      SectionApi.update({
        sectionId: elementDisplay.id,
        courseId,
        title: value,
      }).then((res) => {
        console.log(res);
        openNotification("success", "Lưu thành công!");
        setUpdatedTitle && setUpdatedTitle(value);
        dispatch(cancelEditTitle());
      });

      return;
    }

    type === "lecture" && sectionId
      ? LectureApi.create({
          sectionId,
          courseId,
          title: value,
        }).then((res) => {
          openNotification("success", "Tạo bài giảng thành công!");
          getLatestSection && getLatestSection();
        })
      : type === "section" &&
        SectionApi.create({ courseId, title: value }).then((res) => {
          openNotification("success", "Tạo chương học thành công!");
          dispatch(getSections(courseId));
          dispatch(hideCreateSection());
        });
  }

  return (
    <div className="curriculum-form">
      <div className={"curriculum-form__title"}>
        <span className={"curriculum-form-txt"}>
          {type === "lecture" ? "Bài giảng" : "Chương học"}
        </span>
        <input
          ref={titleRef}
          maxLength={80}
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

        <button type="button" onClick={saveTitle}>
          {action}
        </button>
      </div>
    </div>
  );
};

export default FormEditTitle;
