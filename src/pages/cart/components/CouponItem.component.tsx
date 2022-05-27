import { FC } from "react";
import { FaTimes } from "react-icons/fa";

type CouponProps = {
  code: string;
};
const CouponItem: FC<CouponProps> = ({ code }) => {
  return (
    <div className="coupon-item d-flex align-items-center">
      <button type="button" className="remove-coupon d-flex align-items-center">
        <FaTimes />
      </button>
      <span className="coupon-code">
        <b>{code}</b>&nbsp;đã được áp dụng
      </span>
    </div>
  );
};
export default CouponItem;
