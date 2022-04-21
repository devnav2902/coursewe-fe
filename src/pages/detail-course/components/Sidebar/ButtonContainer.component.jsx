import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartButton from "../../../../components/CartButton/CartButton.component";
import { routesWithParams } from "../../../../utils/constants";
import { StyledButtonBox } from "../../styles/detail-course.styles";

const ButtonContainer = ({ course, redirectToCheckout, dataCoupon }) => {
  const { profile } = useSelector((state) => state.user);
  const { author, price, slug } = course;

  const isInstructor = author.id === profile?.id;
  const isFreeCourse = parseInt(price.original_price) === 0;

  return (
    <StyledButtonBox className="buttons-box">
      {isInstructor ? (
        <Link
          to={routesWithParams.learning(slug)}
          className="theme-btn btn-style-one"
        >
          Xem khóa học
        </Link>
      ) : isFreeCourse || dataCoupon.isFreeCoupon ? (
        <button className="enroll" id="enroll">
          Tham gia khóa học
        </button>
      ) : (
        <>
          <div className="d-flex align-items-center btn-wrapper">
            <CartButton course={course} />
            {/* <WishlistButton course={course} /> */}
          </div>
          <button type="button" onClick={redirectToCheckout} className="buy">
            Mua ngay
          </button>
        </>
      )}
    </StyledButtonBox>
  );
};

export default ButtonContainer;
