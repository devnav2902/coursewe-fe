import { Progress } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import Rating from "../../../components/Rating/Rating.component";
import { BE_URL, routesWithParams } from "../../../utils/constants";
import { isUrl } from "../../../utils/functions";
const Course = ({ course }) => {
  const { author, count_progress, slug, thumbnail, title, rating } = course;
  return (
    <div className="course">
      <Link to={routesWithParams.learning(slug)} className="image-course">
        <img
          src={isUrl(thumbnail) ? thumbnail : BE_URL + "/" + thumbnail}
          alt={title}
        />
      </Link>
      <div className="profile-course">
        <h4 className="name-course truncate">
          <Link to={routesWithParams.learning(slug)}>{title}</Link>
        </h4>
        <Link
          to={routesWithParams.instructor_bio(author.slug)}
          className="author "
        >
          {author.fullname}
        </Link>
        {count_progress === 0.0 ? (
          <div className="course-footer">
            <Link to={routesWithParams.learning(slug)}>Bắt đầu học</Link>
          </div>
        ) : (
          <div className="course-footer">
            <div className="progress-wrapper">
              {/* <div
                data-progress="{{ $course->count_progress }}"
                className="progress"
              ></div> */}
              <Progress
                percent={count_progress * 100}
                size="small"
                showInfo={false}
              />

              <div className="progress-info">
                <span className="count-progress">{count_progress * 100}%</span>
                &nbsp;
                <span>Complete</span>
              </div>
            </div>

            <div className="course-rating">
              {rating.length ? (
                <>
                  <Rating value={rating[0].rating} size="14px" />
                  <a href="javascript:void(0)">Bạn đã đánh giá</a>
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
    </div>
  );
};

export default Course;
