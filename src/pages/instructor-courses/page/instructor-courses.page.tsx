import { Pagination, Row } from "antd";
import { FC, useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { FiClock } from "react-icons/fi";
import { Link } from "react-router-dom";
import CourseApi, {
  CoursesOfInstructorResponse,
} from "../../../api/course.api";
import Loading from "../../../components/Loading/Loading.component";
import { ROUTES } from "../../../utils/constants";
import { linkThumbnail } from "../../../utils/functions";
import { StyledWrapper } from "../styles/instructor-courses.styles";

const InstructorCoursesPage: FC = () => {
  const [coursesData, setCoursesData] = useState<{
    courses: null | CoursesOfInstructorResponse["coursesData"];
    loaded: boolean;
  }>({
    courses: null,
    loaded: false,
  });

  useEffect(() => {
    CourseApi.getCoursesByCurrentUser().then(({ data }) => {
      setCoursesData((state) => ({
        ...state,
        loaded: true,
        courses: data.coursesData,
      }));
    });
  }, []);

  function onChangePage(page: number) {
    setCoursesData((state) => ({
      ...state,
      loaded: false,
    }));

    CourseApi.getCoursesByCurrentUser(page).then(({ data }) => {
      setCoursesData((state) => ({
        ...state,
        loaded: true,
        courses: data.coursesData,
      }));
    });
  }

  return (
    <StyledWrapper>
      {!coursesData.loaded ? (
        <Loading />
      ) : (coursesData.courses?.total as number) < 1 ? (
        <div className="empty">
          <div className="empty__header">
            <span>Bạn chưa tạo khóa học nào!</span>

            <Link className="btn-color-default btn" to={ROUTES.CREATE_COURSE}>
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
              <div className="icon d-flex align-items-center justify-content-center cursor-pointer">
                <BiSearch />
              </div>
            </div>

            <select name="" id="">
              <option value="">Mới nhất</option>
              <option value="">A-Z</option>
            </select>

            <Link
              to={ROUTES.CREATE_COURSE}
              className="h-100 btn btn-color-default ml-auto"
            >
              Tạo khóa học mới
            </Link>
          </div>

          <ul>
            {coursesData.courses?.data.map((course) => {
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
                    <time>{course.updated_at}</time>
                    <div className="status">
                      {course.isPublished ? (
                        <div>
                          <strong className="mr-1">Công khai</strong>
                          <span>Bản nháp</span>
                        </div>
                      ) : (
                        <div>
                          <span className="mr-1">Công khai</span>
                          <strong>Bản nháp</strong>
                        </div>
                      )}
                    </div>
                    {!course.submit_for_review && (
                      <Link
                        className="view"
                        to={ROUTES.course_basics(course.id)}
                      >
                        Quản lý khóa học
                      </Link>
                    )}
                  </div>
                  {!!course.submit_for_review && (
                    <div className="in-review">
                      <div className="in-review__content">
                        <div className="in-review-top d-flex align-items-center">
                          <FiClock />
                          <span className="ml-1">Đang được xem xét</span>
                        </div>
                        <span>Ngày yêu cầu xét duyệt: {course.updated_at}</span>
                      </div>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>

          <Row justify="end">
            <Pagination
              onChange={onChangePage}
              pageSize={coursesData.courses?.per_page}
              defaultCurrent={1}
              current={coursesData.courses?.current_page}
              total={coursesData.courses?.total}
            />
          </Row>
        </div>
      )}
    </StyledWrapper>
  );
};
export default InstructorCoursesPage;
