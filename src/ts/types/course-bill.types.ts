export type Bill = {
  id: number;
  user_id: number;
  course_id: number;
  price: string;
  title: string;
  thumbnail: string;
  purchase: string;
  promo_code: string;
  created_at: string;
};
export type CourseBills = Bill[];
