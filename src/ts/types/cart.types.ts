import { InstructionalLevel, Price } from "./course.types";
import { User } from "./user.types";

export type Course = {
  id: number;
  author_id: number;
  price_id: number;
  slug: string;
  thumbnail: string;
  instructional_level_id: number;
  title: string;
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
    purchase_price: string;
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
};
export type FormattedCart = {
  [x in keyof CartTypes]: FormattedCartItem;
};

export type ShoppingCartResponseItem = {
  data: Courses;
  cartType: CartType;
  original_price: string;
  current_price: string;
};
export type ArrayShoppingCartResponse = ShoppingCartResponseItem[];
export type ShoppingCart = { shoppingCart: ArrayShoppingCartResponse };
export type DataCart = {
  shoppingCart: ArrayShoppingCartResponse;
  user_id?: number;
};
