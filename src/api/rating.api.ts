import { RatingPagination } from "../ts/types/course.types";
import axiosClient from "../utils/axios";

class Rating {
  get = async (courseId: number | string, page?: number) => {
    return axiosClient.get<{ rating: RatingPagination }>(
      `/course/${courseId}/rating${page ? "?page=" + page : ""}`
    );
  };
}

const RatingApi = new Rating();
export default RatingApi;
