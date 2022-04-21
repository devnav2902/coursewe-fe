import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ROUTES } from "../../../utils/constants";
import CartEmpty from "../components/CartEmpty.component";
import CouponItem from "../components/CouponItem.component";
import CourseItem from "../components/CourseItem.component";

const CartPage = () => {
  const shoppingCart = useSelector((state) => state.cart);

  const countCart = shoppingCart.cart.length;
  const countSavedForLater = shoppingCart.saved_for_later.length;
  console.log(shoppingCart);
  const total = 20;

  return (
    <div className="shopping-cart-section">
      <div className="header-bar">
        <h1 className="shopping-cart-title">Giỏ hàng</h1>
      </div>

      {!countCart ? (
        <>
          <CartEmpty />
          {!countSavedForLater ? null : (
            <div className="shopping-list s4L">
              <div className="shopping-list__title">Saved for later</div>
              <div className="shopping-list__course" id="saved_for_later">
                {shoppingCart.saved_for_later.map((courseItem) => (
                  <CourseItem
                    key={courseItem.id}
                    course={courseItem}
                    actionType="saved_for_later"
                  />
                ))}
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="shopping-container">
          <div className="shopping-container__left">
            <div className="shopping-list">
              <div className="shopping-list__title">
                <span className="count">{countCart}</span> Khóa học trong giỏ
                hàng
              </div>
              <div className="shopping-list__course" id="cart">
                {shoppingCart.cart.map((courseItem) => (
                  <CourseItem
                    key={courseItem.id}
                    course={courseItem}
                    actionType="cart"
                  />
                ))}
              </div>
            </div>

            {!countSavedForLater ? null : (
              <div className="shopping-list s4L">
                <div className="shopping-list__title">
                  Danh sách thanh toán sau
                </div>
                <div className="shopping-list__course" id="saved_for_later">
                  {shoppingCart.saved_for_later.map((courseItem) => (
                    <CourseItem
                      key={courseItem.id}
                      course={courseItem}
                      actionType="saved_for_later"
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="shopping-container__right">
            <div className="checkout">
              <div className="checkout-box-total">
                <div className="total-label">Tổng cộng:</div>
                <div className="total-price">
                  $<span className="price">${total}</span>
                </div>
                <Link to={ROUTES.CHECKOUT}>
                  <div className="btn-checkout">Checkout</div>
                </Link>
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
                        defaultValue=""
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
      )}
    </div>
  );
};
export default CartPage;
