import { ProgressProps, UploadProps } from "antd";
import { FC } from "react";
import { CourseResponse } from "../../../api/instructor.api";
import CourseImage from "../components/image-and-video/CourseImage.component";
import CourseVideo from "../components/image-and-video/CourseVideo.component";

type ImageAndVideoProps = {
  course: CourseResponse;
};

const ImageAndVideoPage: FC<ImageAndVideoProps> = ({ course }) => {
  const { video_demo, thumbnail, id } = course;

  const beforeUpload = () => false;

  const progressProps: ProgressProps = {
    status: "active",
    showInfo: false,
    strokeWidth: 12,
    format: (percent) => percent + "%",
  };

  const fileUploadProps: UploadProps = {
    multiple: false,
    maxCount: 1,
    beforeUpload,
  };

  return (
    <div className="edit-course-section">
      <div className="inner-column">
        <h6 className="">Hình ảnh và video giới thiệu</h6>
        <div className="edit-course-form">
          <div className="form-group mb-3">
            <label htmlFor="thumbnail">Hình ảnh khóa học</label>

            <CourseImage
              progressProps={progressProps}
              thumbnail={thumbnail}
              courseId={id}
              fileUploadProps={fileUploadProps}
            />
          </div>

          <div className="form-group mb-3">
            <label htmlFor="demo-video-url">Video giới thiệu</label>

            <CourseVideo
              courseId={id}
              video_demo={video_demo}
              progressProps={progressProps}
              fileUploadProps={fileUploadProps}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageAndVideoPage;
