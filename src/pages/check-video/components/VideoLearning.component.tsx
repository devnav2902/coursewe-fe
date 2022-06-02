import { FC, memo, useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player/lazy";
import { useParams } from "react-router-dom";
import LearningApi from "../../../api/learning.api";
import { useTypedSelector } from "../../../hooks/redux.hooks";

type VideoLearningProps = {
  thumbnail: string;
  url: string;
};

const VideoLearning: FC<VideoLearningProps> = memo(
  ({
    thumbnail,
    url = "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  }) => {
    const [handleVideo, setHandleVideo] = useState({
      playingVideo: true,
    });

    const { course, loadedCourse } = useTypedSelector(
      (state) => state.learning.dataCourse
    );

    const playerRef = useRef();

    const [video, setVideo] = useState(null);

    const { lectureId, course_slug } = useParams() as {
      lectureId: string;
      course_slug: string;
    };

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

    // console.log(second);

    // useEffect(saveLastWatched, [saveLastWatched]);
    // console.log(isReady);

    return (
      <div className="video-content">
        <div className="video-player">
          <ReactPlayer
            // ref={videoRef}
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
            // onReady={onReady}
          />
        </div>
      </div>
    );
  }
);

export default VideoLearning;
