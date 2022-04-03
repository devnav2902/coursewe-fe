import React, { useEffect, useState } from "react";
import {
  FundProjectionScreenOutlined,
  EyeOutlined,
  BarChartOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import CourseApi from "../../../api/course.api";
import { ROUTES, routesWithParams } from "../../../utils/constants";
import SideBarOverview from "../../../components/SideBarOverview/SideBarOverview.component";

const InstructorCoursesPage = () => {
  const {
    profile: {
      role: { name },
    },
  } = useSelector((state) => state.user);

  const [userCourse, setUserCourse] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    CourseApi.getCourseByCurrentUser().then((res) => {
      const { data } = res;

      setUserCourse(data.courses);
      setLoaded(true);
    });
  }, []);

  if (!loaded) return null;

  return (
    <div className="body-overview">
      <div className="wrapper instructor-page">
        <main className="main-overview-page">
          <SideBarOverview />
          <div className="main-content main-overview-content">
            <div className="my-course-section">
              {
                !userCourse.length ? (
                  <div className="empty">
                    <div className="empty__header">
                      <span>Bạn chưa tạo khóa học nào!</span>

                      <Link
                        className="add-new-course btn-style-two"
                        to={ROUTES.CREATE_COURSE}
                      >
                        Tạo khóa học mới
                      </Link>
                    </div>

                    <div className="img">
                      <img
                        src="https://cdn.dribbble.com/users/2217210/screenshots/12013698/media/c5149aa66b86b923cbf219707265bf16.jpg"
                        alt=""
                      />
                    </div>
                  </div>
                ) : (
                  <div className="menu-courses">
                    <h2>Courses</h2>

                    <div className="menu-courses-wrapper">
                      <div className="search">
                        <input type="text" placeholder="Tìm khóa học" />
                        <i className="fas fa-search"></i>
                      </div>

                      <select name="" id="">
                        <option value="">Newest</option>
                        <option value="">A-Z</option>
                      </select>

                      <Link
                        to={ROUTES.CREATE_COURSE}
                        className="menu-courses-wrapper__create-course btn-style-two"
                      >
                        Tạo khóa học mới
                      </Link>
                    </div>

                    <ul>
                      {userCourse.map((course) => {
                        return (
                          <li key={course.id}>
                            <div className="img-courses">
                              <img
                                alt=""
                                src="https://s.udemycdn.com/course/200_H/placeholder.jpg"
                              />
                            </div>
                            <div
                              className={
                                !course.submit_for_review
                                  ? "info info-hover"
                                  : "info"
                              }
                            >
                              <h5>{course.title}</h5>
                              <time>{course.updated_at} </time>
                              <div className="status">
                                {course.isPublished ? (
                                  <div>
                                    <strong>Public</strong>
                                    <span>Draft</span>
                                  </div>
                                ) : (
                                  <div>
                                    <strong>Draft</strong>
                                    <span>Public</span>
                                  </div>
                                )}
                              </div>
                              {!course.submit_for_review ? (
                                <Link
                                  className="view"
                                  to={routesWithParams.course_basics(course.id)}
                                >
                                  Edit / Manage course
                                </Link>
                              ) : undefined}
                            </div>
                            {course.submit_for_review ? (
                              <div className="in-review">
                                <div className="in-review-top">
                                  <i className="far fa-clock"></i>
                                  <span>Đang được xem xét</span>
                                </div>
                                <span>Submitted On {course.updated_at}</span>
                              </div>
                            ) : undefined}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )

                /* <div className="page-container">{{ //$courses->onEachSide(1)->links() }}</div> */
              }
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
export default InstructorCoursesPage;
