import { Category } from "ts/types/categories.types";
import { Pagination } from "ts/types/pagination.types";
import { RatingQualityType, UserType } from "ts/types/rating-quality.types";
import axiosClient from "utils/axios";

export interface ICourse {
  title: string;
  thumbnail: string;
  id: number;
  updated_at: string;
  rating_quality_avg_rating: null | string;
  categories: Category[];
  rating_quality: RatingQualityType[];
  rated: null | {
    user_id: number;
    id: number;
    rating: number;
    user: UserType;
  };
}
export interface IListCoursesResponse {
  listCourses: Pagination<ICourse[]>;
}

class RatingQuality {
  listCourses = async (page?: number) => {
    return axiosClient.get<IListCoursesResponse>(
      `/rating-quality/list-courses${page ? "?page=" + page : ""}`
    );
  };

  rate = async (rating: number, course_id: number) => {
    return axiosClient.post(`/rating-quality/me/rate`, {
      rating,
      course_id,
    });
  };
}

const RatingQualityApi = new RatingQuality();
export default RatingQualityApi;
