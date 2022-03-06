import React from "react";

const CouponItem = () => {
  return (
    <div className="coupon-item">
      <button type="button" data-coupon="${code}" className="btn remove-coupon">
        <i className="fas fa-times"></i>
      </button>
      <span className="coupon-code">
        <b>$code</b>&nbsp;đã được áp dụng
      </span>
    </div>
  );
};
export default CouponItem;
