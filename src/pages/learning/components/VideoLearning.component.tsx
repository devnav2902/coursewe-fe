import axios from "axios";
import { FC, memo, useContext, useEffect, useState } from "react";
import ReactPlayer from "react-player/lazy";
import { useNavigate, useSearchParams } from "react-router-dom";
import LearningApi from "../../../api/learning.api";
import ProgressLogsApi from "../../../api/progress-logs.api";
import { useTypedSelector } from "../../../hooks/redux.hooks";
import { LearningContext } from "../hooks/leaning.hooks";

const VideoLearning: FC = memo(() => {
  const { course_slug, lectureId, videoRef } = useContext(LearningContext);

  const { loadedCourse, course } = useTypedSelector(
    (state) => state.learning.dataCourse
  );

  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();

  const [srcVideo, setSrcVideo] = useState("");

  useEffect(() => {
    if (course && !lectureId) {
      ProgressLogsApi.getDataLastWatched(course.id).then(({ data }) => {
        searchParams.set(
          "bai-giang",
          data.dataLastWatched.lecture_id.toString()
        );

        setSearchParams(searchParams);
      });
    }
  }, [course, searchParams]);

  useEffect(() => {
    async function getVideo() {
      try {
        if (loadedCourse && lectureId) {
          const {
            data: {
              lecture: { src },
              dataLastWatched: { last_watched_second },
            },
          } = await LearningApi.getVideo(course_slug, parseInt(lectureId));

          setSrcVideo(src);

          videoRef?.current?.seekTo(last_watched_second, "seconds");
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          return navigate("/404");
        }
      }
    }

    getVideo();
  }, [course_slug, lectureId, loadedCourse, navigate, videoRef]);

  return (
    <div className="video-content">
      <div className="video-player">
        <ReactPlayer
          ref={videoRef}
          // light={linkThumbnail(thumbnail)}
          width="100%"
          height="100%"
          controls
          url={
            "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
          }
          // url={BE_URL + "/" + srcVideo}
        />
      </div>
    </div>
  );
});

export default VideoLearning;
