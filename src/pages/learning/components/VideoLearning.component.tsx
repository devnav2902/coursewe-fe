import { FC, memo, useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player/lazy";
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

    function playVideo() {
      setHandleVideo((state) => ({ ...state, playingVideo: true }));
    }

    // function onPlayerReady(player) {
    //   player.seekTo(last_watched_second);
    // }

    return (
      <div className="video-content">
        <div className="video-player">
          <ReactPlayer
            // ref={(el) => el.seekTo(40)}
            // light={linkThumbnail(thumbnail)}
            width="100%"
            height="100%"
            // playing={true}
            // onClickPreview={playVideo}
            controls={handleVideo.playingVideo ? true : false}
            url={url}
            // onReady={onPlayerReady}
          />
        </div>
      </div>
    );
  }
);

export default VideoLearning;
