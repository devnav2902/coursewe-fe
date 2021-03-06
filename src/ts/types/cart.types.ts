import {
  InstructionalLevel,
  Price,
  Course as CourseBase,
} from "./course.types";
import { User } from "./user.types";

export type Course = CourseBase & {
  price_id: number;
  instructional_level_id: number;
  rating_avg_rating: number;
  rating_count: number;
  lecture_count: number;
  price: Price;
  instructional_level: InstructionalLevel;
  author: User;
  coupon_code?: null | string;
  course_coupon: null | {
    code: string;
    course_id: number;
    discount_price: string;
    status: 1;
    coupon_id: string;
  };
};
export type Courses = Course[];

export type CartTypes = {
  cart: "cart";
  saved_for_later: "saved_for_later";
  wishlist: "wishlist";
};

export type CartType = {
  id: number;
  type:
    | CartTypes["cart"]
    | CartTypes["saved_for_later"]
    | CartTypes["wishlist"];
  name: string;
};

export type FormattedCartItem = {
  courses: Courses;
  current_price: string;
  original_price: string;
  discount: string;
};
export type FormattedCart = {
  [x in keyof CartTypes]: FormattedCartItem;
};

export type ShoppingCartResponseItem = {
  data: Courses;
  cartType: CartType;
  original_price: string;
  current_price: string;
  discount: string;
};
export type ArrayShoppingCartResponse = ShoppingCartResponseItem[];
export type ShoppingCart = { shoppingCart: ArrayShoppingCartResponse };
export type DataCart = {
  shoppingCart: ArrayShoppingCartResponse;
  user_id?: number;
};
