import React from "react";
import CartEmpty from "../components/CartEmpty.component";
import CouponItem from "../components/CouponItem.component";
import CourseItem from "../components/CourseItem.component";

const CartPage = () => {
  const count = 10;

  const total = 20;
  return (
    <div className="shopping-cart-section">
      <div className="header-bar">
        <h1 className="shopping-cart-title">Shopping Cart</h1>
      </div>

      <CartEmpty />

      <div className="shopping-container">
        <div className="shopping-container__left">
          <div className="shopping-list">
            <div className="shopping-list__title">
              <span className="count">{count}</span> Khóa học trong giỏ hàng
            </div>
            <div className="shopping-list__course" id="cart">
              <CourseItem />
            </div>
          </div>
          {/* ${renderCoursesS4L ? renderS4L(renderCoursesS4L) : ""} */}
          <div className="shopping-list s4L">
            <div className="shopping-list__title">Saved for later</div>
            <div className="shopping-list__course" id="saved_for_later">
              <CourseItem />
            </div>
          </div>
        </div>
        <div className="shopping-container__right">
          <div className="checkout">
            <div className="checkout-box-total">
              <div className="total-label">Tổng cộng:</div>
              <div className="total-price">
                $<span className="price">${total}</span>
              </div>
              <div className="btn-checkout">Checkout</div>
              <div className="promotions">
                <label>Promotions</label>

                <CouponItem />

                <div className="form-group has-error">
                  <div className="input-group">
                    <input
                      placeholder=""
                      type="text"
                      id="coupon-input"
                      className="form-control"
                      value=""
                    />
                    <button type="button" className="btn btn-apply-coupon">
                      Apply
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
    </div>
  );
};
export default CartPage;
