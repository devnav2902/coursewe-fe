import {
  createContext,
  FC,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import LectureApi from "../../../api/lecture.api";
import { useTypedSelector } from "../../../hooks/redux.hooks";
import { Lecture } from "../../../ts/types/course.types";
import { CURRICULUM_TYPES } from "../utils/constants";

type DataLecture = {
  lecture: Lecture;
  getLatestLecture: () => void;
};

export const useLecture = (iniLectureItem: Lecture): DataLecture => {
  const [lecture, setLecture] = useState(iniLectureItem);

  function getLatestLecture() {
    LectureApi.getByLectureId(iniLectureItem.id)
      .then((res) => {
        console.log(res);
        setLecture(res.data.lecture);
      })
      .catch((error) => error);
  }

  return { lecture, getLatestLecture };
};

type Func = () => void;
type HandleData = Func;
type LectureContext = {
  nthLecture: number | null;
  isDisplayEditTitle: boolean;
  lectureData: {
    lecture: Lecture | null;
    updatedTitle: string;
    handle: {
      getLatestLecture: HandleData;
      setUpdatedTitle: (value: string) => void;
    };
  };
  contentTab: {
    displayContentTab: boolean;
    handleDisplayContentTab: HandleData;
    closeContentTab: HandleData;
  };
  uploadMedia: {
    displayUploadMedia: boolean;
    handleDisplayUploadMedia: HandleData;
    closeUploadMedia: HandleData;
  };
  uploadResources: {
    displayUploadResources: boolean;
    handleDisplayUploadResources: HandleData;
    closeUploadResources: HandleData;
  };
  lectureUploading: {
    setLectureUploadingTo: (value: boolean) => void;
    lectureUploading: boolean;
  };
  resourceUploading: {
    setResourceUploadingTo: (value: boolean) => void;
    resourceUploading: boolean;
  };
  displayResourceData: {
    handleDisplayResources: HandleData;
    displayResources: boolean;
  };
};

const initialLectureContext: LectureContext = {
  nthLecture: null,
  isDisplayEditTitle: false,
  lectureData: {
    lecture: null,
    updatedTitle: "",
    handle: {
      getLatestLecture: () => {},
      setUpdatedTitle: () => {},
    },
  },
  contentTab: {
    displayContentTab: false,
    handleDisplayContentTab: () => {},
    closeContentTab: () => {},
  },
  uploadMedia: {
    displayUploadMedia: false,
    handleDisplayUploadMedia: () => {},
    closeUploadMedia: () => {},
  },
  uploadResources: {
    displayUploadResources: false,
    handleDisplayUploadResources: () => {},
    closeUploadResources: () => {},
  },
  lectureUploading: {
    setLectureUploadingTo: () => {},
    lectureUploading: false,
  },
  resourceUploading: {
    setResourceUploadingTo: () => {},
    resourceUploading: false,
  },
  displayResourceData: {
    handleDisplayResources: () => {},
    displayResources: false,
  },
};
export const LectureContext = createContext<LectureContext>(
  initialLectureContext
);

type LectureProviderProps = {
  lecture: Lecture;
  nthLecture: number;
};
export const LectureProvider: FC<LectureProviderProps> = ({
  children,
  lecture: lectureItem,
  nthLecture,
}) => {
  const { id, title } = lectureItem;

  const [displayResources, setDisplayResources] = useState<boolean>(false);
  const [displayUploadResources, setDisplayUploadResources] =
    useState<boolean>(false);
  const [displayUploadMedia, setDisplayUploadMedia] = useState<boolean>(false);
  const [displayContentTab, setDisplayContentTab] = useState<boolean>(false);
  const [lectureUploading, setLectureUploading] = useState<boolean>(false);
  const [resourceUploading, setResourceUploading] = useState<boolean>(false);
  const [updatedTitle, setUpdatedTitle] = useState<string>(title);

  const { elementDisplay } = useTypedSelector((state) => state.curriculum);

  const { getLatestLecture, lecture } = useLecture(lectureItem);

  const isDisplayEditTitle =
    elementDisplay.id === id &&
    elementDisplay.type === CURRICULUM_TYPES.LECTURE;

  useEffect(() => {
    if (isDisplayEditTitle) {
      setDisplayResources(false);
      setDisplayUploadResources(false);
      setDisplayUploadMedia(false);
      setDisplayContentTab(false);
    }
  }, [isDisplayEditTitle]);

  useEffect(() => {
    if (
      displayUploadMedia ||
      displayUploadResources ||
      lecture.resource.length < 1
    ) {
      setDisplayResources(false);
      setDisplayContentTab(false);
    }
  }, [displayUploadMedia, displayUploadResources, lecture.resource]);

  useEffect(() => {
    if (displayContentTab) {
      setDisplayResources(false);
      setDisplayUploadResources(false);
      setDisplayUploadMedia(false);
    }
  }, [displayContentTab]);

  const setLectureUploadingTo = useCallback((value: boolean) => {
    setLectureUploading(value);
  }, []);

  const setResourceUploadingTo = useCallback((value: boolean) => {
    setResourceUploading(value);
  }, []);

  const handleDisplayUploadResources = useCallback(() => {
    setDisplayUploadResources(true);
  }, []);

  // toggle button
  const handleDisplayResources = useCallback(() => {
    setDisplayResources((state) => !state);
  }, []);

  const closeUploadResources = useCallback(() => {
    setDisplayUploadResources(false);
  }, []);

  const closeUploadMedia = useCallback(() => {
    setDisplayUploadMedia(false);
  }, []);

  const handleDisplayUploadMedia = useCallback(() => {
    setDisplayUploadMedia(true);
  }, []);

  const closeContentTab = useCallback(() => {
    setDisplayContentTab(false);
  }, []);

  const handleDisplayContentTab = useCallback(() => {
    setDisplayContentTab(true);
  }, []);

  const value: LectureContext = useMemo(
    () => ({
      isDisplayEditTitle,
      nthLecture,
      lectureData: {
        lecture: updatedTitle ? { ...lecture, title: updatedTitle } : lecture,
        updatedTitle,
        handle: {
          getLatestLecture,
          setUpdatedTitle,
        },
      },
      contentTab: {
        displayContentTab,
        handleDisplayContentTab,
        closeContentTab,
      },
      uploadMedia: {
        displayUploadMedia,
        handleDisplayUploadMedia,
        closeUploadMedia,
      },
      uploadResources: {
        displayUploadResources,
        handleDisplayUploadResources,
        closeUploadResources,
      },
      lectureUploading: {
        setLectureUploadingTo,
        lectureUploading,
      },
      resourceUploading: {
        setResourceUploadingTo,
        resourceUploading,
      },
      displayResourceData: {
        handleDisplayResources,
        displayResources,
      },
    }),
    [
      nthLecture,
      updatedTitle,
      isDisplayEditTitle,
      resourceUploading,
      lecture,
      lectureUploading,
      displayContentTab,
      displayUploadMedia,
      displayUploadResources,
      displayResources,
      getLatestLecture,
      handleDisplayResources,
      handleDisplayUploadMedia,
      closeUploadResources,
      closeContentTab,
      closeUploadMedia,
      handleDisplayContentTab,
      handleDisplayUploadResources,
      setLectureUploadingTo,
      setResourceUploadingTo,
    ]
  );

  return (
    <LectureContext.Provider value={value}>{children}</LectureContext.Provider>
  );
};
