import { DollarCircleOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import InstructorApi from "../api/instructor.api";
import { IoMdPricetags, IoIosArrowBack } from "react-icons/io";
import { BsInfoCircle } from "react-icons/bs";
import { FaLaptopHouse } from "react-icons/fa";
import { RiBookmark3Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import { ROUTES, routesWithParams } from "../utils/constants";
import Footer from "../components/Footer/Footer.component";
import { useForm } from "react-hook-form";
import CourseApi from "../api/course.api";

const InstructorCourseLayout = ({ children }) => {
  const [course, setCourse] = useState(null);
  const { id } = useParams();
  const { pathname } = useLocation();
  const [valueChanged, setValueChanged] = useState(false); // trigger button save
  const navigate = useNavigate();

  const {
    handleSubmit,
    formState: { errors },
    control,
    watch,
    setValue,
    getValues,
    register,
    reset: resetForm,
  } = useForm({
    defaultValues: {
      delete_course_outcome_order: null,
    },
  });

  useEffect(() => {
    InstructorApi.getCourseById(id).then((res) => {
      setCourse(res.data.course);
    });
  }, [id]);

  const handleValueChanged = (boolValue) => {
    setValueChanged(boolValue);
  };

  const resetState = () => {
    handleValueChanged(false);
  };

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      !valueChanged && handleValueChanged(true);
      console.log(value, name, type);
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [watch, valueChanged, handleValueChanged]);

  if (!course) return null;

  const arrRoutes = [
    routesWithParams.course_basics(id),
    routesWithParams.intended_learners(id),
  ];
  const isRouteWithButtonSave = arrRoutes.includes(pathname);

  const handleRedirect = (route) => {
    if (!valueChanged) navigate(route);
    else if (pathname !== route) {
      const isOk = window.confirm(
        "Thay đổi chưa được lưu, bạn có muốn hủy bỏ?"
      );

      if (isOk) {
        navigate(route);
        resetState();
        resetForm();
      }
    }
  };

  const onSubmit = (data) => {
    console.log(data);

    switch (pathname) {
      case routesWithParams.course_basics(id):
        CourseApi.updateInformation(id, data).then((res) => {
          resetState();
          console.log(res);
        });
        break;
      case routesWithParams.intended_learners(id):
        CourseApi.updateCourseOutcome(id, data).then((res) => {
          resetState();
          console.log(res);
        });
        break;

      default:
        break;
    }
  };

  return (
    <form className="wrapper instructor-page" onSubmit={handleSubmit(onSubmit)}>
      <nav className="nav">
        <div className="nav-content">
          <Link
            to={ROUTES.INSTRUCTOR_COURSES}
            className="d-flex align-items-center"
          >
            <IoIosArrowBack />
            <span className="back">Trở về trang khóa học</span>
          </Link>
          <span title={course.title} className="course-title">
            {course.title}
          </span>
          <span className="header-status">
            {!course.isPublished ? "Draft" : "Published"}
          </span>

          <a target="_blank" href="" className="preview">
            Xem thử
          </a>

          {isRouteWithButtonSave && (
            <button
              disabled={valueChanged ? false : true}
              type="submit"
              className="save"
            >
              Lưu thay đổi
            </button>
          )}
        </div>
      </nav>

      <main className="main-instructor-page">
        <div className="sidebar">
          <div className="navbar">
            <strong>Tạo nội dung khóa học</strong>

            <button
              type="button"
              className="navbar-link"
              onClick={() => handleRedirect(routesWithParams.course_basics(id))}
            >
              <BsInfoCircle />
              <span>Thông tin khóa học</span>
            </button>
            <button
              type="button"
              className="navbar-link"
              onClick={() =>
                handleRedirect(routesWithParams.intended_learners(id))
              }
            >
              <RiBookmark3Line />
              <span>Mục tiêu & yêu cầu khóa học</span>
            </button>
            <button
              type="button"
              className="navbar-link"
              onClick={() => handleRedirect(routesWithParams.curriculum(id))}
            >
              <FaLaptopHouse />
              <span>Chương trình học</span>
            </button>

            <Link className="navbar-link" to="/">
              <DollarCircleOutlined />
              <span>Giá khóa học</span>
            </Link>
            <Link className="navbar-link" to="/">
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
          {isRouteWithButtonSave
            ? children({
                course,
                handleValueChanged,
                valueChanged,
                resetState,
                control,
                watch,
                register,
                setValue,
                getValues,
              })
            : children({ course })}
        </div>
      </main>

      <Footer />
    </form>
  );
};
export default InstructorCourseLayout;
