import { Link } from "react-router-dom";
import Rating from "../../../components/Rating/Rating.component";
import { BE_URL, routesWithParams } from "../../../utils/constants";
import { Col, Popover } from "antd";
import { HeartOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { isUrl, roundsTheNumber } from "../../../utils/functions";
import { BiCheck } from "react-icons/bi";

const StyledQuickViewBox = styled.div`
  .goal {
    font-size: 18px;
    font-weight: bold;
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

const CourseCardLarge = ({ course }) => {
  const {
    title,
    slug,
    thumbnail,
    rating_avg_rating,
    rating_count,
    subtitle,
    author,
    price,
    instructional_level,
    lecture_count,
    course_outcome,
  } = course;

  const quickViewBox = (
    <StyledQuickViewBox>
      <div className="goal">Lợi ích từ khoá học</div>
      <div className="list-items">
        {course_outcome.map((outcome) => (
          <Col key={outcome.id} className="align-items-center d-flex">
            <BiCheck className="mr-1" fontSize={18} />
            <span>{outcome.description}</span>
          </Col>
        ))}
      </div>
      <div className="quick-view-footer d-flex align-item-center">
        <button className="btn-color-default add-to-cart btn">
          Thêm vào giỏ hàng
        </button>
        <button className="toggle-wishlist">
          <HeartOutlined style={{ fontSize: "20px", color: "#000" }} />
        </button>
      </div>
    </StyledQuickViewBox>
  );

  return (
    <Popover
      getPopupContainer={(element) => element}
      placement="top"
      content={quickViewBox}
      className="popover"
    >
      <div className="course-block">
        <Link to={routesWithParams.detail_course(slug)}>
          <div className="image">
            <img
              src={isUrl(thumbnail) ? thumbnail : BE_URL + "/" + thumbnail}
              alt={title}
            />
          </div>
        </Link>
        <div className="content d-flex">
          <div className="content__left">
            <Link to={routesWithParams.detail_course(slug)}>
              <h3 className="title truncate">{title}</h3>
            </Link>
            <p className="subtitle">{subtitle}</p>

            <div className="author">
              <Link to={routesWithParams.instructor_bio(author.slug)}>
                {author.fullname}
              </Link>
            </div>

            {rating_avg_rating && (
              <div className="rating d-flex align-items-center">
                <span className="value">
                  {roundsTheNumber(rating_avg_rating, 1)}
                </span>
                <Rating value={rating_avg_rating} size={"13px"} />
                <span className="amount">({rating_count})</span>
              </div>
            )}
            <div className="course-info">
              <span className="course-info__row">
                {lecture_count} bài giảng
              </span>
              <span className="course-info__row">
                {instructional_level.level}
              </span>
            </div>
          </div>
          <div className="content__right">
            <div className="price">{price.format_price} đ</div>
          </div>
        </div>
      </div>
    </Popover>
  );
};

export default CourseCardLarge;
