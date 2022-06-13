import { Dropdown } from "antd";
import { FC, useContext } from "react";
import { AiOutlineFileText } from "react-icons/ai";
import { BsPlayCircle } from "react-icons/bs";
import { ImFolderDownload } from "react-icons/im";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { Link } from "react-router-dom";
import ResourceApi from "../../../../api/resource.api";
import { Lecture } from "../../../../ts/types/course.types";
import { ROUTES } from "../../../../utils/constants";
import { CheckVideoContext } from "../../hooks/leaning.hooks";

type LectureProps = {
  lecture: Lecture;
};

const LectureItem: FC<LectureProps> = ({ lecture }) => {
  const {
    dataCourse: { data },
    course_id,
    lectureId,
  } = useContext(CheckVideoContext);

  function downloadFile(
    lectureId: number,
    ResourceId: number,
    filename: string
  ) {
    ResourceApi.download(lectureId, course_id, ResourceId).then((res) => {
      const blobFile = res.data;
      const fileUrl = URL.createObjectURL(blobFile);

      const link = document.createElement("a");

      link.href = fileUrl;
      link.setAttribute("download", filename);

      link.click();
    });
  }

  return (
    <li
      className={`curriculum-item d-flex${
        lectureId
          ? lecture.id === parseInt(lectureId)
            ? " is-current"
            : ""
          : ""
      }`}
    >
      <Link
        to={
          ROUTES.check_video({
            course_id: course_id,
          }) +
          "?bai-giang=" +
          lecture.id
        }
      >
        <div className="link">
          <div className="text">
            {lecture.order}.&nbsp;{lecture.title}
          </div>
          <div className="bottom d-flex align-items-center">
            <div className="duration d-flex align-items-center">
              <BsPlayCircle style={{ marginRight: 5 }} />
              <span className="times">{lecture.playtime_string}</span>
            </div>

            {lecture.resource.length > 0 && (
              <div className="resource-list">
                <Dropdown
                  placement="bottomRight"
                  getPopupContainer={(e) => e}
                  overlay={
                    <ul className="list">
                      {lecture.resource.map((resource, i) => {
                        const { lecture_id: lectureId, id: resourceid } =
                          resource;

                        return (
                          <li
                            onClick={() =>
                              downloadFile(
                                lectureId,
                                resourceid,
                                resource.original_filename
                              )
                            }
                            key={i}
                            className="cursor-pointer d-flex download-btn align-items-center"
                          >
                            <ImFolderDownload style={{ flexShrink: 0 }} />
                            <div className="ml-1 filename">
                              {resource.original_filename}
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  }
                  trigger={["click"]}
                >
                  <button className="dropdown d-flex align-items-center">
                    <AiOutlineFileText style={{ marginRight: 4 }} />
                    Tài liệu
                    <MdOutlineKeyboardArrowDown
                      fontSize={18}
                      className="ml-1"
                    />
                  </button>
                </Dropdown>
              </div>
            )}
          </div>
        </div>
      </Link>
    </li>
  );
};

export default LectureItem;
