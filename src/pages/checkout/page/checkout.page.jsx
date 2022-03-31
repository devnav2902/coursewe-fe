import React from "react";

const CheckoutPage = () => {
  return (
    <div class="checkout-page">
      <div class="checkout-page__container d-flex">
        <div class="checkout-page-left">
          <div class="title">Checkout</div>
          <div class="address-container">
            <label for="">Billing Address</label>
            <div class="address-select">
              <select
                data-purpose="billing-address-country"
                autocomplete="off"
                id="billingAddressCountry"
                class="form-control"
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
            <div class="checkout-selection">
              <div class="radio">
                <div class="radio-label d-flex align-items-center">
                  <input type="radio" name="payment-methods" checked />
                  <span class="label">PayPal</span>
                  <img
                    src="https://s3.amazonaws.com/growth-prototypes/pp_cc_mark_111x69.jpg"
                    alt="PayPal Icon"
                    class=""
                    width="74"
                    height="20"
                  />
                </div>
              </div>
            </div>
            <div class="order-details">
              <div class="title">Danh sách khóa học:</div>
              <div class="shopping-list">
                <div class="shopping-list__item">
                  <div class="course d-flex">
                    <img
                      src="https://img-c.udemycdn.com/course/100x100/1247828_32bb.jpg"
                      alt=""
                    />
                    <div class="card-title">
                      The Complete Angular Course: Beginner to Advanced
                    </div>
                    <div class="card-price">
                      <div class="discount-price">$129</div>
                      <div class="line-through original-price">$135</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="checkout-page-right">
          <div class="title">Summary</div>

          <div class="checkout-page-right__price">
            <div class="original-price d-flex align-items-center">
              <div class="title">Giá bán</div>
              <div class="price">$39.87</div>
            </div>
            <div class="discount-price d-flex align-items-center">
              <div class="title">Áp dụng mã giảm giá</div>
              <div class="price">-$39.87</div>
            </div>
            <div class="total d-flex align-items-center">
              <div class="title">Tổng cộng</div>
              <div class="price">$19.99</div>
            </div>
          </div>

          <button class="complete-payment">Thanh toán</button>
        </div>
      </div>
    </div>
  );
};
export default CheckoutPage;
