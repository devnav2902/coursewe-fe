import {
  FC,
  LegacyRef,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import ReactPlayer from "react-player/lazy";
import { useParams } from "react-router-dom";
import ProgressLogsApi from "../../../api/progress-logs.api";
import { useTypedSelector } from "../../../hooks/redux.hooks";
import { linkThumbnail } from "../../../utils/functions";

type VideoLearningProps = {
  thumbnail: string;
  last_watched_second: number;
  url: string;
};

const VideoLearning: FC<VideoLearningProps> = memo(
  ({
    thumbnail,
    last_watched_second,
    url = "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  }) => {
    const [handleVideo, setHandleVideo] = useState({
      playingVideo: true,
    });
    const videoRef = useRef<ReactPlayer>(null);
    const { lectureId } = useParams() as { lectureId: string };
    const { course } = useTypedSelector((state) => state.learning.dataCourse);
    const lectureRef = useRef(lectureId);
    const [played, setPlayed] = useState(0);
    const [isReady, setIsReady] = useState(false);
    const playerRef = useRef();

    function playVideo() {
      setHandleVideo((state) => ({ ...state, playingVideo: true }));
    }

    // const second = videoRef.current?.getCurrentTime();
    const onReady = useCallback(() => {
      if (!isReady) {
        const timeToStart = last_watched_second;
        videoRef.current?.seekTo(timeToStart, "seconds");
        setIsReady(true);
      }
    }, [isReady, last_watched_second]);
    useEffect(() => {
      setIsReady(false);
      const timeToStart = last_watched_second;
      videoRef.current?.seekTo(timeToStart, "seconds");
    }, [lectureId, last_watched_second]);
    const second = videoRef.current?.getCurrentTime();
    useEffect(() => {
      if (course?.id && typeof second === "number") {
        ProgressLogsApi.saveLastWatched({
          course_id: course.id,
          lecture_id: parseInt(lectureRef.current),
          second,
        }).then((res) => {
          lectureRef.current = lectureId;
        });
      }
    }, [lectureId, course?.id, second]);
    useEffect(() => {
      window.addEventListener(
        "beforeunload",
        function () {
          if (course?.id && typeof second === "number") {
            ProgressLogsApi.saveLastWatched({
              course_id: course.id,
              lecture_id: parseInt(lectureRef.current),
              second,
            }).then((res) => {
              lectureRef.current = lectureId;
            });
          }
        },
        true
      );
      window.removeEventListener(
        "beforeunload",
        function () {
          if (course?.id && typeof second === "number") {
            ProgressLogsApi.saveLastWatched({
              course_id: course.id,
              lecture_id: parseInt(lectureRef.current),
              second,
            }).then((res) => {
              lectureRef.current = lectureId;
            });
          }
        },
        false
      );
    }, []);
    return (
      <div className="video-content">
        <div className="video-player">
          <ReactPlayer
            ref={videoRef}
            onProgress={(progress) => {
              setPlayed(progress.playedSeconds);
            }}
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
