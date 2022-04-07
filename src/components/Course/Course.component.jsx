import { Link } from "react-router-dom";
import Rating from "../Rating/Rating.component";
import { routesWithParams } from "../../utils/constants";
import { Popover } from "antd";
import { HeartOutlined } from "@ant-design/icons";
import styled from "styled-components";

const StyledQuickViewBox = styled.div`
  .title {
    font-size: 22px;
    font-weight: bold;
  }
  .level {
    color: #6a6f73;
    font-size: 14px;
    padding-bottom: 10px;
  }
  .desc {
    padding-bottom: 10px;
  }
  .list-items {
    padding-bottom: 15px;
  }
  .desc,
  .list-items {
    width: 340px;
    line-height: 1.4;
    font-size: 14px;
  }
  .btn {
    font-weight: bold;
    font-size: 16px;
  }
  .toggle-wishlist {
    width: 5rem;
    height: 5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 0.8rem;
    border-radius: 50%;
    border: 1px solid #000;
    flex-shrink: 0;

    &:hover {
      background-color: #e9e7e7;
    }
  }
`;

const StyledCourse = styled.div`
  .course {
    position: relative;
  }
  .course:hover {
    .image-course {
      &::before {
        background-color: rgba(63, 60, 60, 0.267);
      }
    }
  }

  .image-course {
    display: block;
    overflow: hidden;
    aspect-ratio: 16/9;
    position: relative;
    &::before {
      position: absolute;
      transition: 0.2s all;
      top: 0;
      left: 0;
      content: "";
      background-color: transparent;
      width: 100%;
      height: 100%;
    }
    img {
      height: 100%;
      object-fit: cover;
      width: 100%;
    }
  }

  .date {
    padding-top: 10px;
    color: var(--color-muted);
  }
  .name-course {
    padding: 10px 0 0;
    a {
      font-size: 1.6rem;
      font-weight: 700;
      color: #000;
      &:hover {
        color: rgb(63, 60, 60);
      }
    }
  }
  .course-info {
    padding-top: 5px;
  }
  .rating {
    margin-bottom: 0.6rem;
    color: #b4690e;
    .avg-rating {
      vertical-align: middle;
      font-weight: 700;
      font-size: 1.4rem;
      margin-right: 5px;
    }
    .count {
      margin-left: 5px;
      vertical-align: middle;
      font-size: 1.4rem;
      color: rgb(83, 82, 82);
    }
  }
  .price {
    font-size: 1.8rem;
  }
  .author {
    font-size: 1.3rem;
    color: var(--color-muted);
    text-decoration: underline;
  }
`;

const Course = ({ course }) => {
  const { title, slug, thumbnail, rating_avg_rating, rating_count } = course;

  const quickViewBox = (
    <StyledQuickViewBox>
      <div className="title">{title}</div>
      <div className="level">Beginner Level</div>
      <div className="desc">
        Learn how to use SELECT, FROM, WHERE, GROUP BY, HAVING and ORDER in SQL
        Server. Create views+procedures. Export in Excel
      </div>
      <div className="list-items">
        <li>Build your own SQL Server SELECT statements.</li>
        <li>Build your own SQL Server SELECT statements.</li>
        <li>Build your own SQL Server SELECT statements.</li>
        <li>Build your own SQL Server SELECT statements.</li>
      </div>
      <div className="quick-view-footer d-flex align-item-center">
        <button className="btn btn-color-default">Thêm vào giỏ hàng</button>
        <button className="toggle-wishlist">
          <HeartOutlined style={{ fontSize: "20px", color: "#000" }} />
        </button>
      </div>
    </StyledQuickViewBox>
  );

  return (
    <Popover
      className="popover"
      placement="right"
      getPopupContainer={(element) => element}
      content={quickViewBox}
    >
      <StyledCourse>
        <div className="course">
          <Link to="/" className="image-course">
            <img src={thumbnail} alt={title} />
          </Link>
          <div className="profile-course">
            <div className="name-course truncate">
              <Link to={routesWithParams.detail_course(slug)}>{title}</Link>
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
                  <Rating
                    size="12px"
                    value={rating_avg_rating}
                    disabled={true}
                  />
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
      </StyledCourse>
    </Popover>
  );
};
export default Course;
