import React, { useEffect, useState } from "react";
import Paypal from "../component/Paypal.component";
import QRCode from "qrcode";
import PaypalButtonContainer from "../component/PaypalButton.component";
import { usePayPalScriptReducer } from "@paypal/react-paypal-js";
import SelectCurrency from "../component/SelectCurrency.component";
import Success from "../component/Success.component";
import { useDispatch, useSelector } from "react-redux";
import PurchaseApi from "../../../api/purchase.api";

const CheckoutPage = () => {
  const dispatch = useDispatch();

  const { cart } = useSelector((state) => state.cart);
  const [src, setSrc] = useState(false);
  const [succeeded, setSucceeded] = useState(false);
  const [details, setDetails] = useState(null);

  useEffect(() => {
    QRCode.toDataURL("Coursewe.com").then(setSrc);
  }, []);
  function handleSucceeded(details) {
    setSucceeded(true);
    setDetails(details);
    if (details.status === "COMPLETED") {
    }
  }

  return (
    <Paypal>
      <div className="checkout-page">
        <div className="checkout-page__container d-flex">
          <div className="checkout-page-left">
            <div className="title">Checkout</div>
            <div className="address-container">
              <SelectCurrency />

              <div className="checkout-selection">
                <div className="radio">
                  <div className="radio-label d-flex align-items-center">
                    <input type="radio" name="payment-methods" defaultChecked />
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
                      {cart.map((course) => {
                        const {
                          thumbnail,
                          title,
                          id,
                          price: { format_price },
                        } = course;
                        // console.log(course);
                        return (
                          <div key={id} className="list-courses">
                            <img src={thumbnail} alt="" />
                            <div className="card-title">{title}</div>
                            <div className="card-price">
                              <div className="discount-price">$129</div>
                              <div className="line-through original-price">
                                {format_price + " "}VND
                              </div>
                            </div>
                          </div>
                        );
                      })}
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

            <PaypalButtonContainer handleSucceeded={handleSucceeded} />
            <div>
              <img src={src} style={{ width: "100%" }} alt="" srcset="" />
            </div>
          </div>
        </div>
      </div>
      {succeeded ? <Success details={details} /> : null}
    </Paypal>
  );
};
export default CheckoutPage;
