import { VideoCameraOutlined } from "@ant-design/icons";
import { Col, Image, Progress, ProgressProps, Row, UploadProps } from "antd";
import { UploadChangeParam } from "antd/lib/upload";
import Dragger from "antd/lib/upload/Dragger";
import axios from "axios";
import { FC, useState } from "react";
import CourseVideoApi from "../../../../api/course-video.api";
import { openNotification } from "../../../../utils/functions";

type CourseVideoProps = {
  video_demo: string;
  courseId: number | string;
  progressProps: ProgressProps;
  fileUploadProps: UploadProps;
};

const CourseVideo: FC<CourseVideoProps> = ({
  video_demo,
  courseId,
  progressProps,
  fileUploadProps,
}) => {
  const [progressUploadVideo, setProgressUploadVideo] = useState(0);

  function handleUploadVideo(file: UploadChangeParam<File>) {
    if (file.fileList.length) {
      CourseVideoApi.updateCourseVideo(
        courseId,
        file.file,
        setProgressUploadVideo
      )
        .then((res) => {
          openNotification(
            "success",
            "Tải lên video giới thiệu khóa học thành công!"
          );

          // const { data } = res;

          setProgressUploadVideo(0);
        })
        .catch((error) => {
          if (axios.isCancel(error)) {
            openNotification("error", "Đã dừng upload video");
          } else {
            // console.log(error.reponse);
          }
        });
    }
  }

  function handleAbortUploadVideo() {
    if (CourseVideoApi.controller) {
      CourseVideoApi.controller.abort();
    }
    setProgressUploadVideo(0);
  }

  return (
    <Row gutter={26}>
      <Col span={12}>
        <Image
          preview={false}
          style={{ aspectRatio: "16/9" }}
          src={"https://s.udemycdn.com/course/750x422/placeholder.jpg"}
        />
      </Col>

      <Col span={12}>
        <Dragger
          name="video_demo"
          {...fileUploadProps}
          accept="video/*"
          showUploadList={{
            showRemoveIcon: progressUploadVideo ? true : false,
          }}
          onChange={handleUploadVideo}
          defaultFileList={[{ uid: video_demo, name: video_demo }]}
          onRemove={handleAbortUploadVideo}
        >
          <p className="ant-upload-drag-icon">
            <VideoCameraOutlined />
          </p>
          <p className="ant-upload-text">
            Click hoặc kéo thả video giới thiệu khóa học tại đây
          </p>
        </Dragger>

        {progressUploadVideo > 0 && (
          <Progress percent={progressUploadVideo} {...progressProps} />
        )}
      </Col>
    </Row>
  );
};

export default CourseVideo;
