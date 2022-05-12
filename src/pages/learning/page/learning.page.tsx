import {
  FacebookOutlined,
  LinkedinOutlined,
  TwitterOutlined,
  YoutubeOutlined,
} from "@ant-design/icons";
import { Skeleton } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import LearningApi from "../../../api/learning.api";
import ProgressLogsApi from "../../../api/progress-logs.api";
import Loading from "../../../components/Loading/Loading.component";
import { useTypedSelector } from "../../../hooks/redux.hooks";
import { routesWithParams } from "../../../utils/constants";
import { linkThumbnail } from "../../../utils/functions";
import Sidebar from "../components/Sidebar/Sidebar.component";
import VideoLearning from "../components/VideoLearning.component";

const LearningPage = () => {
  const {
    dataCourse: { course, loadedCourse },
  } = useTypedSelector((state) => state.learning);
  const [video, setVideo] = useState(null);
  const [lastWatchedSecond, setLastWatchedSecond] = useState(0);
  const [saveLastWatchedSecond, setSaveLastWatchedSecond] = useState(false);
  const navigate = useNavigate();
  const { lectureId, course_slug } = useParams() as {
    lectureId: string;
    course_slug: string;
  };
  const [searchParams] = useSearchParams();

  const last_watched_second = searchParams.get("start");

  useEffect(() => {
    async function getVideo() {
      try {
        const {
          data: {
            lecture: { src },
          },
        } = await LearningApi.getVideo(course_slug, parseInt(lectureId));
        setVideo(src);
      } catch (error) {
        // axios.isAxiosError(error);
        // if (error.response.status !== 200) return navigate(ROUTES.NOT_FOUND);
      }
    }

    getVideo();
    // return () => {
    //   window.removeEventListener("scroll", handleScroll);
    // };
  }, [course_slug, lectureId]);

  useEffect(() => {
    if (last_watched_second) return setSaveLastWatchedSecond(true);

    course?.id &&
      ProgressLogsApi.getDataLastWatchedByLectureId(course.id, lectureId).then(
        ({ data: { dataLastWatched } }) => {
          setLastWatchedSecond(dataLastWatched?.last_watched_second || 0);
          setSaveLastWatchedSecond(true);
        }
      );

    setSaveLastWatchedSecond(false);
  }, [lectureId, last_watched_second, course?.id]);
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
            {saveLastWatchedSecond ? (
              <VideoLearning
                last_watched_second={
                  last_watched_second
                    ? parseInt(last_watched_second)
                    : lastWatchedSecond
                }
                thumbnail={""}
                url={
                  "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                }
              />
            ) : (
              <Loading />
            )}
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
                                : routesWithParams.instructor_bio(
                                    course.author.slug
                                  )
                            }
                          >
                            {course?.author.fullname}
                          </Link>
                          <div className="headline">
                            {course?.author.bio?.headline}
                          </div>
                        </div>
                      </div>
                      <div className="profile-social-links">
                        {course?.author?.bio?.linkedin && (
                          <div className="socical-link">
                            <div className="my-link">
                              <Link to={course?.author?.bio?.linkedin}>
                                <LinkedinOutlined />
                              </Link>
                            </div>
                          </div>
                        )}
                        {course?.author?.bio?.twitter && (
                          <div className="socical-link">
                            <div className="my-link">
                              <a href="{{ $author->bio->twitter }}">
                                <TwitterOutlined />
                              </a>
                            </div>
                          </div>
                        )}
                        {course?.author?.bio?.facebook && (
                          <div className="socical-link">
                            <div className="my-link">
                              <a href="{{ $author->bio->facebook }}">
                                <FacebookOutlined />
                              </a>
                            </div>
                          </div>
                        )}
                        {course?.author?.bio?.youtube && (
                          <div className="socical-link">
                            <div className="my-link">
                              <a href="{{ $author->bio->youtube }}">
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
                              __html: course.author.bio.bio,
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
export default LearningPage;
