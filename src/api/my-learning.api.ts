import { Course, Ratings } from "../ts/types/course.types";
import { Pagination } from "../ts/types/pagination.types";
import { User } from "../ts/types/user.types";
import axiosClient from "../utils/axios";

export type CustomCourse = Course & {
  author: User;
  count_progress: number;
  rating: Ratings;
};

export type ArrayCustomCourses = CustomCourse[];
class MyLearning {
  getCourses = async (page?: number) => {
    return axiosClient.get<{ courses: Pagination<ArrayCustomCourses> }>(
      `/my-learning${page ? "?page=" + page : ""}`
    );
  };
}

const MyLearningApi = new MyLearning();

export default MyLearningApi;
