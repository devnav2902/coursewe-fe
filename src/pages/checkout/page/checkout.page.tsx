import { useState, useEffect } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import CourseApi, { CustomCourse } from "../../../api/course.api";
import PurchaseApi from "../../../api/purchase.api";
import { useAppDispatch, useTypedSelector } from "../../../hooks/redux.hooks";
import { getCart } from "../../../redux/slices/cart.slice";
import { ROUTES } from "../../../utils/constants";
import { linkThumbnail } from "../../../utils/functions";
import Paypal from "../component/Paypal.component";
import PaypalButtonContainer from "../component/PaypalButton.component";
import SelectCurrency from "../component/SelectCurrency.component";
import Success from "../component/Success.component";
import { DataCoupon } from "../../detail-course/components/Sidebar/Sidebar.component";

export type CourseData = {
  loaded: boolean;
  data: CustomCourse | null;
};

export type CouponState = { state: null | DataCoupon };

const CheckoutPage = () => {
  const { cart, loadedCart } = useTypedSelector((state) => state.cart);

  const [succeeded, setSucceeded] = useState(false);
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
      CourseApi.getCourseById(courseId).then(({ data }) => {
        setCourseData({ data, loaded: true });
      });
    }
  }, [userLoaded, dispatch, courseId, loadedCart]);

  useEffect(() => {
    if (loadedCart && cart.courses.length < 1 && !courseId)
      navigate(ROUTES.CART);
  }, [loadedCart, cart.courses.length, courseId]);

  function handleSucceeded(details) {
    setSucceeded(true);
    setDetails(details);
    if (details.status === "COMPLETED") {
      PurchaseApi.purchase(cart).then((res) => console.log(res));
    }
  }

  return (
    <Paypal>
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
                <div className="price">
                  {courseData.data && state
                    ? `-${state?.discount} VNĐ`
                    : `- ${cart.discount} VNĐ`}
                </div>
              </div>
              <div className="total d-flex align-items-center">
                <div className="title">Tổng cộng</div>
                <div className="price fw-bold">
                  {courseData.data && state
                    ? state.coupon?.discount_price + " VNĐ"
                    : cart.current_price + " VNĐ"}
                </div>
              </div>
            </div>

            <PaypalButtonContainer
              couponState={state}
              courseData={courseData}
              handleSucceeded={handleSucceeded}
            />
          </div>
        </div>
      </div>
      {succeeded ? <Success details={details} /> : null}
    </Paypal>
  );
};
export default CheckoutPage;
