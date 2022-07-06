import { createContext, FC, useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import CourseApi, { CustomCourse } from "../../../api/course.api";
import { ROUTES } from "../../../utils/constants";

type LearningContext = {
  dataCourse: {
    loaded: boolean;
    data: CustomCourse | null;
  };
  course_id: string | number;
  lectureId: null | string;
};

const initialLearningContext: LearningContext = {
  dataCourse: { data: null, loaded: false },
  course_id: "",
  lectureId: "",
};

export const CheckVideoContext = createContext(initialLearningContext);

export const CheckVideoProvider: FC = ({ children }) => {
  const { course_id } = useParams() as {
    course_id: string | number;
  };
  const [dataCourse, setDataCourse] = useState<{
    loaded: boolean;
    data: CustomCourse | null;
  }>({
    loaded: false,
    data: null,
  });

  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const lectureId = searchParams.get("bai-giang");

  useEffect(() => {
    CourseApi.draftCoursePreview(course_id)
      .then(({ data }) => {
        console.log(data);

        setDataCourse((state) => ({
          ...state,
          data: data.course,
          loaded: true,
        }));
      })
      .catch(() => {
        navigate(ROUTES.NOT_FOUND);
      });
  }, [course_id, navigate]);

  const value: LearningContext = {
    course_id,
    dataCourse,
    lectureId,
  };

  return (
    <CheckVideoContext.Provider value={value}>
      {children}
    </CheckVideoContext.Provider>
  );
};
