import { Spin } from "antd";
import { FC, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useTypedSelector } from "../../../../hooks/redux.hooks";
import { CustomCourse } from "../../page/detail-course.page";
import {
  StyledBtnItem,
  StyledCouponItem,
  StyledCouponWrapper,
} from "../../styles/detail-course.styles";
import { CouponProps } from "./Sidebar.component";

type Props = {
  course: CustomCourse;
  couponProps: CouponProps;
};

const CouponAndGift: FC<Props> = ({ course, couponProps }) => {
  const { dataCoupon, applyCoupon, setDataCoupon, refInput, setSearchParams } =
    couponProps;
  const {
    author: { id },
  } = course;

  const { profile } = useTypedSelector((state) => state.user);
  const isFreeCourse = parseInt(course.price.original_price) === 0;
  const isInstructor = id === profile?.id;

  const [displayCouponInput, setDisplayCouponInput] = useState(false);

  function removeMessage() {
    dataCoupon.message && setDataCoupon((state) => ({ ...state, message: "" }));
  }

  function removeCoupon() {
    setDataCoupon((state) => ({
      ...state,
      message: "",
      coupon: null,
      saleOff: 0,
      isFreeCoupon: false,
    }));
    setSearchParams("");
  }

  const CouponItem = () => {
    return (
      <StyledCouponItem className="coupon-code d-flex align-items-center mb-1">
        <span className="cursor-pointer" onClick={removeCoupon}>
          <FaTimes />
        </span>
        <div>
          <b>{dataCoupon.coupon?.code}</b> đã được áp dụng
        </div>
      </StyledCouponItem>
    );
  };

  return isFreeCourse || isInstructor ? null : (
    <div className="pd-l-2 pd-r-2 pd-b-2">
      <div className="justify-content-center d-flex mb-1">
        <StyledBtnItem>
          <div
            onClick={() => setDisplayCouponInput(true)}
            className="coupon fw-bold cursor-pointer"
          >
            Mã giảm giá
          </div>
        </StyledBtnItem>
      </div>

      {dataCoupon.coupon && <CouponItem />}

      {displayCouponInput && (
        <StyledCouponWrapper>
          <input
            onChange={removeMessage}
            ref={refInput}
            placeholder="Nhập mã giảm giá"
            type="text"
          />
          <button
            className="d-flex align-items-center justify-content-center"
            onClick={applyCoupon}
            id="apply"
            disabled={dataCoupon.checkingInput ? true : false}
          >
            {dataCoupon.checkingInput ? <Spin /> : "Áp dụng"}
          </button>
        </StyledCouponWrapper>
      )}

      {dataCoupon.message && (
        <p
          className="warning mt-1"
          style={{ fontSize: "1.4rem", color: "#fd5050" }}
        >
          {dataCoupon.message}
        </p>
      )}
    </div>
  );
};

export default CouponAndGift;
