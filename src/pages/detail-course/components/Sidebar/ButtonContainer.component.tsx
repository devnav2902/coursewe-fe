import { Spin } from "antd";
import axios from "axios";
import { FC, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { CustomCourse } from "../../../../api/course.api";
import FreeEnrollApi, { Enroll } from "../../../../api/free-enroll.api";
import CartButton from "../../../../components/CartButton/CartButton.component";
import { useTypedSelector } from "../../../../hooks/redux.hooks";
import { ROUTES } from "../../../../utils/constants";
import { openNotification } from "../../../../utils/functions";
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

  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const [enrollLoading, setEnrollLoading] = useState(false);

  function redirectToCheckout() {
    const couponCode = searchParams.get("couponCode");

    const params = !couponCode
      ? `?course=${id}`
      : `?couponCode=${couponCode}&course=${id}`;
    navigate(ROUTES.CHECKOUT + params, { state: dataCoupon });
  }

  function handleEnroll() {
    let data: Enroll = { course_id: id };

    if (dataCoupon.coupon) {
      const { code, coupon_id } = dataCoupon.coupon;

      data.code = code;
      data.coupon = coupon_id;
    }

    if (!user) navigate(ROUTES.SIGN_IN);
    else {
      setEnrollLoading(true);

      FreeEnrollApi.enroll(data)
        .then(() => {
          navigate(ROUTES.learning({ course_slug: slug }));
        })
        .catch((error) => {
          setEnrollLoading(false);

          if (axios.isAxiosError(error)) {
            openNotification(
              "error",
              error.response?.data?.message ??
                "Đăng kí tham gia khóa học không thành công!"
            );
          } else {
            openNotification(
              "error",
              "Lỗi trong quá trình đăng kí tham giá khóa học!"
            );
          }
        });
    }
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
        <button className="enroll" id="enroll" onClick={handleEnroll}>
          {!enrollLoading ? (
            "Tham gia khóa học"
          ) : (
            <div className="align-items-center d-flex justify-content-center">
              <Spin />
            </div>
          )}
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
