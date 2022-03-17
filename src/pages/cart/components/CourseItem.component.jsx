import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Rating from "../../../components/Rating/Rating.component";
import {
  moveToCart,
  moveToSavedForLater,
  removeFromCart,
  removeFromSavedForLater,
} from "../../../redux/actions/cart.actions";
import { BE_URL, routesWithParams } from "../../../utils/constants";
import { isUrl } from "../../../utils/functions";

const CourseItem = ({ course, actionType }) => {
  const { thumbnail, author, title, slug, id, rating_avg_rating } = course;
  const dispatch = useDispatch();

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
  };
  const handleRemoveFromSavedForLater = (id) => {
    dispatch(removeFromSavedForLater(id));
  };
  const handleMoveToSavedForLater = (id) => {
    dispatch(moveToSavedForLater(id));
  };
  const handleMoveToCart = (id) => {
    dispatch(moveToCart(id));
  };

  const Actions = () => {
    return (
      <div className="card-action">
        {actionType === "cart" ? (
          <>
            <span
              className="remove-btn"
              onClick={() => handleRemoveFromCart(id)}
            >
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
            <span
              className="remove-btn"
              onClick={() => handleRemoveFromSavedForLater(id)}
            >
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
      <Link to={routesWithParams.detail_course(slug)} className="">
        <div className="card-thumbnail">
          <img
            alt={title}
            src={isUrl(thumbnail) ? thumbnail : BE_URL + "/" + thumbnail}
          />
        </div>
        <div className="card-info">
          <div className="card-info__title">{title}</div>
          <div className="card-info__instructor">by&nbsp;{author.fullname}</div>
          <div className="card-info__rating">
            <Rating value={rating_avg_rating} size="14px" />
          </div>
        </div>
      </Link>
      <Actions />
      <div className="card-price">
        {/* ${
                  discount === "Free"
                    ? `<span title="${coupon.code}" className='discount d-flex align-items-center'>Free<i className='fas fa-tag'></i>
                        </span>`
                    : discount
                    ? `<span title="${coupon.code}" className='discount d-flex align-items-center'>$<span>${discount}</span>
                            <i className="fas fa-tag"></i>
                        </span>`
                    : ""
                } */}

        {/* <span className="${
                  discount ? "original-price line-through" : ""
                }">$<span>${price.price}</span></span> */}
      </div>
    </div>
  );
};
export default CourseItem;
