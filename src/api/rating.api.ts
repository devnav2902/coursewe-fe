import { RatingPagination } from "../ts/types/course.types";
import axiosClient from "../utils/axios";

export interface Rate {
  course_id: string | number;
  content: string;
  rating: 1 | 2 | 3 | 4 | 5;
}

class Rating {
  get = async (courseId: number | string, page?: number) => {
    return axiosClient.get<{ rating: RatingPagination }>(
      `/course/${courseId}/rating${page ? "?page=" + page : ""}`
    );
  };

  rate = async (data: Rate) => {
    return axiosClient.post("/course/rate", data);
  };
}

const RatingApi = new Rating();
export default RatingApi;
