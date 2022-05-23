import { FileImageOutlined } from "@ant-design/icons";
import { Col, Image, Progress, ProgressProps, Row, UploadProps } from "antd";
import { ImageProps } from "antd/lib/image";
import { UploadChangeParam } from "antd/lib/upload";
import Dragger from "antd/lib/upload/Dragger";
import axios from "axios";
import { useState } from "react";
import CourseImageApi from "../../../../api/course-image.api";
import { linkThumbnail, openNotification } from "../../../../utils/functions";

type CourseImageProps = {
  thumbnail: string;
  courseId: number | string;
  progressProps: ProgressProps;
  fileUploadProps: UploadProps;
};

const CourseImage = ({
  thumbnail,
  courseId,
  progressProps,
  fileUploadProps,
}: CourseImageProps) => {
  const [courseImage, setCourseImage] = useState(thumbnail);
  const [progressUploadImage, setProgressUploadImage] = useState(0);

  function handleUploadImage(info: UploadChangeParam<File>) {
    if (info.fileList.length) {
      CourseImageApi.updateCourseImage(
        courseId,
        info.file,
        setProgressUploadImage
      )
        .then((res) => {
          openNotification("success", "Tải lên hình ảnh khóa học thành công!");

          const { data } = res;
          setCourseImage(data.path);
          setProgressUploadImage(0);
        })
        .catch((error) => {
          if (axios.isCancel(error)) {
            openNotification("error", "Đã dừng upload hình ảnh khóa học");
          } else {
            // console.log(error.reponse);
          }
        });
    }
  }

  function handleAbortUploadImage() {
    if (CourseImageApi.controller) {
      CourseImageApi.controller.abort();
    }
    setProgressUploadImage(0);
  }

  return (
    <Row gutter={26}>
      <Col span={12}>
        <div id="preview-img"></div>
        <Image
          style={{ aspectRatio: "16/9" }}
          preview={
            !courseImage
              ? false
              : {
                  getContainer: () =>
                    document.getElementById("preview-img") as any,
                  src: linkThumbnail(courseImage),
                }
          }
          src={
            courseImage
              ? linkThumbnail(courseImage)
              : "https://s.udemycdn.com/course/750x422/placeholder.jpg"
          }
        />
      </Col>
      <Col span={12}>
        <Dragger
          {...fileUploadProps}
          onChange={handleUploadImage}
          name="thumbnail"
          accept="image/*"
          defaultFileList={
            !courseImage
              ? undefined
              : [{ uid: courseImage, thumbUrl: courseImage, name: courseImage }]
          }
          onRemove={handleAbortUploadImage}
          showUploadList={{
            showRemoveIcon: progressUploadImage ? true : false,
          }}
        >
          <p className="ant-upload-drag-icon">
            <FileImageOutlined />
          </p>
          <p className="ant-upload-text">
            Click hoặc kéo thả hình ảnh khóa học tại đây
          </p>
        </Dragger>

        {progressUploadImage > 0 && (
          <Progress percent={progressUploadImage} {...progressProps} />
        )}
      </Col>
    </Row>
  );
};

export default CourseImage;
