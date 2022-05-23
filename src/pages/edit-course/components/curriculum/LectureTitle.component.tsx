import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import { FC, useContext } from "react";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import { GoChevronDown, GoChevronUp } from "react-icons/go";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../../../../hooks/redux.hooks";
import {
  deleteLecture,
  setElementDisplay,
} from "../../../../redux/slices/curriculum.slice";
import { Lecture } from "../../../../ts/types/course.types";
import { LectureContext } from "../../hooks/curriculum.hooks";
import { CURRICULUM_TYPES } from "../../utils/constants";

const LectureTitle: FC = () => {
  const {
    uploadMedia: { displayUploadMedia },
    uploadResources: { displayUploadResources },
    displayResourceData: { displayResources, handleDisplayResources },
    lectureUploading: { lectureUploading },
    contentTab: { handleDisplayContentTab, displayContentTab },
    lectureData: { lecture },
    nthLecture,
  } = useContext(LectureContext);

  const { title, src, id, resource } = lecture as Lecture;

  const dispatch = useAppDispatch();

  const { id: courseId } = useParams();

  function handleDeleteLecture() {
    if (courseId && lecture) {
      Modal.confirm({
        title: "Thông báo",
        icon: <ExclamationCircleOutlined />,
        content: "Bạn xác nhận muốn xóa bài giảng này khỏi chương học?",
        okText: "Đồng ý",
        cancelText: "Hủy bỏ",
        onOk: () => {
          return new Promise((resolve, reject) => {
            dispatch(
              deleteLecture({
                courseId: parseInt(courseId),
                lectureId: id,
                sectionId: lecture.section_id,
              })
            )
              .then((res) => {
                resolve(res);
              })
              .catch((e) => reject(e));
          });
        },
        onCancel() {},
      });
    }
  }

  return (
    <div className="lecture-content__title">
      <div className="lecture-editor">
        <span className="lecture">
          <BsFillCheckCircleFill />
          <span className="order">Bài giảng {nthLecture}:</span>
        </span>
        <span className="curriculum-title">{title}</span>
        <button
          disabled={lectureUploading ? true : false}
          type="button"
          onClick={() =>
            dispatch(setElementDisplay({ id, type: CURRICULUM_TYPES.LECTURE }))
          }
          className="lecture-edit-btn item-icon-button"
        >
          <FaPencilAlt />
        </button>
        <button
          onClick={handleDeleteLecture}
          type="button"
          className="lecture-delete-btn item-icon-button"
        >
          <FaTrash />
        </button>
      </div>

      {!src &&
        !displayContentTab &&
        !displayUploadMedia &&
        !displayUploadResources && (
          <div className="add-content">
            <button
              type="button"
              onClick={handleDisplayContentTab}
              className="lecture-add-content"
            >
              + Nội dung
            </button>
          </div>
        )}

      {(resource.length > 0 || src) && (
        <div className="lecture-collapse">
          <button
            type="button"
            onClick={handleDisplayResources}
            className="lecture-collapse-btn d-flex align-items-center"
          >
            {displayResources ? <GoChevronUp /> : <GoChevronDown />}
          </button>
        </div>
      )}
    </div>
  );
};

export default LectureTitle;
