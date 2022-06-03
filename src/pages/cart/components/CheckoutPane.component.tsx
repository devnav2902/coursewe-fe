import axios from "axios";
import _ from "lodash";
import { useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import CouponApi from "../../../api/coupon.api";
import EnrollButton from "../../../components/EnrollButton/EnrollButton.component";
import { useAppDispatch, useTypedSelector } from "../../../hooks/redux.hooks";
import { getCart } from "../../../redux/slices/cart.slice";
import { ROUTES } from "../../../utils/constants";
import CouponItem from "./CouponItem.component";

const CheckoutPane = () => {
  const { cart } = useTypedSelector((state) => state.cart);

  const dispatch = useAppDispatch();

  const originalPrice = cart.original_price;
  const currentPrice = cart.current_price;

  const refCoupon = useRef<HTMLInputElement>(null);

  const [dataCoupon, setDataCoupon] = useState({
    message: "",
  });

  const arrCourseId = useMemo(
    () => cart.courses.map((course) => course.id),
    [cart.courses]
  );
  const coupons = useMemo(() => {
    const coupons = cart.courses
      .map((course) => {
        return course.coupon_code;
      })
      .filter((value) => value);

    return _.uniq(coupons);
  }, [cart.courses]);

  function applyCoupon() {
    const coursesId = cart.courses.map((course) => course.id);

    const code = refCoupon.current?.value;
    if (code && code.trim()) {
      CouponApi.applyCouponWithCourses(code, coursesId)
        .then(() => {
          dispatch(getCart());
          setDataCoupon({ message: "" });

          if (refCoupon.current) {
            refCoupon.current.value = "";
          }
        })
        .catch((error) => {
          if (axios.isAxiosError(error)) {
            setDataCoupon({ message: error.response?.data.message });
          }
        });
    }
  }

  return (
    <div className="checkout">
      <div className="checkout-box-total">
        <div className="total-label">Tổng cộng:</div>

        {parseFloat(originalPrice) === parseFloat(currentPrice) ? (
          <div className="total-price mb-2">
            <span className="price">{originalPrice} VNĐ</span>
          </div>
        ) : (
          <>
            <div className="total-price">
              <span className="price">{currentPrice} VNĐ</span>
            </div>
            <div className="old-price mb-2">
              <span className="price">{originalPrice} VNĐ</span>
            </div>
          </>
        )}

        {parseFloat(cart.current_price) === 0 ? (
          <EnrollButton
            course_id={arrCourseId}
            coupons={coupons as string[]}
            className="btn-color-default w-100 mb-2"
          />
        ) : (
          <Link to={ROUTES.CHECKOUT}>
            <div className="btn-checkout">Thanh toán</div>
          </Link>
        )}
        <div className="promotions">
          <label>Mã giảm giá</label>

          {coupons.map((coupon) => (
            <CouponItem key={coupon} code={coupon as string} />
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
            {dataCoupon.message && (
              <p
                className="warning mt-1 d-block"
                style={{ fontSize: "1.4rem", color: "#fd5050" }}
              >
                {dataCoupon.message}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPane;
