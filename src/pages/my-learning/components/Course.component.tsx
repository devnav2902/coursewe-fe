import { Button, Progress, Row } from "antd";
import { FC, useState } from "react";
import { Link } from "react-router-dom";
import { CustomCourse } from "../../../api/my-learning.api";
import Rating from "../../../components/Rating/Rating.component";
import { ROUTES } from "../../../utils/constants";
import { linkThumbnail } from "../../../utils/functions";
import { StyledCourse } from "../styles/my-learning.styles";
import RatingModal from "./Rating.component";

type CourseProps = {
  course: CustomCourse;
  getCourses: () => void;
};

const Course: FC<CourseProps> = ({ course, getCourses }) => {
  const { author, count_progress, slug, thumbnail, title, rating, id } = course;

  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <StyledCourse className="course">
      <Link
        to={ROUTES.learning({ course_slug: slug })}
        className="image-course"
      >
        <img src={linkThumbnail(thumbnail)} alt={title} />
      </Link>
      <div className="profile-course">
        <h4 className="name-course truncate">
          <Link to={ROUTES.learning({ course_slug: slug })}>{title}</Link>
        </h4>
        <Link
          to={!author ? "author" : ROUTES.instructor_bio(author.slug)}
          className="author "
        >
          {author?.fullname}
        </Link>
        {count_progress === 0.0 ? (
          <div className="course-footer">
            <Link to={ROUTES.learning({ course_slug: slug })}>Bắt đầu học</Link>
          </div>
        ) : (
          <div className="course-footer">
            <div className="progress-wrapper">
              <Progress
                strokeColor="#5959ff"
                trailColor="#dedee9"
                percent={count_progress && count_progress * 100}
                size="small"
                showInfo={false}
              />

              <div className="progress-info">
                <span>Tiến độ học tập</span>
                &nbsp;
                <b className="count-progress">
                  {count_progress ? count_progress * 100 : 0}%
                </b>
              </div>
            </div>

            <Row justify="space-between" align="middle">
              {rating?.length ? (
                <>
                  <Rating value={rating[0].rating} size="14px" />
                  <a href="#">Bạn đã đánh giá</a>
                </>
              ) : (
                <>
                  <Rating value={0} />
                  <Button
                    type="default"
                    onClick={() => setIsModalVisible(true)}
                  >
                    Để lại đánh giá
                  </Button>

                  <RatingModal
                    getCourses={getCourses}
                    courseId={id}
                    isModalVisible={isModalVisible}
                    setIsModalVisible={setIsModalVisible}
                  />
                </>
              )}
            </Row>
          </div>
        )}
      </div>
    </StyledCourse>
  );
};

export default Course;
