import { GrFormClose } from "react-icons/gr";
import { FilePond } from "react-filepond";
import FormEditTitle from "./FormEditTitle.component";
import LectureTitle from "./LectureTitle.component";
import CURRICULUM from "../utils/constants";
import { useSelector } from "react-redux";

const LectureItem = (props) => {
  const {
    data,
    handleFunc,
    dataDisplay,
    closeFunc,
    editTitleFunc,
    innerRef,
    ...restProps
  } = props;

  const {
    handleDisplayResources,
    handleDisplayUploadMedia,
    handleDisplayUploadResources,
  } = handleFunc;
  const { displayMedia, displayResources, displayUploadResources } =
    dataDisplay;
  const { closeUploadMedia, closeUploadResources } = closeFunc;
  const { id, title, resource, src, original_filename, updated_at } = data;

  const { elementDisplay } = useSelector((state) => state.curriculum);

  const isDisplayEditTitle =
    elementDisplay.id === id && elementDisplay.type === CURRICULUM.LECTURE;

  const lectureTitleProps = {
    data,
    handleDisplayResources,
    displayResources,
    editTitleFunc,
  };

  return (
    <li
      ref={innerRef}
      {...restProps}
      data-lecture={id}
      className="curriculum-content lecture-content"
    >
      {isDisplayEditTitle ? (
        <FormEditTitle title={title} type={CURRICULUM.LECTURE} />
      ) : (
        <LectureTitle {...lectureTitleProps} />
      )}

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
