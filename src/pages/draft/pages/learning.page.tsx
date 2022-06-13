import {
  FacebookOutlined,
  LinkedinOutlined,
  TwitterOutlined,
  YoutubeOutlined,
} from "@ant-design/icons";
import { Alert, Col, Row, Skeleton } from "antd";
import { FC, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CustomCourse } from "../../../api/course.api";
import Footer from "../../../components/Footer/Footer.component";
import { useTypedSelector } from "../../../hooks/redux.hooks";
import { StyledHeader } from "../../../layouts/learning.layout";
import { ROUTES } from "../../../utils/constants";
import { linkThumbnail } from "../../../utils/functions";
import Sidebar from "../components/learning/Sidebar.component";
import VideoLearning from "../components/learning/VideoLearning.component";
import { CheckVideoContext } from "../hooks/leaning.hooks";

const Header: FC = () => {
  const {
    dataCourse: { data: course },
  } = useContext(CheckVideoContext);

  const { profile: user } = useTypedSelector((state) => state.user);

  const navigate = useNavigate();

  return (
    <StyledHeader>
      <div className="header-container d-flex align-items-center">
        <div className="logo">
          <Link to="/">Coursewe</Link>
        </div>
        <div className="vertical-divider"></div>

        <h1 className="course-title">
          <Link to={!course?.slug ? "" : ROUTES.detail_course(course.slug)}>
            {course?.title}
          </Link>
        </h1>

        <button
          onClick={() => {
            if (user?.role.name === "admin")
              return navigate(ROUTES.ADMIN_REVIEW);

            navigate(ROUTES.curriculum(course?.id));
          }}
          style={{ height: 34 }}
          className="btn ml-auto"
        >
          Trở về
        </button>
      </div>
    </StyledHeader>
  );
};

const CheckVideoPage = () => {
  const {
    dataCourse: { data, loaded },
  } = useContext(CheckVideoContext);

  return (
    <>
      <Header />
      <main className="main-content-wrapper">
        <Row>
          <Col span={24}>
            <Alert
              message={
                <>
                  <h6>Khóa học này đang trong chế độ xét duyệt.</h6>
                  <span className="contact">
                    Để biết thêm thông tin, vui lòng liên hệ&nbsp;
                    <Link to={ROUTES.instructor_bio(data?.author?.slug)}>
                      {data?.author?.fullname}
                    </Link>
                  </span>
                </>
              }
              type="warning"
              showIcon
            />
          </Col>
        </Row>
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
                              to={ROUTES.instructor_bio(
                                (data as CustomCourse).author.slug
                              )}
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
                                <a
                                  style={{ color: "#fff" }}
                                  target="_blank"
                                  href={data?.author.linkedin}
                                >
                                  <LinkedinOutlined />
                                </a>
                              </div>
                            </div>
                          )}
                          {data?.author.twitter && (
                            <div className="socical-link">
                              <div className="my-link">
                                <a
                                  style={{ color: "#fff" }}
                                  target="_blank"
                                  href={data?.author.twitter}
                                >
                                  <TwitterOutlined />
                                </a>
                              </div>
                            </div>
                          )}
                          {data?.author.facebook && (
                            <div className="socical-link">
                              <div className="my-link">
                                <a
                                  style={{ color: "#fff" }}
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
                                <a
                                  style={{ color: "#fff" }}
                                  target="_blank"
                                  href={data?.author.youtube}
                                >
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
      <Footer />
    </>
  );
};
export default CheckVideoPage;
