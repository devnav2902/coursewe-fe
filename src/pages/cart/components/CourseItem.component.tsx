import { Tooltip } from "antd";
import { FC } from "react";
import { BsFillTagFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import Rating from "../../../components/Rating/Rating.component";
import { useAppDispatch } from "../../../hooks/redux.hooks";
import {
  moveToCart,
  moveToSavedForLater,
  removeItem,
} from "../../../redux/slices/cart.slice";
import { CartType, Course } from "../../../ts/types/cart.types";
import { ROUTES } from "../../../utils/constants";
import { linkThumbnail, roundsTheNumber } from "../../../utils/functions";

type Props = {
  course: Course;
  actionType: CartType["type"];
};

const CourseItem: FC<Props> = ({ course, actionType }) => {
  const { thumbnail, author, title, slug, id, instructional_level } = course;
  const { rating_count, rating_avg_rating } = course;
  const { course_coupon, price } = course;

  const purchase_price = course_coupon?.discount_price;

  const dispatch = useAppDispatch();

  const handleRemoveItem = (id: number) => {
    dispatch(removeItem({ id, type: actionType }));
  };

  const handleMoveToSavedForLater = (id: number) => {
    dispatch(moveToSavedForLater(id));
  };
  const handleMoveToCart = (id: number) => {
    dispatch(moveToCart(id));
  };

  const Actions = () => {
    return (
      <div className="card-action">
        {actionType === "cart" ? (
          <>
            <span className="remove-btn" onClick={() => handleRemoveItem(id)}>
              Xóa
            </span>
            <span
              className="move-to-cart"
              onClick={() => handleMoveToSavedForLater(id)}
            >
              Thanh toán sau
            </span>
          </>
        ) : (
          <>
            <span className="remove-btn" onClick={() => handleRemoveItem(id)}>
              Xóa
            </span>
            <span className="move-to-cart" onClick={() => handleMoveToCart(id)}>
              Chuyển vào giỏ hàng
            </span>
          </>
        )}
      </div>
    );
  };

  return (
    <div className="course-item">
      <Link to={ROUTES.detail_course(slug)} className="">
        <div className="card-thumbnail">
          <img alt={title} src={linkThumbnail(thumbnail)} />
        </div>
        <div className="card-info">
          <div className="card-info__title">{title}</div>
          <div className="card-info__instructor">by&nbsp;{author.fullname}</div>
          <div className="card-info__rating">
            <div className="rating-content d-flex align-items-center">
              {rating_avg_rating && (
                <span>{roundsTheNumber(rating_avg_rating, 1)}</span>
              )}

              <Rating
                value={roundsTheNumber(rating_avg_rating, 1)}
                size="12px"
              />

              <span className="rating-count">({rating_count} Đánh giá)</span>
            </div>
          </div>
          <div className="card-info__basic">
            <div className="level">{instructional_level.level}</div>
          </div>
        </div>
      </Link>
      <Actions />
      <div className="card-price">
        {!course_coupon ? (
          <span className="fw-bold">{course.price.format_price} VNĐ</span>
        ) : (
          <div className="d-flex flex-column">
            <Tooltip title={course.coupon_code} color={"pink"}>
              <span className="discount">
                {purchase_price === course.price.format_price
                  ? "Miễn phí"
                  : purchase_price + " VNĐ"}{" "}
                <BsFillTagFill />
              </span>
            </Tooltip>

            <span
              className="line-through"
              style={{ color: "#6a6f73", fontWeight: "normal" }}
            >
              {course.price.format_price} VNĐ
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
export default CourseItem;
