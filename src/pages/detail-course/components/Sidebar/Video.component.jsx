import { CaretRightOutlined, CloseOutlined } from "@ant-design/icons";
import { useState } from "react";
import ReactPlayer from "react-player/lazy";
import { linkThumbnail } from "../../../../utils/functions";

const Video = ({ thumbnail, title }) => {
  const [handleVideo, setHandleVideo] = useState({
    displayVideo: false,
    playingVideo: false,
  });

  function hideVideoDemo() {
    setHandleVideo((state) => ({ ...state, displayVideo: false }));
  }

  function displayVideoDemo() {
    setHandleVideo((state) => ({ ...state, displayVideo: true }));
  }

  function playVideo() {
    setHandleVideo((state) => ({ ...state, playingVideo: true }));
  }

  return (
    <>
      <div
        onClick={displayVideoDemo}
        className="intro-video"
        style={{
          backgroundImage: `url(${linkThumbnail(thumbnail)})`,
        }}
      >
        <div className="intro-video-play">
          <span className="lightbox-image intro-video-box media-play-symbol">
            <CaretRightOutlined />
          </span>
        </div>
        <h4>Xem thử</h4>
      </div>
      {handleVideo.displayVideo && (
        <div className="video-demo">
          <div className="video-container">
            <div className="video">
              <div className="video-top">
                <div className="video-top-left">
                  <h5>Giới thiệu khóa học</h5>
                </div>
                <div className="video-top-right">
                  <CloseOutlined onClick={hideVideoDemo} />
                </div>
              </div>
              <h4>Khóa học: {title}</h4>

              {/* <ReactPlayer width="100%" url={BE_URL + "/" + video_demo} /> */}
              <div className="react-player">
                <ReactPlayer
                  light={linkThumbnail(thumbnail)}
                  width="100%"
                  height="100%"
                  playing={handleVideo.playingVideo}
                  onClickPreview={playVideo}
                  controls={handleVideo.playingVideo ? true : false}
                  url={
                    "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                  }
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Video;
