import { useRef } from "react";
import { Link } from "react-router-dom";
import CouponApi from "../../../api/coupon.api";
import { useTypedSelector } from "../../../hooks/redux.hooks";
import { ROUTES } from "../../../utils/constants";
import CouponItem from "./CouponItem.component";

const CheckoutPane = () => {
  const { cart } = useTypedSelector((state) => state.cart);

  const originalPrice = cart.original_price;
  const currentPrice = cart.current_price;

  const originalPriceRemovedDot = parseInt(originalPrice.replace(/\./g, ""));
  const currentPriceRemovedDot = parseInt(currentPrice.replace(/\./g, ""));

  const refCoupon = useRef<HTMLInputElement>(null);

  const coupons = cart.courses
    .map((course) => {
      return course.coupon_code;
    })
    .filter((value) => value);
  console.log(coupons);

  function applyCoupon() {
    const coursesId = cart.courses.map((course) => course.id);

    const code = refCoupon.current?.value;
    if (code && code.trim()) {
      CouponApi.applyCouponWithCourses(code, coursesId).then((res) => {
        console.log(res);
      });
    }
  }

  return (
    <div className="checkout">
      <div className="checkout-box-total">
        <div className="total-label">Tổng cộng:</div>

        {originalPriceRemovedDot > currentPriceRemovedDot ? (
          <>
            <div className="total-price">
              <span className="price">{currentPrice} VNĐ</span>
            </div>
            <div className="old-price mb-2">
              <span className="price">{originalPrice} VNĐ</span>
            </div>
          </>
        ) : (
          <div className="total-price mb-2">
            <span className="price">{originalPrice} VNĐ</span>
          </div>
        )}

        <Link to={ROUTES.CHECKOUT}>
          <div className="btn-checkout">Thanh toán</div>
        </Link>
        <div className="promotions">
          <label>Mã giảm giá</label>

          {coupons.map((coupon) => (
            <CouponItem code={coupon as string} />
          ))}

          <div className="form-group has-error">
            <div className="input-group">
              <input
                placeholder=""
                type="text"
                id="coupon-input"
                className="form-control"
                ref={refCoupon}
              />
              <button
                onClick={applyCoupon}
                type="button"
                className="btn btn-apply-coupon"
              >
                Áp dụng
              </button>
            </div>
            <span className="help-block"></span>
          </div>
        </div>
        <div className="payment-method"></div>
        <div id="paypal-button-container"></div>
      </div>
    </div>
  );
};

export default CheckoutPane;
