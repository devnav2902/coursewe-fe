import { FaPencilAlt, FaTrash } from "react-icons/fa";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { GoChevronDown, GoChevronUp } from "react-icons/go";
import { GrFormClose } from "react-icons/gr";
import { useState } from "react";
import { FilePond } from "react-filepond";

const LectureItem = ({ data }) => {
  const { id, title, order, resource, src, original_filename, updated_at } =
    data;
  const [displayResources, setDisplayResources] = useState(false);
  const [displayUploadResources, setDisplayUploadResources] = useState(false);
  const [displayMedia, setDisplayMedia] = useState(false);

  const handleDisplayUploadResources = () => {
    setDisplayUploadResources(true);
    setDisplayResources(false);
  };

  const handleDisplayResources = () => {
    setDisplayResources(!displayResources);
  };

  const closeUploadResources = () => {
    setDisplayUploadResources(false);
  };

  const closeUploadMedia = () => {
    setDisplayMedia(false);
  };

  const handleDisplayUploadMedia = () => {
    setDisplayMedia(true);
    setDisplayResources(false);
  };

  return (
    <li data-lecture={id} className="curriculum-content lecture-content">
      <div className="lecture-content__title">
        <div className="lecture-editor">
          <span className="lecture">
            <BsFillCheckCircleFill />
            <span className="order">Bài giảng {order}:</span>
          </span>
          <span className="curriculum-title">{title}</span>
          <button className="lecture-edit-btn item-icon-button">
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

      {displayResources && (
        <div className="content-tab content-resources">
          <div className="content-tab__asset content-tab__main">
            {src && (
              <div className="table">
                <table>
                  <thead>
                    <tr>
                      <th>Filename</th>
                      <th>Type</th>
                      <th>Status</th>
                      <th>Date</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{original_filename}</td>
                      <td>Video</td>
                      <td>Success</td>
                      <td>{updated_at}</td>
                      <td>
                        <button
                          onClick={handleDisplayUploadMedia}
                          className="replace-btn"
                          type="button"
                        >
                          Thay thế video
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>

                <span className="note">
                  <b>Note: </b>
                  Video phải đạt tối thiểu 720p và không vượt quá 2.0 GB
                </span>
              </div>
            )}

            <div className="resources">
              {!resource.length && (
                <>
                  <p>Downloadable materials</p>
                  <div className="list">
                    {resource.map((resourceItem) => (
                      <div
                        key={resourceItem.id}
                        data-lecture={id}
                        data-resource={resourceItem.id}
                        className="item"
                      >
                        <div className="item__file">
                          <div className="icon">
                            <i className="fas fa-download"></i>
                          </div>
                          <span className="filename">
                            {resourceItem.original_filename}
                          </span>
                        </div>
                        <button type="button" className="delete-asset-btn">
                          <i className="fas fa-trash"></i>
                        </button>
                      </div>
                    ))}
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
            </div>
          </div>
        </div>
      )}

      {displayMedia && (
        <div class="content-tab content-media">
          <div class="content-tab__header">
            <span>Thêm bài giảng</span>
            <button
              onClick={closeUploadMedia}
              type="button"
              class="content-tab-close d-flex align-items-center"
            >
              <GrFormClose />
            </button>
          </div>
          <div class="content-tab__media content-tab__main">
            <div class="content-tab__media-file">
              <span class="note">
                <b>Note: </b>
                All files should be at least 720p and less than 2.0 GB.
              </span>

              <div class="lecture-editor">
                <FilePond
                  // files={files}
                  // onupdatefiles={setFiles}
                  allowMultiple={false}
                  maxFiles={3}
                  server="/api"
                  name="files"
                  labelIdle={`<div class="input-group">
                    <div class="file-upload">Bạn chưa chọn video bài giảng</div>
                    <a class="filepond--label-action button-select-file">
                        Tải video lên
                    </a>
                </div>`}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {displayUploadResources && (
        <div class="content-tab content-upload-resource">
          <div class="content-tab__header">
            <span>Thêm tài liệu</span>
            <button
              onClick={closeUploadResources}
              type="button"
              class="content-tab-close d-flex align-items-center"
            >
              <GrFormClose />
            </button>
          </div>
          <div class="content-tab__resource content-tab__main">
            <div class="content-tab__resource-file">
              <span class="note">
                <b>Note: </b>
                Tài liệu được sử dụng để trợ giúp học viên trong bài giảng. kích
                thước tài liệu phải nhỏ hơn 1 GiB.
              </span>

              <div class="lecture-editor">
                <FilePond
                  // files={files}
                  // onupdatefiles={setFiles}
                  allowMultiple={false}
                  maxFiles={3}
                  server="/api"
                  name="files"
                  labelIdle={`<div class="input-group">
                  <div class="file-upload">Bạn chưa chọn tài liệu để tải lên</div>
                  <a class="filepond--label-action button-select-file">
                      Chọn file
                  </a>
              </div>`}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </li>
  );
};

export default LectureItem;
