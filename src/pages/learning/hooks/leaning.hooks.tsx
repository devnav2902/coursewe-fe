import {
  createContext,
  Dispatch,
  FC,
  RefObject,
  SetStateAction,
  useRef,
  useState,
} from "react";
import ReactPlayer from "react-player";
import { useParams, useSearchParams } from "react-router-dom";
import ProgressLogsApi from "../../../api/progress-logs.api";
import { useTypedSelector } from "../../../hooks/redux.hooks";

type LearningContext = {
  videoRef: RefObject<ReactPlayer> | null;
  lectureId: string | null;
  course_slug: string;
  videoSaving: boolean;
  setVideoSaving: Dispatch<SetStateAction<boolean>>;
};

const initialLearningContext: LearningContext = {
  videoRef: null,
  lectureId: "",
  course_slug: "",
  videoSaving: false,
  setVideoSaving: () => {},
};

export const LearningContext = createContext(initialLearningContext);

export const LearningProvider: FC = ({ children }) => {
  const { course_slug } = useParams() as {
    course_slug: string;
  };

  const [searchParams] = useSearchParams();
  const lectureId = searchParams.get("bai-giang");

  const [videoSaving, setVideoSaving] = useState(false);

  const videoRef = useRef<ReactPlayer>(null);

  const value: LearningContext = {
    course_slug,
    lectureId,
    videoRef,
    videoSaving,
    setVideoSaving,
  };

  return (
    <LearningContext.Provider value={value}>
      {children}
    </LearningContext.Provider>
  );
};
