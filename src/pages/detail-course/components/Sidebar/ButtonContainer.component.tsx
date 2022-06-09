import { FC } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { CustomCourse } from "../../../../api/course.api";
import CartButton from "../../../../components/CartButton/CartButton.component";
import EnrollButton from "../../../../components/EnrollButton/EnrollButton.component";
import { useTypedSelector } from "../../../../hooks/redux.hooks";
import { ROUTES } from "../../../../utils/constants";
import { StyledButtonBox } from "../../styles/detail-course.styles";
import { DataCoupon } from "./Sidebar.component";

type Props = {
  course: CustomCourse;
  dataCoupon: DataCoupon;
};

const ButtonContainer: FC<Props> = ({ course, dataCoupon }) => {
  const { profile: user } = useTypedSelector((state) => state.user);
  const { author, price, id, slug } = course;

  const isInstructor = author.id === user?.id;
  const isFreeCourse = parseInt(price.original_price) === 0;

  const arrCouponCode: string[] | undefined = dataCoupon.coupon
    ? [dataCoupon.coupon.code]
    : undefined;

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
          to={ROUTES.learning({ course_slug: slug })}
          className="theme-btn btn-style-one"
        >
          Xem khóa học
        </Link>
      ) : isFreeCourse || dataCoupon.isFreeCoupon ? (
        <EnrollButton
          course_slug={slug}
          className="w-100"
          course_id={[id]}
          coupons={arrCouponCode}
        />
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
