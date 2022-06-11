import {
  FacebookOutlined,
  LinkedinOutlined,
  TwitterOutlined,
  YoutubeOutlined,
} from "@ant-design/icons";
import { Skeleton } from "antd";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { useTypedSelector } from "../../../hooks/redux.hooks";
import { ROUTES } from "../../../utils/constants";
import { linkThumbnail } from "../../../utils/functions";
import Sidebar from "../components/Sidebar/Sidebar.component";
import VideoLearning from "../components/VideoLearning.component";
import { CheckVideoContext } from "../hooks/leaning.hooks";

const CheckVideoPage = () => {
  const { course_id, dataCourse } = useContext(CheckVideoContext);
  // console.log(lastWatchedSecond);
  const { data, loaded } = dataCourse;
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
        {!loaded ? (
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
                      {data?.description && (
                        <div
                          dangerouslySetInnerHTML={{
                            __html: data?.description,
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
                            data?.author && linkThumbnail(data?.author.avatar)
                          }
                          alt={data?.author.fullname}
                        />
                        <div className="profile-title">
                          <Link
                            to={
                              !data?.author
                                ? ""
                                : ROUTES.instructor_bio(data?.author.slug)
                            }
                          >
                            {data?.author.fullname}
                          </Link>
                          <div className="headline">
                            {data?.author.headline}
                          </div>
                        </div>
                      </div>
                      <div className="profile-social-links">
                        {data?.author.linkedin && (
                          <div className="socical-link">
                            <div className="my-link">
                              <a target="_blank" href={data?.author.linkedin}>
                                <LinkedinOutlined />
                              </a>
                            </div>
                          </div>
                        )}
                        {data?.author.twitter && (
                          <div className="socical-link">
                            <div className="my-link">
                              <a target="_blank" href={data?.author.twitter}>
                                <TwitterOutlined />
                              </a>
                            </div>
                          </div>
                        )}
                        {data?.author.facebook && (
                          <div className="socical-link">
                            <div className="my-link">
                              <a
                                target="_blank"
                                href={
                                  "http://www.facebook.com/" +
                                  data?.author.facebook
                                }
                              >
                                <FacebookOutlined />
                              </a>
                            </div>
                          </div>
                        )}
                        {data?.author.youtube && (
                          <div className="socical-link">
                            <div className="my-link">
                              <a target="_blank" href={data?.author.youtube}>
                                <YoutubeOutlined />
                              </a>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="profile-description">
                        {data?.author.bio && (
                          <div
                            dangerouslySetInnerHTML={{
                              __html: data?.author.bio,
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
