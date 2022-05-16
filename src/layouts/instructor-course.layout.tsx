import axios from "axios";
import { FC, useCallback, useEffect, useState } from "react";
import {
  FieldValues,
  SubmitHandler,
  useForm,
  UseFormReturn,
} from "react-hook-form";
import { IoIosArrowBack } from "react-icons/io";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import CourseApi from "../api/course.api";
import Footer from "../components/Footer/Footer.component";
import { useAppDispatch, useTypedSelector } from "../hooks/redux.hooks";
import { getCourse } from "../redux/slices/instructor-course.slice";
import { ROUTES, routesWithParams } from "../utils/constants";
import { openNotification } from "../utils/functions";
import { Sidebar } from "./components/instructor-course.components";

export type ChildrenProps = {
  valueChanged?: boolean;
  handleValueChanged?: (boolValue: boolean) => void;
  formHandler: UseFormReturn<FieldValues>;
};

type Children = (props: ChildrenProps) => JSX.Element;
interface LayoutProps {
  children: Children;
}

const InstructorCourseLayout: FC<LayoutProps> = ({ children }) => {
  const { id } = useParams() as { id: string };
  const { pathname } = useLocation();
  const [valueChanged, setValueChanged] = useState<boolean>(false); // trigger button save
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const {
    course: { data: courseData },
  } = useTypedSelector((state) => state.instructorCourse);

  const formHandler = useForm();
  const {
    formState: { errors },
    handleSubmit,
    setError,
    clearErrors,
  } = formHandler;

  useEffect(() => {
    dispatch(getCourse(id));
  }, [id, dispatch]);

  const handleValueChanged = useCallback((boolValue) => {
    setValueChanged(boolValue);
  }, []);

  const resetState = () => {
    handleValueChanged(false);
  };

  useEffect(() => {
    const subscription = formHandler.watch((value, { name, type }) => {
      !valueChanged && handleValueChanged(true);
      console.log(value, name, type);
      if (errors.topic && name === "topic" && value.topic) {
        (value.topic?.length || typeof value.topic === "number") &&
          clearErrors("topic"); // xóa topic trong phần basics(categories)
      }
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [
    formHandler,
    valueChanged,
    handleValueChanged,
    clearErrors,
    errors.topic,
  ]);

  console.log("re-render layout");

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

  async function apiIntendedLearners(data: any) {
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

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    // const data = formHandler.getValues();
    console.log(errors);

    switch (pathname) {
      case routesWithParams.course_basics(id):
        CourseApi.updateInformation(id, data)
          .then((res) => {
            resetState();
            openNotification("success");
          })
          .catch((error) => {
            if (axios.isAxiosError(error)) {
              const { errors } = error.response?.data;
              for (const key in errors) {
                const element = errors[key];
                setError(key, { message: element.at(-1) });
              }
            }
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
    <div className="wrapper instructor-page">
      <nav className="nav">
        <div className="nav-content">
          <Link
            to={ROUTES.INSTRUCTOR_COURSES}
            className="d-flex align-items-center"
          >
            <IoIosArrowBack />
            <span className="back">Trở về trang khóa học</span>
          </Link>
          <span title={courseData?.title} className="course-title">
            {courseData?.title}
          </span>
          <span className="header-status">
            {!courseData?.isPublished ? "Draft" : "Published"}
          </span>

          {isRouteWithButtonPreview && (
            <a target="_blank" href="" className="preview">
              Xem thử
            </a>
          )}

          {isRouteWithButtonSave && (
            <button
              onClick={handleSubmit(onSubmit)}
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
        <Sidebar handleRedirect={handleRedirect} />
        <div className="main-content">
          {children({
            handleValueChanged,
            valueChanged,
            formHandler,
          })}
        </div>
      </main>

      <Footer />
    </div>
  );
};
export default InstructorCourseLayout;
