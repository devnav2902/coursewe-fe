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
}
const CouponApi = new Coupon();
export default CouponApi;
