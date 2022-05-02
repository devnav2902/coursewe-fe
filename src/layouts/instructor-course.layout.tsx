import { DollarCircleOutlined } from "@ant-design/icons";
import { FC, useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { BsFileRichtext, BsInfoCircle } from "react-icons/bs";
import { FaLaptopHouse } from "react-icons/fa";
import { IoIosArrowBack, IoMdPricetags } from "react-icons/io";
import { RiBookmark3Line } from "react-icons/ri";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import CourseApi from "../api/course.api";
import InstructorApi from "../api/instructor.api";
import Footer from "../components/Footer/Footer.component";
import { HookForm } from "../pages/edit-course/utils/instructor-course.types";
import { Course, IntendedItems, SectionItems } from "../ts/types/course.types";
import { ROUTES, routesWithParams } from "../utils/constants";
import { openNotification } from "../utils/functions";

export type ICourse = {
  course_outcome: IntendedItems;
  course_requirements: IntendedItems;
  isPublished: boolean;
  section: SectionItems;
  description: string;
  video_demo: string;
  instructional_level_id: number;
  subtitle: string;
} & Course;

export type ChildrenProps = {
  course: ICourse;
  valueChanged?: boolean;
  handleValueChanged?: (boolValue: boolean) => void;
} & HookForm;

type Children = (props: ChildrenProps) => JSX.Element;
interface LayoutProps {
  children: Children;
}

const InstructorCourseLayout: FC<LayoutProps> = ({ children }) => {
  const [course, setCourse] = useState<ICourse | null>(null);
  const { id } = useParams() as { id: string };
  const { pathname } = useLocation();
  const [valueChanged, setValueChanged] = useState<boolean>(false); // trigger button save
  const navigate = useNavigate();

  const {
    formState: { errors },
    control,
    watch,
    setValue,
    getValues,
    register,
    setError,
    clearErrors,
  } = useForm();

  useEffect(() => {
    InstructorApi.getCourseById(id).then((res) => {
      setCourse(res.data.course);
    });
  }, [id]);

  const handleValueChanged = useCallback((boolValue) => {
    setValueChanged(boolValue);
  }, []);

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

  console.log("re-render layout");

  if (!course) return null;

  const arrRoutes = [
    routesWithParams.course_basics(id),
    routesWithParams.intended_learners(id),
  ];
  const isRouteWithButtonSave = arrRoutes.includes(pathname);

  const arrRoutesHasPreviewBtn = [
    routesWithParams.course_basics(id),
    routesWithParams.curriculum(id),
  ];
  const isRouteWithButtonPreview = arrRoutesHasPreviewBtn.includes(pathname);

  const handleRedirect = (route: string) => {
    if (!valueChanged) navigate(route);
    else if (pathname !== route) {
      const isOk = window.confirm(
        "Thay đổi chưa được lưu, bạn có muốn hủy bỏ?"
      );

      if (isOk) {
        navigate(route);
      }
    }
  };

  function apiIntendedLearners(data: any) {
    const arrRequest = [];

    if (!!data?.outcome_items?.length) {
      const promise = new Promise(function (resolve, reject) {
        CourseApi.updateCourseOutcome(id, data)
          .then((res) => resolve(res))
          .catch((error) => reject(error));
      });
      arrRequest.push(promise);
    }

    if (!!data?.delete_course_outcome_order?.length) {
      const promise = new Promise(function (resolve, reject) {
        CourseApi.deleteCourseOutcome(id, data)
          .then((res) => resolve(res))
          .catch((error) => reject(error));
      });
      arrRequest.push(promise);
    }

    if (!!data?.requirement_items?.length) {
      const promise = new Promise(function (resolve, reject) {
        CourseApi.updateCourseRequirements(id, data)
          .then((res) => resolve(res))
          .catch((error) => reject(error));
      });
      arrRequest.push(promise);
    }

    if (!!data?.delete_course_requirements_order?.length) {
      const promise = new Promise(function (resolve, reject) {
        CourseApi.deleteCourseRequirements(id, data)
          .then((res) => resolve(res))
          .catch((error) => reject(error));
      });
      arrRequest.push(promise);
    }

    return Promise.all(arrRequest)
      .then((res) => {
        let sum = 0;
        let promiseErrorArr = [];

        res.forEach((result: any) => {
          if (result.status === 200) {
            sum += 1;
          } else {
            promiseErrorArr.push(result);
          }
        });

        return sum === arrRequest.length ? true : false;
      })
      .catch((error) => error);
  }

  const onSubmit = () => {
    const data = getValues();

    switch (pathname) {
      case routesWithParams.course_basics(id):
        CourseApi.updateInformation(id, data).then((res) => {
          resetState();
          openNotification("success");
        });
        break;

      case routesWithParams.intended_learners(id):
        if (errors.not_enough_outcome_items) {
          openNotification("error", errors.not_enough_outcome_items.message);
        } else {
          apiIntendedLearners(data).then((success) => {
            if (success) {
              openNotification("success");
              resetState();
            }
          });
        }
        break;

      default:
        return;
    }
  };

  return (
    <form className="wrapper instructor-page">
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

          {isRouteWithButtonPreview && (
            <a target="_blank" href="" className="preview">
              Xem thử
            </a>
          )}

          {isRouteWithButtonSave && (
            <button
              onClick={onSubmit}
              disabled={valueChanged ? false : true}
              className="save"
              type="button"
            >
              Lưu thay đổi
            </button>
          )}
        </div>
      </nav>

      <main className="main-instructor-page spacing-top-nav">
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
                handleRedirect(routesWithParams.image_and_preview_video(id))
              }
            >
              <BsFileRichtext />
              <span>Hình ảnh & video giới thiệu</span>
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

            <Link className="navbar-link" to={routesWithParams.price(id)}>
              <DollarCircleOutlined />
              <span>Giá khóa học</span>
            </Link>
            <button
              type="button"
              className="navbar-link"
              onClick={() => handleRedirect(routesWithParams.promotions(id))}
            >
              <IoMdPricetags />
              <span>Khuyến mại</span>
            </button>
          </div>
          <div>
            <button type="submit" className="submit">
              Yêu cầu xem xét
            </button>
          </div>
        </div>
        <div className="main-content">
          {children({
            course,
            handleValueChanged,
            valueChanged,
            resetState,
            control,
            watch,
            register,
            setValue,
            setError,
            getValues,
            errors,
            clearErrors,
          })}
        </div>
      </main>

      <Footer />
    </form>
  );
};
export default InstructorCourseLayout;
