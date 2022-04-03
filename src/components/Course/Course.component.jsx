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
    </Popover>
  );
};
export default Course;
