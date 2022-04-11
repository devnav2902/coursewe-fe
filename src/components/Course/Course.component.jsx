import { Link } from "react-router-dom";
import Rating from "../Rating/Rating.component";
import { routesWithParams } from "../../utils/constants";
import { Col, Popover } from "antd";
import { HeartOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { roundsTheNumber } from "../../utils/functions";
import { BiCheck } from "react-icons/bi";

const StyledQuickViewBox = styled.div`
  max-width: 340px;
  width: 100%;
  .title {
    font-size: 22px;
    font-weight: bold;
    color: #1c1d1f;
    line-height: 1;
    margin-bottom: 1rem;
    display: block;
    &:hover {
      color: #401b9c;
    }
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
    border-radius: 5px;
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
  /* .course-info {
    padding-top: 5px;
  } */
  .rating {
    /* margin-bottom: 0.6rem; */
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
    font-size: 1.6rem;
  }
  .author {
    font-size: 1.3rem;
    color: var(--color-muted);
  }
`;

const Course = ({ course }) => {
  const {
    title,
    slug,
    thumbnail,
    rating_avg_rating,
    rating_count,
    author,
    price,
    instructional_level,
    subtitle,
    course_outcome,
  } = course;
  // console.log(course);
  const quickViewBox = (
    <StyledQuickViewBox>
      <Link to={routesWithParams.detail_course(slug)} className="title">
        {title}
      </Link>
      <div className="level">{instructional_level.level}</div>
      <div className="desc">{subtitle}</div>
      <div className="list-items">
        {course_outcome.map((outcome) => (
          <Col key={outcome.id} className="align-items-center d-flex">
            <BiCheck className="mr-1" fontSize={18} />
            <span>{outcome.description}</span>
          </Col>
        ))}
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
            <Link
              to={routesWithParams.instructor_bio(author.slug)}
              className="author"
            >
              {author.fullname}
            </Link>
            <div className="course-info">
              {rating_avg_rating && (
                <div className="rating">
                  <span className="avg-rating">
                    {roundsTheNumber(rating_avg_rating, 1)}
                  </span>
                  <Rating
                    size="12px"
                    value={rating_avg_rating}
                    disabled={true}
                  />

                  <span className="count">({rating_count})</span>
                </div>
              )}

              <h4 className="price">
                {parseInt(price.original_price) === 0
                  ? "Miễn phí"
                  : `${price.format_price} đ`}
              </h4>
            </div>
          </div>
        </div>
      </StyledCourse>
    </Popover>
  );
};
export default Course;
