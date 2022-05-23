import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import { FC, useContext, memo } from "react";
import { FaFileDownload, FaTrash } from "react-icons/fa";
import { useParams } from "react-router-dom";
import ResourceApi from "../../../../api/resource.api";
import { LectureContext } from "../../hooks/curriculum.hooks";
import { ResourceContainer } from "../../styles/curriculum.styles";

const Resources: FC = () => {
  const { id: courseId } = useParams();

  const {
    lectureData: {
      lecture,
      handle: { getLatestLecture },
    },
    uploadResources: { handleDisplayUploadResources },
  } = useContext(LectureContext);

  // function getLatestResources() {
  //   ResourceApi.getByLectureId(lectureId)
  //     .then((res) => {
  //       console.log(res);
  //       setResources(res.data.resources);
  //     })
  //     .catch((error) => error);
  // }

  function deleteResource(resourceId: number, courseId: number) {
    Modal.confirm({
      title: "Thông báo",
      icon: <ExclamationCircleOutlined />,
      content: "Bạn xác nhận muốn gỡ tài liệu này khỏi bài học?",
      okText: "Đồng ý",
      cancelText: "Hủy bỏ",
      onOk: () => {
        if (courseId) {
          return new Promise((resolve, reject) => {
            lecture?.id &&
              ResourceApi.delete(lecture.id, courseId, resourceId)
                .then((res) => {
                  getLatestLecture();
                  resolve(res);
                })
                .catch((e) => reject(e));
          });
        }
      },
      onCancel() {},
    });
  }

  return (
    <ResourceContainer className="resources">
      {lecture && lecture.resource.length > 0 && (
        <>
          <p>Tài liệu bài giảng</p>
          <div className="list">
            {lecture.resource.map((resourceItem) => {
              const { filesize, original_filename, id } = resourceItem;
              return (
                <div key={id} className="item">
                  <div className="item__file">
                    <div className="icon">
                      <FaFileDownload />
                    </div>
                    <span className="filename">{original_filename}</span>
                    <span className="filesize">({filesize})</span>
                  </div>
                  <button
                    onClick={() =>
                      courseId && deleteResource(id, parseInt(courseId))
                    }
                    type="button"
                    className="delete-asset-btn"
                  >
                    <FaTrash />
                  </button>
                </div>
              );
            })}
          </div>
        </>
      )}
      <div className="add-resource">
        <button
          onClick={handleDisplayUploadResources}
          className="lecture-add-resource"
        >
          + Tài liệu
        </button>
      </div>
    </ResourceContainer>
  );
};

export default memo(Resources);
