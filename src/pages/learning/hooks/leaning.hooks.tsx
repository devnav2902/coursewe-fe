import { createContext, FC, RefObject, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { useParams } from "react-router-dom";
import ProgressLogsApi from "../../../api/progress-logs.api";
import { useTypedSelector } from "../../../hooks/redux.hooks";

type LearningContext = {
  videoRef: RefObject<ReactPlayer> | null;
  lectureId: string;
  course_slug: string;

  saveLastWatched: () => void;
  videoSaving: boolean;
};

const initialLearningContext: LearningContext = {
  videoRef: null,
  lectureId: "",
  course_slug: "",

  saveLastWatched: () => {},
  videoSaving: false,
};

export const LearningContext = createContext(initialLearningContext);

export const LearningProvider: FC = ({ children }) => {
  const { lectureId, course_slug } = useParams() as {
    lectureId: string;
    course_slug: string;
  };

  const [videoSaving, setVideoSaving] = useState(false);

  const lectureRef = useRef(lectureId);

  const videoRef = useRef<ReactPlayer>(null);

  const { course, loadedCourse } = useTypedSelector(
    (state) => state.learning.dataCourse
  );

  const saveLastWatched = () => {
    const second = videoRef.current?.getCurrentTime();

    if (course?.id && typeof second === "number" && loadedCourse) {
      setVideoSaving(true);
      console.log(lectureId, lectureRef);

      ProgressLogsApi.saveLastWatched({
        course_id: course.id,
        lecture_id: parseInt(lectureId),
        second,
      }).then((res) => {
        console.log(lectureId, lectureRef);
        setVideoSaving(false);
      });
    }
  };

  const value: LearningContext = {
    course_slug,
    lectureId,
    videoRef,
    saveLastWatched,
    videoSaving,
  };
  return (
    <LearningContext.Provider value={value}>
      {children}
    </LearningContext.Provider>
  );
};
