import { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CourseApi, { CoursesOfInstructor } from "../../../api/course.api";
import Loading from "../../../components/Loading/Loading.component";
import { ROUTES } from "../../../utils/constants";
import { linkThumbnail } from "../../../utils/functions";

const InstructorCoursesPage: FC = () => {
  const [coursesData, setCoursesData] = useState<{
    courses: CoursesOfInstructor;
    loaded: boolean;
  }>({
    courses: [],
    loaded: false,
  });

  useEffect(() => {
    CourseApi.getCoursesByCurrentUser().then((res) => {
      const { data } = res;

      setCoursesData((state) => ({
        ...state,
        loaded: true,
        courses: data.coursesData.data,
      }));
    });
  }, []);

  return (
    <div className="my-course-section">
      {
        !coursesData.loaded ? (
          <Loading />
        ) : !coursesData.courses.length ? (
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
            <h2>Khóa học của bạn</h2>

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
              {coursesData.courses.map((course) => {
                return (
                  <li key={course.id}>
                    <div className="img-courses">
                      <img
                        style={{ objectFit: "cover" }}
                        alt={course.title}
                        src={
                          course.thumbnail
                            ? linkThumbnail(course.thumbnail)
                            : "https://s.udemycdn.com/course/200_H/placeholder.jpg"
                        }
                      />
                    </div>
                    <div
                      className={
                        !course.submit_for_review ? "info info-hover" : "info"
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
                          to={ROUTES.course_basics(course.id)}
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

        // paginate
      }
    </div>
  );
};
export default InstructorCoursesPage;
