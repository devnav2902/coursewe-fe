import { FC, memo, useContext, useEffect, useState } from "react";
import ReactPlayer from "react-player/lazy";
import { useNavigate } from "react-router-dom";
import { CustomLecture } from "../../../../api/course.api";
import LearningApi from "../../../../api/learning.api";
import { BE_URL, ROUTES } from "../../../../utils/constants";
import { CheckVideoContext } from "../../hooks/leaning.hooks";

type VideoLearningProps = {
  thumbnail: string;
  url: string;
};

const VideoLearning: FC<VideoLearningProps> = memo(
  ({
    thumbnail,
    url = "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  }) => {
    const { dataCourse, lectureId } = useContext(CheckVideoContext);

    const [video, setVideo] = useState<undefined | string>();

    const navigate = useNavigate();

    useEffect(
      function getVideo() {
        const { data } = dataCourse;

        if (data?.lecture.length) {
          const lecture = data.lecture.at(0) as CustomLecture;

          LearningApi.getVideo(data.slug, lectureId ? lectureId : lecture.id)
            .then(({ data }) => {
              const {
                lecture: { src },
              } = data;
              setVideo(BE_URL + "/" + src);
            })
            .catch(() => navigate(ROUTES.NOT_FOUND));
        }
      },
      [navigate, dataCourse, lectureId]
    );

    return (
      <div className="video-content">
        <div className="video-player">
          <ReactPlayer width="100%" height="100%" controls url={video} />
        </div>
      </div>
    );
  }
);

export default VideoLearning;
