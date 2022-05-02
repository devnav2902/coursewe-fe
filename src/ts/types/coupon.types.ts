export type Coupon = {
  course_id: number;
  coupon_id: string;
  code: string;
  discount_price: string;
};

export type CouponType = {
  id: string;
  type: string;
  label: string;
  description: string;
  expiration: string;
  limited_time: number;
  enrollment_limit: number;
};

export type CouponTypes = CouponType[];
