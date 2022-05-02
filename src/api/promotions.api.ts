import { CouponType, CouponTypes } from "../ts/types/coupon.types";
import axiosClient from "../utils/axios";

export type ScheduledCoupon = {
  expires: string;
  created_at: string;
  enrollment_limit: null | number;
  currently_enrolled: number;
  course_id: number;
  coupon_id: string;
  code: string;
  discount_price: string;
  status: boolean;
  time_remaining: number;
  coupon: CouponType;
};

export type ScheduledCoupons = ScheduledCoupon[];

export type InformationCreateCoupon = {
  couponsCreationRemaining: number;
  maxCouponInAMonth: number;
  canCreate: boolean;
  isFreeCourse: boolean;
};

class Promotion {
  getScheduledCoupons = async (courseId: number) => {
    return axiosClient.get<{ scheduledCoupons: ScheduledCoupons }>(
      `/promotions/scheduled-coupons/${courseId}`
    );
  };

  getCouponTypes = async () => {
    return axiosClient.get<{ couponTypes: CouponTypes }>(
      "/promotions/coupon-types"
    );
  };

  getInformationCreateCoupon = async (courseId: number) => {
    return axiosClient.get<InformationCreateCoupon>(
      `/promotions/information-create-coupon/${courseId}`
    );
  };
}

const PromotionApi = new Promotion();
export default PromotionApi;
