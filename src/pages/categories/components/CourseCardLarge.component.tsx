import { Col, Popover } from "antd";
import { FC } from "react";
import { BiCheck } from "react-icons/bi";
import { Link } from "react-router-dom";
import CartButton from "../../../components/CartButton/CartButton.component";
import { CustomCourse } from "../../../components/Course/Course.component";
import Rating from "../../../components/Rating/Rating.component";
import WishlistButton from "../../../components/WishlistButton/WishlistButton.component";
import { ROUTES } from "../../../utils/constants";
import { linkThumbnail, roundsTheNumber } from "../../../utils/functions";
import {
  StyledCourseCardLarge,
  StyledQuickViewBox,
} from "../styles/categories.styles";

type CourseCardLargeProps = {
  course: CustomCourse;
};

const CourseCardLarge: FC<CourseCardLargeProps> = ({ course }) => {
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
        <CartButton course={course} />
        <WishlistButton course={course} />
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
      <StyledCourseCardLarge>
        <Link to={ROUTES.detail_course(slug)}>
          <div className="image">
            <img src={linkThumbnail(thumbnail)} alt={title} />
          </div>
        </Link>
        <div className="content d-flex">
          <div className="content__left">
            <Link to={ROUTES.detail_course(slug)}>
              <h3 className="title truncate">{title}</h3>
            </Link>
            <p className="subtitle">{subtitle}</p>

            <div className="author">
              <Link to={ROUTES.instructor_bio(author.slug)}>
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
            <div className="price">
              {parseFloat(price.original_price) === 0
                ? "Miễn phí"
                : price.format_price + " VNĐ"}
            </div>
          </div>
        </div>
      </StyledCourseCardLarge>
    </Popover>
  );
};

export default CourseCardLarge;
