import { Course, Courses, Ratings } from "../ts/types/course.types";
import { User } from "../ts/types/user.types";
import axiosClient from "../utils/axios";

export type CustomCourse = Course & {
  author: User;
  count_progress: number;
  rating: Ratings;
};

export type ArrayCustomCourses = CustomCourse[];
class MyLearning {
  getCourses = async () => {
    return axiosClient.get<{ courses: { data: ArrayCustomCourses } }>(
      "/my-learning"
    );
  };
}

const MyLearningApi = new MyLearning();

export default MyLearningApi;
