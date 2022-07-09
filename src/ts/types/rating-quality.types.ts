export type UserType = {
  fullname: string;
  avatar: string;
  gender: number;
};

export type RatingQualityType = {
  course_id: number;
  id: number;
  rating: number;
  user: UserType;
  user_id: number;
};
