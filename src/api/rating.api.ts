import { RatingPagination } from "../ts/types/course.types";
import axiosClient from "../utils/axios";

class Rating {
  get = async (courseId: number | string) => {
    return axiosClient.get<{ rating: RatingPagination }>(
      `/course/${courseId}/rating`
    );
  };
}

const RatingApi = new Rating();
export default RatingApi;
