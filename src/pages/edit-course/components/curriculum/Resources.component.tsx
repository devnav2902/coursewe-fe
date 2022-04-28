import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import React, { FC } from "react";
import { FaFileDownload, FaTrash } from "react-icons/fa";
import { useParams } from "react-router-dom";
import ResourceApi from "../../../../api/resource.api";
import { ResourceItems } from "../../../../layouts/instructor-course.layout";
import { useResources } from "../../hooks/curriculum.hooks";
import { ResourceContainer } from "../../styles/curriculum.styles";

type ResourceProps = {
  resource: ResourceItems;
  lectureId: number;
  handleDisplayUploadResources: () => void;
};

const Resources: FC<ResourceProps> = ({
  resource,
  lectureId,
  handleDisplayUploadResources,
}) => {
  const { id: courseId } = useParams();

  const { resources, deleteResource } = useResources(lectureId, resource);

  return (
    <ResourceContainer className="resources">
      {resources.length > 0 && (
        <>
          <p>Tài liệu bài giảng</p>
          <div className="list">
            {resources.map((resourceItem) => {
              const { filesize, original_filename, id } = resourceItem;
              return (
                <div key={id} data-lecture={lectureId} className="item">
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

export default Resources;
