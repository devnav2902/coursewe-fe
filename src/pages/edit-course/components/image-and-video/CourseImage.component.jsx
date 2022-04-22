import { FileImageOutlined } from "@ant-design/icons";
import { Col, Image, Progress, Row } from "antd";
import Dragger from "antd/lib/upload/Dragger";
import axios from "axios";
import { useState } from "react";
import CourseImageApi from "../../../../api/course-image.api";
import { linkThumbnail, openNotification } from "../../../../utils/functions";

const CourseImage = ({
  thumbnail,
  courseId,
  progressProps,
  fileUploadProps,
}) => {
  const [courseImage, setCourseImage] = useState(thumbnail);
  const [progressUploadImage, setProgressUploadImage] = useState(0);

  function handleUploadImage(file) {
    if (file.fileList.length) {
      CourseImageApi.updateCourseImage(
        courseId,
        file.file,
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
    CourseImageApi.controller.abort();
    setProgressUploadImage(0);
  }

  return (
    <Row gutter={26}>
      <Col span={12}>
        <Image
          style={{ aspectRatio: "16/9" }}
          src={
            courseImage
              ? linkThumbnail(courseImage)
              : "https://s.udemycdn.com/course/750x422/placeholder.jpg"
          }
          placeholder={
            <Image
              preview={false}
              src={
                courseImage
                  ? linkThumbnail(courseImage)
                  : "https://s.udemycdn.com/course/750x422/placeholder.jpg"
              }
            />
          }
        />
      </Col>
      <Col span={12}>
        <Dragger
          {...fileUploadProps}
          onChange={handleUploadImage}
          name="thumbnail"
          accept="image/*"
          defaultFileList={[{ thumbUrl: courseImage, name: courseImage }]}
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
