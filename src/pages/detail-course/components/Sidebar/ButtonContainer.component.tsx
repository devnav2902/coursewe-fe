import { FC } from "react";
import { Link } from "react-router-dom";
import { CustomCourse } from "../../../../api/course.api";
import CartButton from "../../../../components/CartButton/CartButton.component";
import { useTypedSelector } from "../../../../hooks/redux.hooks";
import { ROUTES } from "../../../../utils/constants";
import { StyledButtonBox } from "../../styles/detail-course.styles";

type Props = {
  course: CustomCourse;
  redirectToCheckout: () => void;
  dataCoupon: any;
};

const ButtonContainer: FC<Props> = ({
  course,
  redirectToCheckout,
  dataCoupon,
}) => {
  const { profile } = useTypedSelector((state) => state.user);
  const { author, price, slug } = course;

  const isInstructor = author.id === profile?.id;
  const isFreeCourse = parseInt(price.original_price) === 0;

  return (
    <StyledButtonBox className="buttons-box">
      {isInstructor ? (
        <Link to={ROUTES.learning(slug)} className="theme-btn btn-style-one">
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
