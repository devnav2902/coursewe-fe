import { FC, memo, useCallback, useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player/lazy";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import LearningApi from "../../../api/learning.api";
import ProgressLogsApi from "../../../api/progress-logs.api";
import { useTypedSelector } from "../../../hooks/redux.hooks";

type VideoLearningProps = {
  thumbnail: string;
  url: string;
};
const useUnload = (fn: any) => {
  const cb = useRef(fn);

  useEffect(() => {
    const onUnload = cb.current;
    window.addEventListener("beforeunload", onUnload);
    return () => {
      window.removeEventListener("beforeunload", onUnload);
    };
  }, [cb]);
};

const VideoLearning: FC<VideoLearningProps> = memo(
  ({
    thumbnail,
    url = "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  }) => {
    const [handleVideo, setHandleVideo] = useState({
      playingVideo: true,
    });

    const videoRef = useRef<ReactPlayer>(null);

    const { course, loadedCourse } = useTypedSelector(
      (state) => state.learning.dataCourse
    );

    const [isReady, setIsReady] = useState(false);
    const [isLoad, setIsLoad] = useState(false);
    const playerRef = useRef();

    const [video, setVideo] = useState(null);
    const [lastWatchedSecond, setLastWatchedSecond] = useState(0);

    const [saveLastWatchedSecond, setSaveLastWatchedSecond] = useState(false);
    const navigate = useNavigate();
    const { lectureId, course_slug } = useParams() as {
      lectureId: string;
      course_slug: string;
    };
    const lectureRef = useRef(lectureId);

    const [searchParams] = useSearchParams();

    const last_watched_second = searchParams.get("start");

    function playVideo() {
      setHandleVideo((state) => ({ ...state, playingVideo: true }));
    }
    const onReady = useCallback(() => {
      if (!isReady && last_watched_second) {
        const timeToStart = parseInt(last_watched_second);

        if (timeToStart !== NaN) {
          videoRef.current?.seekTo(timeToStart, "seconds");
          setIsReady(true);
        }
      }
    }, [isReady, last_watched_second]);
    useEffect(() => {
      async function getVideo() {
        try {
          if (loadedCourse) {
            const {
              data: {
                lecture: { src },
              },
            } = await LearningApi.getVideo(course_slug, parseInt(lectureId));
            setVideo(src);
          }
        } catch (error) {
          // axios.isAxiosError(error);
          // if (error.response.status !== 200) return navigate(ROUTES.NOT_FOUND);
        }
      }

      getVideo();
      // return () => {
      //   window.removeEventListener("scroll", handleScroll);
      // };
    }, [course_slug, lectureId, loadedCourse]);

    useEffect(() => {
      if (last_watched_second && !loadedCourse)
        return setSaveLastWatchedSecond(true);

      course?.id &&
        ProgressLogsApi.getDataLastWatchedByLectureId(
          course.id,
          lectureId
        ).then(({ data: { dataLastWatched } }) => {
          setLastWatchedSecond(dataLastWatched?.last_watched_second || 0);
          setSaveLastWatchedSecond(true);
        });

      setSaveLastWatchedSecond(false);
    }, [lectureId, last_watched_second, course?.id, loadedCourse]);

    // const second = videoRef.current?.getCurrentTime();

    const second = videoRef.current?.getCurrentTime();
    // console.log(second);
    const saveLastWatched = useCallback(() => {
      window.confirm("hi");
      if (course?.id && typeof second === "number" && loadedCourse) {
        ProgressLogsApi.saveLastWatched({
          course_id: course.id,
          lecture_id: parseInt(lectureRef.current),
          second,
        }).then((res) => {
          lectureRef.current = lectureId;
          localStorage.setItem("success", "success");
        });
      }
    }, [lectureId, course?.id, second, loadedCourse]);

    // useEffect(saveLastWatched, [saveLastWatched]);
    // console.log(isReady);

    useUnload((e: Event) => {
      e.preventDefault();
      console.log("hey");
      alert("HEY");
    });

    return (
      <div className="video-content">
        <div className="video-player">
          <ReactPlayer
            ref={videoRef}
            // light={linkThumbnail(thumbnail)}
            width="100%"
            height="100%"
            // playing={true}
            // onClickPreview={playVideo}
            controls={handleVideo.playingVideo ? true : false}
            url={url}
            // onLoaded={() => {
            //   console.log("hi");
            // }}
            onReady={onReady}
          />
        </div>
      </div>
    );
  }
);

export default VideoLearning;
