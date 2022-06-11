import { createContext, FC, useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import CourseApi, { CustomCourse } from "../../../api/course.api";

type LearningContext = {
  dataCourse: {
    loaded: boolean;
    data: CustomCourse | null;
  };
  course_id: string | number;
};

const initialLearningContext: LearningContext = {
  dataCourse: { data: null, loaded: false },
  course_id: "",
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

  useEffect(() => {
    CourseApi.getDraftCourseById(course_id).then((res) => {
      console.log(res);

      setDataCourse((state) => ({ ...state, data: res.data, loaded: true }));
    });
  }, []);

  const [searchParams] = useSearchParams();
  const lectureId = searchParams.get("bai-giang");

  const value: LearningContext = {
    course_id,
    dataCourse,
  };

  return (
    <CheckVideoContext.Provider value={value}>
      {children}
    </CheckVideoContext.Provider>
  );
};
