import React from "react";
import { useLocation } from "react-router-dom";

const CheckoutPage = () => {
  const location = useLocation();
  console.log(location);
  return (
    <div className="checkout-page">
      <div className="checkout-page__container d-flex">
        <div className="checkout-page-left">
          <div className="title">Checkout</div>
          <div className="address-container">
            <label for="">Billing Address</label>
            <div className="address-select">
              <select
                data-purpose="billing-address-country"
                autocomplete="off"
                id="billingAddressCountry"
                className="form-control"
              >
                <option value="" disabled="">
                  Please select...
                </option>
                <option value="SJ">Svalbard and Jan Mayen</option>
                <option value="SZ">Swaziland</option>
                <option value="TR">Turkey</option>
                <option value="TM">Turkmenistan</option>
                <option value="TC">Turks and Caicos Islands</option>
                <option value="TV">Tuvalu</option>
                <option value="UM">U.S. Outlying Islands</option>
                <option value="VI">U.S. Virgin Islands</option>
                <option value="UG">Uganda</option>
                <option value="UA">Ukraine</option>
                <option value="AE">United Arab Emirates</option>
                <option value="GB">United Kingdom</option>
                <option value="US">United States</option>
                <option value="UY">Uruguay</option>
                <option value="UZ">Uzbekistan</option>
                <option value="VU">Vanuatu</option>
                <option value="VA">Vatican City</option>
                <option value="VE">Venezuela</option>
                <option value="VN">Vietnam</option>
              </select>
            </div>
            <div className="checkout-selection">
              <div className="radio">
                <div className="radio-label d-flex align-items-center">
                  <input type="radio" name="payment-methods" checked />
                  <span className="label">PayPal</span>
                  <img
                    src="https://s3.amazonaws.com/growth-prototypes/pp_cc_mark_111x69.jpg"
                    alt="PayPal Icon"
                    className=""
                    width="74"
                    height="20"
                  />
                </div>
              </div>
            </div>
            <div className="order-details">
              <div className="title">Danh sách khóa học:</div>
              <div className="shopping-list">
                <div className="shopping-list__item">
                  <div className="course d-flex">
                    <img
                      src="https://img-c.udemycdn.com/course/100x100/1247828_32bb.jpg"
                      alt=""
                    />
                    <div className="card-title">
                      The Complete Angular Course: Beginner to Advanced
                    </div>
                    <div className="card-price">
                      <div className="discount-price">$129</div>
                      <div className="line-through original-price">$135</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="checkout-page-right">
          <div className="title">Summary</div>

          <div className="checkout-page-right__price">
            <div className="original-price d-flex align-items-center">
              <div className="title">Giá bán</div>
              <div className="price">$39.87</div>
            </div>
            <div className="discount-price d-flex align-items-center">
              <div className="title">Áp dụng mã giảm giá</div>
              <div className="price">-$39.87</div>
            </div>
            <div className="total d-flex align-items-center">
              <div className="title">Tổng cộng</div>
              <div className="price">$19.99</div>
            </div>
          </div>

          <button className="complete-payment">Thanh toán</button>
        </div>
      </div>
    </div>
  );
};
export default CheckoutPage;
