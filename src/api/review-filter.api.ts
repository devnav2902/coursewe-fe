import axiosClient from "utils/axios";
import { Pagination } from "ts/types/pagination.types";

export interface ReviewFilterResponse {
  ratingData: Pagination<
    {
      course_id: number;
      user_id: number;
      content: null | string;
      rating: number;
      created_at: string;
      updated_at: string;
      user: {
        id: number;
        fullname: string;
        avatar: null | string;
      };
      course: {
        id: number;
        title: string;
        thumbnail: string;
      };
    }[]
  >;
}

export interface Params {
  rating: 1 | 2 | 3 | 4 | 5 | null;
  has_a_comment: 1 | null;
  sort_by: "new" | "old" | null;
}

class ReviewFilter {
  get = async (params: Params) => {
    return axiosClient.get<ReviewFilterResponse>(`/review-filter/get`, {
      params,
    });
  };
}
const ReviewFilterApi = new ReviewFilter();
export default ReviewFilterApi;
