import { FC } from "react";
import { GrFormClose } from "react-icons/gr";
import { useTypedSelector } from "../../../../hooks/redux.hooks";
import { Lecture } from "../../../../ts/types/course.types";
import { secondsToHMS } from "../../../../utils/functions";
import { useLecture, useResources } from "../../hooks/curriculum.hooks";
import { StyledTableContaier } from "../../styles/curriculum.styles";
import { CURRICULUM_TYPES } from "../../utils/constants";
import { LectureType, SectionType } from "../../utils/instructor-course.types";
import FileUpload from "./FileUpload.component";
import FormEditTitle from "./FormEditTitle.component";
import LectureTitle from "./LectureTitle.component";
import Resources from "./Resources.component";

type Func = () => void;

type LectureItemProps = {
  innerRef: (element: HTMLLIElement) => void;
  data: Lecture;
  handleFunc: {
    handleDisplayResources: Func;
    handleDisplayUploadMedia: Func;
    handleDisplayUploadResources: Func;
  };
  closeFunc: { closeUploadMedia: Func; closeUploadResources: Func };
  dataDisplay: {
    displayUploadMedia: boolean;
    displayResources: boolean;
    displayUploadResources: boolean;
  };
  editTitleFunc: (id: number, type: LectureType | SectionType) => void;
};

const LectureItem: FC<LectureItemProps> = (props) => {
  const {
    data: lectureItem,
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
  const { displayUploadMedia, displayResources, displayUploadResources } =
    dataDisplay;
  const { closeUploadMedia, closeUploadResources } = closeFunc;

  const { elementDisplay } = useTypedSelector((state) => state.curriculum);

  const { getLatestLecture, lecture, deleteLecture, deleted } =
    useLecture(lectureItem);
  const {
    id,
    title,
    resource,
    src,
    original_filename,
    updated_at,
    playtime_seconds,
  } = lecture;

  const { getLatestResources, resources } = useResources(id, resource);

  const isDisplayEditTitle =
    elementDisplay.id === id &&
    elementDisplay.type === CURRICULUM_TYPES.LECTURE;

  const lectureTitleProps = {
    data: lecture,
    handleDisplayResources,
    displayResources,
    editTitleFunc,
    deleteLecture,
  };

  return deleted ? null : (
    <li
      ref={innerRef}
      {...restProps}
      data-lecture={id}
      className="curriculum-content lecture-content"
    >
      {isDisplayEditTitle ? (
        <FormEditTitle title={title} type={CURRICULUM_TYPES.LECTURE} />
      ) : (
        <LectureTitle {...lectureTitleProps} />
      )}

      {displayResources && (
        <div className="content-tab content-resources">
          <div className="content-tab__asset content-tab__main">
            {src && (
              <StyledTableContaier>
                <table>
                  <thead>
                    <tr>
                      <th>Bài giảng</th>
                      {/* <th>Định dạng</th> */}
                      <th>Trạng thái</th>
                      <th>Ngày tải lên</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        {original_filename}
                        <br />
                        {secondsToHMS(playtime_seconds)}
                      </td>
                      {/* <td>Video</td> */}
                      <td>Thành công</td>
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
              </StyledTableContaier>
            )}

            <Resources
              resource={resources}
              lectureId={id}
              handleDisplayUploadResources={handleDisplayUploadResources}
            />
          </div>
        </div>
      )}

      {displayUploadMedia && (
        <div className="content-tab content-media">
          <div className="content-tab__header">
            <span>Thêm bài giảng</span>
            <button
              onClick={closeUploadMedia}
              type="button"
              className="content-tab-close d-flex align-items-center"
            >
              <GrFormClose />
            </button>
          </div>
          <div className="content-tab__media content-tab__main">
            <div className="content-tab__media-file">
              <span className="note">
                <b>Note: </b>
                Video phải đạt tối thiểu 720p và không vượt quá 2.0 GB.
              </span>

              <div className="lecture-editor">
                <FileUpload
                  getLatestData={getLatestLecture}
                  lectureId={id}
                  fileType="video"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {displayUploadResources && (
        <div className="content-tab content-upload-resource">
          <div className="content-tab__header">
            <span>Thêm tài liệu</span>
            <button
              onClick={closeUploadResources}
              type="button"
              className="content-tab-close d-flex align-items-center"
            >
              <GrFormClose />
            </button>
          </div>
          <div className="content-tab__resource content-tab__main">
            <div className="content-tab__resource-file">
              <span className="note">
                <b>Note: </b>
                Tài liệu được sử dụng để trợ giúp học viên trong bài giảng. kích
                thước tài liệu phải nhỏ hơn 1 GiB.
              </span>

              <div className="lecture-editor">
                <FileUpload
                  getLatestData={getLatestResources}
                  lectureId={id}
                  fileType="resource"
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
