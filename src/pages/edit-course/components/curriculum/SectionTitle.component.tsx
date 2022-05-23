import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import { FC } from "react";
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import { useParams } from "react-router-dom";
import SectionApi from "../../../../api/section.api";
import {
  useAppDispatch,
  useTypedSelector,
} from "../../../../hooks/redux.hooks";
import {
  getSections,
  setElementDisplay,
  updateSections,
} from "../../../../redux/slices/curriculum.slice";
import { Section } from "../../../../ts/types/course.types";
import { CURRICULUM_TYPES } from "../../utils/constants";

export type SectionTitleProps = {
  data: Section;
  updatedTitle: string;
  nthSection: number;
};

const SectionTitle: FC<SectionTitleProps> = ({
  data,
  updatedTitle,
  nthSection,
}) => {
  const { title, id } = data;

  const { id: courseId } = useParams() as { id: string };

  const dispatch = useAppDispatch();

  const {
    sections: { data: sections },
  } = useTypedSelector((state) => state.curriculum);

  function deleteSection() {
    Modal.confirm({
      title: "Thông báo",
      icon: <ExclamationCircleOutlined />,
      content: "Bạn xác nhận muốn xóa chương học này khỏi khóa học?",
      okText: "Đồng ý",
      cancelText: "Hủy bỏ",
      onOk: () => {
        return new Promise((resolve, reject) => {
          SectionApi.delete(id, courseId)
            .then((res) => {
              const restSections = sections.filter(
                (section) => section.id !== id
              );

              dispatch(updateSections(restSections));
              resolve(res);
            })
            .catch((e) => reject(e));
        });
      },
      onCancel() {},
    });
  }

  return (
    <div className="section-content__title">
      <span className="section">Chương {nthSection}:</span>
      <span className="curriculum-title">
        <i className="fas fa-file-alt"></i>
        <span>{updatedTitle || title}</span>
      </span>
      <button
        type="button"
        onClick={() =>
          dispatch(setElementDisplay({ id, type: CURRICULUM_TYPES.SECTION }))
        }
        className="item-icon-button section-edit-btn"
      >
        <FaPencilAlt />
      </button>
      <button
        onClick={deleteSection}
        type="button"
        className="item-icon-button section-delete-btn"
      >
        <FaTrash />
      </button>
    </div>
  );
};

export default SectionTitle;
