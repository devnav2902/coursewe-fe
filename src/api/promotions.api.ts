import { CouponType, CouponTypes } from "../ts/types/coupon.types";
import axiosClient from "../utils/axios";

export type ScheduledCoupon = {
  expires: string;
  created_at: string;
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
export type ExpiredCoupon = {
  expires: string;
  created_at: string;
  course_id: number;
  coupon_id: string;
  code: string;
  discount_price: string;
  coupon: CouponType;
  currently_enrolled: number;
};

export type ExpiredCoupons = ExpiredCoupon[];

export type InformationCreateCoupon = {
  couponsCreationRemaining: number;
  maxCouponInAMonth: number;
  canCreate: boolean;
  isFreeCourse: boolean;
};

export type FormCreateCoupon = {
  code: string;
  "start-date": string;
  "end-date": string;
  discount_price: number | null;
  coupon_type: string;
  course_id: number | string;
};

class Promotion {
  getScheduledCoupons = async (courseId: number) => {
    return axiosClient.get<{ scheduledCoupons: ScheduledCoupons }>(
      `/promotions/scheduled-coupons/${courseId}`
    );
  };

  getExpiredCoupons = async (courseId: number) => {
    return axiosClient.get<{ expiredCoupons: ExpiredCoupons }>(
      `/promotions/expired-coupons/${courseId}`
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

  createCoupon = async (data: FormCreateCoupon) => {
    return axiosClient.post<FormCreateCoupon>(
      "/promotions/create-coupon/",
      data
    );
  };
}

const PromotionApi = new Promotion();
export default PromotionApi;
