import axiosClient from "../utils/axios";
import { Coupon as CouponType } from "../ts/types/coupon.types";

class Coupon {
  applyCoupon = async (code: string, courseId: number) => {
    return axiosClient.post<{
      saleOff: number;
      coupon: CouponType;
      isFreeCoupon: boolean;
      message?: string;
      discount: string;
    }>(`/coupon/apply-coupon`, {
      couponInput: code,
      courseId,
    });
  };

  applyCouponWithCourses = async (code: string, courses: number[]) => {
    return axiosClient.post(`/coupon/courses/apply-coupon`, {
      coupon_code: code,
      courses,
    });
  };
}
const CouponApi = new Coupon();
export default CouponApi;
