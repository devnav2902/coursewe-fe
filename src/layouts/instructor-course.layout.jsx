import { DollarCircleOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import InstructorApi from "../api/instructor.api";
import { IoMdPricetags, IoIosArrowBack } from "react-icons/io";
import { BsInfoCircle } from "react-icons/bs";
import { FaLaptopHouse } from "react-icons/fa";
import { RiBookmark3Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import { routesWithParams } from "../utils/constants";

const InstructorCourseLayout = ({ children }) => {
  const [course, setCourse] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    InstructorApi.getCourseById(id).then((res) => {
      setCourse(res.data.course);
    });
  }, []);

  if (!course) return null;

  return (
    <div className="wrapper instructor-page">
      <nav className="nav">
        <div className="nav-content">
          <Link to="" className="d-flex align-items-center">
            <IoIosArrowBack />
            <span className="back">Trở về trang khóa học</span>
          </Link>
          <span title={course.title} className="course-title">
            {course.title}
          </span>
          <span className="header-status">
            {!course.isPublished ? "Draft" : "Published"}
          </span>

          <a
            target="_blank"
            href="{{ route('draft', ['id' => $course->id]) }}"
            className="preview"
          >
            Xem thử
          </a>

          {/* <button className="save">Save</button>  */}
        </div>
      </nav>
      <main className="main-instructor-page">
        <div className="sidebar">
          <div className="navbar">
            <strong>Tạo nội dung khóa học</strong>
            <Link
              className="navbar-link"
              to={routesWithParams.course_basics(id)}
            >
              <BsInfoCircle />
              <span>Thông tin khóa học</span>
            </Link>
            <Link
              className="navbar-link"
              to={routesWithParams.intended_learners(id)}
            >
              <RiBookmark3Line />
              <span>Mục tiêu & yêu cầu khóa học</span>
            </Link>
            <Link className="navbar-link" to={routesWithParams.curriculum(id)}>
              <FaLaptopHouse />
              <span>Chương trình học</span>
            </Link>
            <Link className="navbar-link" to="">
              <DollarCircleOutlined />
              <span>Giá khóa học</span>
            </Link>
            <Link className="navbar-link" to="">
              <IoMdPricetags />
              <span>Khuyến mại</span>
            </Link>
          </div>
          <div>
            <button type="submit" className="submit">
              Yêu cầu xem xét
            </button>
          </div>
        </div>
        <div className="main-content">
          {children({ course })}
          {/* {React.cloneElement(children, { course })} */}
        </div>
      </main>

      {/* @include('components.footer') */}
    </div>
  );
};
export default InstructorCourseLayout;
