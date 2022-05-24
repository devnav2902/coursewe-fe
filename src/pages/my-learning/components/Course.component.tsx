import { Progress } from "antd";
import { FC } from "react";
import { Link } from "react-router-dom";
import { CustomCourse } from "../../../api/my-learning.api";
import Rating from "../../../components/Rating/Rating.component";
import { ROUTES } from "../../../utils/constants";
import { linkThumbnail } from "../../../utils/functions";
import { StyledCourse } from "../styles/my-learning.styles";

type CourseProps = {
  course: CustomCourse;
};

const Course: FC<CourseProps> = ({ course }) => {
  const { author, count_progress, slug, thumbnail, title, rating, id } = course;
  return (
    <StyledCourse className="course">
      <Link to={ROUTES.course_dash_redirect(id)} className="image-course">
        <img src={linkThumbnail(thumbnail)} alt={title} />
      </Link>
      <div className="profile-course">
        <h4 className="name-course truncate">
          <Link to={ROUTES.course_dash_redirect(id)}>{title}</Link>
        </h4>
        <Link
          to={!author ? "author" : ROUTES.instructor_bio(author.slug)}
          className="author "
        >
          {author?.fullname}
        </Link>
        {count_progress === 0.0 ? (
          <div className="course-footer">
            <Link to={ROUTES.course_dash_redirect(id)}>Bắt đầu học</Link>
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

            <div className="course-rating">
              {rating?.length ? (
                <>
                  <Rating value={rating[0].rating} size="14px" />
                  <a href="#">Bạn đã đánh giá</a>
                </>
              ) : (
                <>
                  <Rating value={0} />
                  <a href="{{ route('course', ['url' => $course->slug]) }}">
                    Để lại đánh giá
                  </a>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </StyledCourse>
  );
};

export default Course;
