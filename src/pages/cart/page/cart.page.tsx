import { useRef } from "react";
import { Link } from "react-router-dom";
import CouponApi from "../../../api/coupon.api";
import { useTypedSelector } from "../../../hooks/redux.hooks";
import { ROUTES } from "../../../utils/constants";
import CartContainer from "../components/CartContainer.component";
import CartEmpty from "../components/CartEmpty.component";
import CouponItem from "../components/CouponItem.component";
import SavedForLaterContainer from "../components/SavedForLaterContainer.component";

const CartPage = () => {
  const shoppingCart = useTypedSelector((state) => state.cart);

  const countCart = shoppingCart.cart.length;
  const countSavedForLater = shoppingCart.saved_for_later.length;

  const total = shoppingCart.cart
    .reduce((total, current) => {
      return (total += parseFloat(current.price.original_price));
    }, 0)
    .toLocaleString("vi-VN");

  const refCoupon = useRef<HTMLInputElement>(document.createElement("input"));

  function applyCoupon() {
    const coursesId = shoppingCart.cart.map((course) => course.id);

    const code = refCoupon.current.value;
    if (code.trim()) {
      CouponApi.applyCouponWithCourses(code, coursesId).then((res) => {
        console.log(res);
      });
    }
  }

  return (
    <div className="shopping-cart-section">
      <div className="header-bar">
        <h1 className="shopping-cart-title">Giỏ hàng</h1>
      </div>

      {!countCart ? (
        <>
          <CartEmpty />
          {countSavedForLater > 0 && (
            <SavedForLaterContainer shoppingCart={shoppingCart} />
          )}
        </>
      ) : (
        <div className="shopping-container">
          <div className="shopping-container__left">
            <CartContainer countCart={countCart} shoppingCart={shoppingCart} />

            {countSavedForLater > 0 && (
              <SavedForLaterContainer shoppingCart={shoppingCart} />
            )}
          </div>
          <div className="shopping-container__right">
            <div className="checkout">
              <div className="checkout-box-total">
                <div className="total-label">Tổng cộng:</div>
                <div className="total-price">
                  <span className="price">{total} đ</span>
                </div>
                <Link to={ROUTES.CHECKOUT}>
                  <div className="btn-checkout">Thanh toán</div>
                </Link>
                <div className="promotions">
                  <label>Mã giảm giá</label>

                  <CouponItem />

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
          </div>
        </div>
      )}
    </div>
  );
};
export default CartPage;
