import { useState, useEffect } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import CourseApi, { CustomCourse } from "../../../api/course.api";
import PurchaseApi, { PurchaseData } from "../../../api/purchase.api";
import { useAppDispatch, useTypedSelector } from "../../../hooks/redux.hooks";
import { getCart } from "../../../redux/slices/cart.slice";
import { ROUTES } from "../../../utils/constants";
import { linkThumbnail } from "../../../utils/functions";
import PaypalButtonContainer from "../components/PaypalButton.component";
import SelectCurrency from "../components/SelectCurrency.component";
import Success from "../components/Success.component";
import { DataCoupon } from "../../detail-course/components/Sidebar/Sidebar.component";
import { usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { localeWithCurrency } from "../utils/method";
import _ from "lodash";

export type CourseData = {
  loaded: boolean;
  data: CustomCourse | null;
};

export type AmountData = { value: string; loaded: boolean };

export type CouponState = { state: null | DataCoupon };

const CheckoutPage = () => {
  const [{ options }] = usePayPalScriptReducer();

  const { cart, loadedCart } = useTypedSelector((state) => state.cart);

  const [amountData, setAmountData] = useState<AmountData>({
    value: "1",
    loaded: false,
  });
  const [details, setDetails] = useState(null);
  const [courseData, setCourseData] = useState<CourseData>({
    loaded: false,
    data: null,
  });

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const { state } = useLocation() as unknown as CouponState;

  const courseId = searchParams.get("course");

  const userLoaded = useTypedSelector((state) => state.user.loaded);

  useEffect(() => {
    if (!courseId) {
      if (userLoaded && !loadedCart) dispatch(getCart());
    } else {
      CourseApi.getCourseById(courseId)
        .then(({ data }) => {
          setCourseData({ data, loaded: true });
        })
        .catch(() => {
          navigate(ROUTES.NOT_FOUND);
        });
    }
  }, [userLoaded, dispatch, courseId, loadedCart, navigate]);

  useEffect(() => {
    if (loadedCart && cart.courses.length < 1 && !courseId)
      navigate(ROUTES.CART);
  }, [loadedCart, cart.courses.length, courseId, navigate]);

  function handleSucceeded(details: any) {
    setDetails(details);

    let data: PurchaseData = { course_id: [], coupon_code: [] };

    if (courseData.data) {
      data.course_id = [courseData.data.id];
      state?.coupon?.code && (data.coupon_code = [state.coupon.code]);
    } else if (cart.courses.length) {
      data.course_id = cart.courses.map((course) => course.id);

      let coupons = cart.courses
        .map((course) => {
          return course.coupon_code;
        })
        .filter((value) => value);

      coupons = _.uniq(coupons);

      data.coupon_code = coupons as string[];
    }

    if (details.status === "COMPLETED") {
      PurchaseApi.purchase(data).then((res) => console.log(res));
    }
  }

  const appliedCoupon = (function () {
    if (courseData.data) {
      if (state?.discount) {
        return parseFloat(state.discount) === 0
          ? "Miễn phí"
          : `- ${state.coupon?.discount_price} VNĐ`;
      }
    }

    // From cart
    if (parseFloat(cart.discount) !== 0) return `- ${cart.discount} VNĐ`;
    return "Không có";
  })();

  const total = (function () {
    if (!courseData.data) return cart.current_price + " VNĐ";

    // 1 khóa học (Click vào button mua ngay)
    if (state?.coupon) return state.coupon.discount_price + " VNĐ";
    return courseData.data.price.format_price + " VNĐ";
  })();

  return (
    <>
      <div className="checkout-page">
        <div className="checkout-page__container d-flex">
          <div className="checkout-page-left">
            <div className="title">Thanh toán khóa học</div>
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
                    <div className="courses">
                      {courseData.data && (
                        <div className="course">
                          <img
                            src={linkThumbnail(courseData.data.thumbnail)}
                            alt={courseData.data.title}
                          />
                          <div className="card-title">
                            {courseData.data.title}
                          </div>
                          <div className="card-price">
                            {state?.coupon?.discount_price && (
                              <div className="discount-price">
                                {state.isFreeCoupon
                                  ? "Miễn phí"
                                  : state.coupon.discount_price + " VNĐ"}
                              </div>
                            )}
                            <div
                              className={
                                state?.coupon?.code
                                  ? "line-through original-price"
                                  : "original-price"
                              }
                            >
                              {courseData.data.price.format_price} VNĐ
                            </div>
                          </div>
                        </div>
                      )}

                      {loadedCart &&
                        cart.courses.map((course) => {
                          const {
                            thumbnail,
                            title,
                            id,
                            price: { format_price },
                            course_coupon,
                          } = course;

                          return (
                            <div key={id} className="course">
                              <img src={linkThumbnail(thumbnail)} alt={title} />
                              <div className="card-title">{title}</div>
                              <div className="card-price">
                                {course_coupon && (
                                  <div className="discount-price">
                                    {parseFloat(
                                      course_coupon.discount_price
                                    ) === parseFloat(format_price)
                                      ? "Miễn phí"
                                      : course_coupon.discount_price + " VNĐ"}
                                  </div>
                                )}
                                <div
                                  className={
                                    course_coupon
                                      ? "line-through original-price"
                                      : "original-price"
                                  }
                                >
                                  {format_price} VNĐ
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
            <div className="title">Thông tin thanh toán</div>

            <div className="checkout-page-right__price">
              <div className="original-price d-flex align-items-center">
                <div className="title">Giá bán</div>
                <div className="price">
                  {courseData.data
                    ? courseData.data.price.format_price
                    : cart.original_price}{" "}
                  VNĐ
                </div>
              </div>
              <div className="discount-price d-flex align-items-center">
                <div className="title">Áp dụng mã giảm giá</div>
                <div className="price">{appliedCoupon}</div>
              </div>
              <div className="total d-flex align-items-center">
                <div className="title fw-bold">Tổng cộng</div>
                <div className="price fw-bold">{total}</div>
              </div>
              {amountData.loaded && (
                <div className="exchange-rate d-flex align-items-center">
                  <div className="title fw-bold">Quy đổi</div>
                  <div className="price fw-bold">
                    {localeWithCurrency(
                      parseFloat(amountData.value),
                      options.currency as string
                    )}
                  </div>
                </div>
              )}
            </div>

            <PaypalButtonContainer
              amountData={amountData}
              setAmountData={setAmountData}
              couponState={state}
              courseData={courseData}
              handleSucceeded={handleSucceeded}
            />
          </div>
        </div>
      </div>
      {details && (
        <Success
          couponState={state}
          courseData={courseData.data || cart}
          details={details}
        />
      )}
    </>
  );
};
export default CheckoutPage;
