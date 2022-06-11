import { FC, memo, useContext, useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player/lazy";
import { useParams } from "react-router-dom";
import CourseApi, { CustomCourse } from "../../../api/course.api";
import LearningApi from "../../../api/learning.api";
import { useTypedSelector } from "../../../hooks/redux.hooks";
import { CheckVideoContext } from "../hooks/leaning.hooks";

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
    const { dataCourse } = useContext(CheckVideoContext);
    // const { course, loadedCourse } = useTypedSelector(
    //   (state) => state.learning.dataCourse
    // );

    const playerRef = useRef();

    const [video, setVideo] = useState(null);

    useEffect(() => {
      async function getVideo() {
        const { data, loaded } = dataCourse;
        try {
          if (loaded && data) {
            if (data.lecture.length) {
              const lectureId = data.lecture[0].id;

              const {
                data: {
                  lecture: { src },
                },
              } = await LearningApi.getVideo(data.slug, lectureId);
              setVideo(src);
            }
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
    }, [dataCourse.loaded]);

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
