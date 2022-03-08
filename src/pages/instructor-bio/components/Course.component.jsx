import React from "react";
import { Link } from "react-router-dom";
import Rating from "../../../components/Rating/Rating.component";

const Course = ({ course }) => {
  const { title, slug, thumbnail, rating_avg_rating, rating_count } = course;

  return (
    <div className="course">
      <Link to="/" className="image-course">
        <img src={thumbnail} alt={title} />
      </Link>
      <div className="profile-course">
        <div className="name-course truncate">
          <Link to="/">{title}</Link>
        </div>
        {/* <Link
          to="{{ route('instructor', ['slug' => $course->author->slug]) }}"
          className="author"
        >
          { $course->author->fullname }
        </Link> */}
        <div className="course-info">
          {rating_avg_rating && (
            <div className="rating">
              <span className="avg-rating">
                {parseFloat(rating_avg_rating).toFixed(1)}
              </span>
              <Rating size="12px" value={rating_avg_rating} disabled={true} />
              {/* @if (!empty($course->rating_count)) */}
              <span className="count">({rating_count})</span>
              {/* @endif */}
            </div>
          )}

          <h4 className="price ">
            {/* @if ($course->price->price == 0.0)
          Free
        @else
          ${{ $course->price->price }}
        @endif */}
          </h4>
        </div>
      </div>
    </div>
  );
};
export default Course;
