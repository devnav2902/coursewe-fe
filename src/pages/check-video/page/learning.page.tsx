import {
  FacebookOutlined,
  LinkedinOutlined,
  TwitterOutlined,
  YoutubeOutlined,
} from "@ant-design/icons";
import { Skeleton } from "antd";
import { Link } from "react-router-dom";
import { useTypedSelector } from "../../../hooks/redux.hooks";
import { ROUTES } from "../../../utils/constants";
import { linkThumbnail } from "../../../utils/functions";
import Sidebar from "../components/Sidebar/Sidebar.component";
import VideoLearning from "../components/VideoLearning.component";

const CheckVideoPage = () => {
  const {
    dataCourse: { course, loadedCourse },
  } = useTypedSelector((state) => state.learning);

  // console.log(lastWatchedSecond);

  return (
    <main className="main-content-wrapper">
      <div className="open-course-content">
        <button>
          <i className="fas fa-arrow-left"></i>
          <span>Nội dung khóa học</span>
        </button>
      </div>
      <div className="learning-content">
        <div className="video-content">
          <div className="video-player">
            <VideoLearning
              thumbnail={""}
              url={
                "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
              }
            />
          </div>
        </div>
        <Sidebar />
      </div>

      <div className="content-footer">
        {!loadedCourse ? (
          <Skeleton active />
        ) : (
          <>
            <div className="bar">
              <ul>
                <li className="is-current">Tổng quan</li>
                {/* <li>Notes</li> */}
              </ul>
            </div>
            <div className="content-footer__data">
              <div className="container">
                <div className="container__content">
                  <div className="title">Giới thiệu khóa học</div>
                  <div className="row">
                    <p className="title">Thông tin khóa học</p>
                    <div className="course-description">
                      {course?.description && (
                        <div
                          dangerouslySetInnerHTML={{
                            __html: course.description,
                          }}
                        />
                      )}
                    </div>
                  </div>

                  <div className="row">
                    <p className="title">Giảng viên</p>
                    <div className="instructor-profile">
                      <div className="header">
                        <img
                          src={
                            course?.author &&
                            linkThumbnail(course.author.avatar)
                          }
                          alt={course?.author.fullname}
                        />
                        <div className="profile-title">
                          <Link
                            to={
                              !course?.author
                                ? ""
                                : ROUTES.instructor_bio(course.author.slug)
                            }
                          >
                            {course?.author.fullname}
                          </Link>
                          <div className="headline">
                            {course?.author?.headline}
                          </div>
                        </div>
                      </div>
                      <div className="profile-social-links">
                        {course?.author?.linkedin && (
                          <div className="socical-link">
                            <div className="my-link">
                              <a target="_blank" href={course.author.linkedin}>
                                <LinkedinOutlined />
                              </a>
                            </div>
                          </div>
                        )}
                        {course?.author?.twitter && (
                          <div className="socical-link">
                            <div className="my-link">
                              <a target="_blank" href={course.author.twitter}>
                                <TwitterOutlined />
                              </a>
                            </div>
                          </div>
                        )}
                        {course?.author?.facebook && (
                          <div className="socical-link">
                            <div className="my-link">
                              <a
                                target="_blank"
                                href={
                                  "http://www.facebook.com/" +
                                  course.author.facebook
                                }
                              >
                                <FacebookOutlined />
                              </a>
                            </div>
                          </div>
                        )}
                        {course?.author?.youtube && (
                          <div className="socical-link">
                            <div className="my-link">
                              <a target="_blank" href={course.author.youtube}>
                                <YoutubeOutlined />
                              </a>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="profile-description">
                        {course?.author?.bio && (
                          <div
                            dangerouslySetInnerHTML={{
                              __html: course.author.bio,
                            }}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </main>
  );
};
export default CheckVideoPage;
