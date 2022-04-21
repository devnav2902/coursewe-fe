import axiosClient from "../utils/axios";

class Coupon {
  applyCoupon = async (code: string, courseId: number) => {
    return axiosClient
      .post(`/coupon/apply-coupon`, {
        couponInput: code,
        courseId,
      })
      .then((res) => res)
      .catch((error) => error.response);
  };

  applyCouponWithCourses = async (code: string, courses: number[]) => {
    return axiosClient
      .post(`/coupon/courses/apply-coupon`, {
        coupon_code: code,
        courses,
      })
      .then((res) => res)
      .catch((error) => error.response);
  };
}
const CouponApi = new Coupon();
export default CouponApi;
