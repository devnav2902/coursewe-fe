import { FC, useContext } from "react";
import { FaFileAlt } from "react-icons/fa";
import { GrFormClose } from "react-icons/gr";
import { ImFileVideo } from "react-icons/im";
import { Lecture } from "../../../../ts/types/course.types";
import { secondsToHMS } from "../../../../utils/functions";
import { LectureContext } from "../../hooks/curriculum.hooks";
import { StyledTableContaier } from "../../styles/curriculum.styles";
import { CURRICULUM_TYPES } from "../../utils/constants";
import FileUpload from "./FileUpload.component";
import FormEditTitle from "./FormEditTitle.component";
import LectureTitle from "./LectureTitle.component";
import Resources from "./Resources.component";
import VideoUploadNote from "./VideoUploadNote.component";

type LectureItemProps = {
  innerRef: (element: HTMLLIElement) => void;
};

const LectureItem: FC<LectureItemProps> = (props) => {
  const { innerRef, ...restProps } = props;

  const {
    isDisplayEditTitle,
    lectureData: {
      lecture,
      handle: { setUpdatedTitle },
      updatedTitle,
    },
    contentTab: { displayContentTab, closeContentTab },
    displayResourceData: { displayResources },
    uploadMedia: {
      displayUploadMedia,
      handleDisplayUploadMedia,
      closeUploadMedia,
    },
    uploadResources: {
      closeUploadResources,
      handleDisplayUploadResources,
      displayUploadResources,
    },
    lectureUploading: { lectureUploading },
  } = useContext(LectureContext);

  const { id, src, original_filename, updated_at, playtime_seconds } =
    lecture as Lecture;

  return (
    <li
      ref={innerRef}
      {...restProps}
      className="curriculum-content lecture-content"
    >
      {isDisplayEditTitle ? (
        <FormEditTitle
          setUpdatedTitle={setUpdatedTitle}
          title={updatedTitle}
          type={CURRICULUM_TYPES.LECTURE}
        />
      ) : (
        <LectureTitle />
      )}

      {displayContentTab && (
        <div className="content-tab">
          <div className="content-tab__header">
            <span>N???i dung t???i l??n</span>
            <button
              type="button"
              onClick={closeContentTab}
              className="content-tab-close d-flex align-items-center"
            >
              <GrFormClose />
            </button>
          </div>
          <div className="content-tab__nav content-tab__main">
            <p className="content-tab__nav-header">
              Ch???n n???i dung b???n mu???n t???i l??n.
            </p>
            <ul className="content-tab__nav-container">
              <li
                onClick={handleDisplayUploadMedia}
                className="content-type-selector"
              >
                <div className="content-type-option">
                  <div className="icon">
                    <ImFileVideo />
                    <ImFileVideo className="hover" />
                  </div>

                  <span className="content-type__label">B??i gi???ng</span>
                </div>
              </li>
              <li
                onClick={handleDisplayUploadResources}
                className="content-type-selector"
              >
                <div className="content-type-option">
                  <div className="icon">
                    <FaFileAlt />
                    <FaFileAlt className="hover" />
                  </div>

                  <span className="content-type__label">T??i li???u</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      )}

      {displayResources && (
        <div className="content-tab content-resources">
          <div className="content-tab__asset content-tab__main">
            {src && (
              <StyledTableContaier>
                <table>
                  <thead>
                    <tr>
                      <th>B??i gi???ng</th>
                      {/* <th>?????nh d???ng</th> */}
                      <th>Tr???ng th??i</th>
                      <th>Ng??y t???i l??n</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        {original_filename}
                        <br />
                        Th???i l?????ng: {secondsToHMS(playtime_seconds)}
                      </td>
                      {/* <td>Video</td> */}
                      <td>Th??nh c??ng</td>
                      <td>{updated_at}</td>
                      <td>
                        <button
                          onClick={handleDisplayUploadMedia}
                          className="replace-btn"
                          type="button"
                        >
                          Thay th??? video
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>

                <VideoUploadNote />
              </StyledTableContaier>
            )}

            <Resources />
          </div>
        </div>
      )}

      {displayUploadMedia && (
        <div className="content-tab content-media">
          <div className="content-tab__header">
            <span>Th??m b??i gi???ng</span>
            <button
              onClick={closeUploadMedia}
              type="button"
              disabled={lectureUploading ? true : false}
              className="content-tab-close d-flex align-items-center"
            >
              <GrFormClose />
            </button>
          </div>
          <div className="content-tab__media content-tab__main">
            <div className="content-tab__media-file">
              <VideoUploadNote />

              <div className="lecture-editor">
                <FileUpload lectureId={id} fileType="video" />
              </div>
            </div>
          </div>
        </div>
      )}

      {displayUploadResources && (
        <div className="content-tab content-upload-resource">
          <div className="content-tab__header">
            <span>Th??m t??i li???u</span>
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
                T??i li???u ???????c s??? d???ng ????? tr??? gi??p h???c vi??n trong b??i gi???ng. k??ch
                th?????c t??i li???u ph???i nh??? h??n 1 GiB.
              </span>

              <div className="lecture-editor">
                <FileUpload lectureId={id} fileType="resource" />
              </div>
            </div>
          </div>
        </div>
      )}
    </li>
  );
};

export default LectureItem;
