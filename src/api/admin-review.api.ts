import { CoursesPagination, Price } from "../ts/types/course.types";
import { User } from "../ts/types/user.types";
import axiosClient from "../utils/axios";
import { CustomCourse } from "./course.api";

type Course = {
  author: User;
  author_id: number;
  id: number;
  price: Price[];
  title: string;
};

export type ReviewCourses = {
  course: Course;
  course_id: number;
  created_at: string;
  id: number;
  updated_at: string;
}[];

class Admin {
  getReviewCourses = async () => {
    return axiosClient.get<{ courses: CoursesPagination<ReviewCourses> }>(
      "/admin/submission-courses-list"
    );
  };
  getCourseOfAuthorAndAdminById = async (id: number | string) => {
    return axiosClient
      .get<{ course: CustomCourse[] }>(`/admin/course/${id}`)
      .then((res) => res)
      .catch((error) => error.response);
  };
}
const AdminApi = new Admin();
export default AdminApi;
