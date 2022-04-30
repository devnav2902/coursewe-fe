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

export type FormattedCart = {
  [x in keyof CartTypes]: Courses;
};

export type ShoppingCartResponse = { data: Courses; cartType: CartType }[];
export type ShoppingCart = { shoppingCart: ShoppingCartResponse };
export type DataCart = {
  shoppingCart: ShoppingCartResponse;
  user_id?: number;
};
