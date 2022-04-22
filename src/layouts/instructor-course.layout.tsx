import { DollarCircleOutlined } from "@ant-design/icons";
import { FC, useCallback, useEffect, useState } from "react";
import {
  Control,
  FieldValues,
  useForm,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { BsFileRichtext, BsInfoCircle } from "react-icons/bs";
import { FaLaptopHouse } from "react-icons/fa";
import { IoIosArrowBack, IoMdPricetags } from "react-icons/io";
import { RiBookmark3Line } from "react-icons/ri";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import CourseApi from "../api/course.api";
import InstructorApi from "../api/instructor.api";
import Footer from "../components/Footer/Footer.component";
import { IntendedItems } from "../pages/edit-course/utils/method";
import { ROUTES, routesWithParams } from "../utils/constants";
import { openNotification } from "../utils/functions";

export type ICourse = {
  id: string;
  course_outcome: IntendedItems;
  course_requirements: IntendedItems;
  title: string;
  isPublished: boolean;
};

export type ChildrenProps = {
  course: ICourse;
  valueChanged?: boolean;
  handleValueChanged?: (boolValue: boolean) => void;
  resetState: () => void;
  control?: Control<FieldValues, any>;
  register?: UseFormRegister<FieldValues>;
  watch?: UseFormWatch<FieldValues>;
  getValues: UseFormGetValues<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
};

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
    handleSubmit,
    // formState: { errors },
    control,
    watch,
    setValue,
    getValues,
    register,
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
    switch (true) {
      case !!data?.course_outcome?.length:
        CourseApi.updateCourseOutcome(id, data).then((res) => {
          resetState();
          console.log(res);
        });

      case !!data?.delete_course_outcome_order?.length:
        CourseApi.deleteCourseOutcome(id, data).then((res) => {
          resetState();
          console.log(res);
        });

      case !!data?.course_requirements?.length:
        CourseApi.updateCourseRequirements(id, data).then((res) => {
          resetState();
          console.log(res);
        });

      case !!data?.delete_course_requirements_order?.length:
        CourseApi.deleteCourseRequirements(id, data).then((res) => {
          resetState();
          console.log(res);
        });

      default:
        break;
    }
  }

  const onSubmit = (data: any) => {
    console.log(data);

    switch (pathname) {
      case routesWithParams.course_basics(id):
        CourseApi.updateInformation(id, data).then((res) => {
          resetState();
          openNotification("success");
        });
        break;

      case routesWithParams.intended_learners(id):
        apiIntendedLearners(data);
        break;

      default:
        return;
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

          {isRouteWithButtonPreview && (
            <a target="_blank" href="" className="preview">
              Xem thử
            </a>
          )}

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
          {children({
            course,
            handleValueChanged,
            valueChanged,
            resetState,
            control,
            watch,
            register,
            setValue,
            getValues,
          })}
        </div>
      </main>

      <Footer />
    </form>
  );
};
export default InstructorCourseLayout;
