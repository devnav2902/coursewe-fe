import { FC } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { CustomCourse } from "../../../../api/course.api";
import CartButton from "../../../../components/CartButton/CartButton.component";
import { useTypedSelector } from "../../../../hooks/redux.hooks";
import { ROUTES } from "../../../../utils/constants";
import { StyledButtonBox } from "../../styles/detail-course.styles";

type Props = {
  course: CustomCourse;
  dataCoupon: any;
};

const ButtonContainer: FC<Props> = ({ course, dataCoupon }) => {
  const { profile } = useTypedSelector((state) => state.user);
  const { author, price, id } = course;

  const isInstructor = author.id === profile?.id;
  const isFreeCourse = parseInt(price.original_price) === 0;

  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  function redirectToCheckout() {
    const couponCode = searchParams.get("couponCode");

    const params = !couponCode
      ? `?course=${id}`
      : `?couponCode=${couponCode}&course=${id}`;
    navigate(ROUTES.CHECKOUT + params, { state: dataCoupon });
  }

  return (
    <StyledButtonBox className="buttons-box">
      {isInstructor ? (
        <Link
          to={ROUTES.course_dash_redirect(id)}
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
