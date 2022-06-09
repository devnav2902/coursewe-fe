import { Dropdown } from "antd";
import { ChangeEvent, FC, useContext, useState } from "react";
import { AiOutlineFileText } from "react-icons/ai";
import { BsPlayCircle } from "react-icons/bs";
import { ImFolderDownload } from "react-icons/im";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import ProgressApi from "../../../../api/progress.api";
import ResourceApi from "../../../../api/resource.api";
import {
  useAppDispatch,
  useTypedSelector,
} from "../../../../hooks/redux.hooks";
import { getSections } from "../../../../redux/slices/curriculum.slice";
import { getProgress } from "../../../../redux/slices/learning.slice";
import { Course, Lecture } from "../../../../ts/types/course.types";
import { ROUTES } from "../../../../utils/constants";
import { CheckVideoContext } from "../../hooks/leaning.hooks";

type LectureProps = {
  lecture: Lecture;
};

const LectureItem: FC<LectureProps> = ({ lecture }) => {
  const dispatch = useAppDispatch();

  const [videoSaving, setVideoSaving] = useState(false);

  const [checked, setChecked] = useState({
    value: lecture?.progress?.progress ? true : false,
    loading: false,
  });

  const navigate = useNavigate();

  const {
    dataCourse: { data },
    course_id,
  } = useContext(CheckVideoContext);

  // function downloadFile(
  //   lectureId: number,
  //   ResourceId: number,
  //   filename: string
  // ) {
  //   const {
  //     course: { id: courseId },
  //   } = dataCourse as { course: Course };
  //   ResourceApi.download(lectureId, courseId, ResourceId).then((res) => {
  //     const blobFile = res.data;
  //     const fileUrl = URL.createObjectURL(blobFile);

  //     const link = document.createElement("a");

  //     link.href = fileUrl;
  //     link.setAttribute("download", filename);

  //     link.click();
  //   });
  // }
  console.log(lecture.id);

  return (
    <li className="curriculum-item {{ $key == 0 && $lecture->order == 1 ? 'is-current' : '' }} d-flex">
      <div className="progress-toggle">
        {/* <label htmlFor={`lecture-${lecture.id}`}>
          <input
            checked={checked.value}
            type="checkbox"
            id={`lecture-${lecture.id}`}
            onChange={handleChecked}
            disabled={checked.loading ? true : false}
          />
          <span></span>
        </label> */}
      </div>
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
                            // onClick={() =>
                            //   downloadFile(
                            //     lectureId,
                            //     resourceid,
                            //     resource.original_filename
                            //   )
                            // }
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
