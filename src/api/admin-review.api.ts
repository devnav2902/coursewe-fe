import { Course, Price } from "../ts/types/course.types";
import { Pagination } from "../ts/types/pagination.types";
import { User } from "../ts/types/user.types";
import axiosClient from "../utils/axios";

export type ReviewCourses = {
  course: Course;
  course_id: number;
  created_at: string;
  id: number;
  updated_at: string;
}[];

interface CustomCourse {
  description: string;
  created_at: string;
  updated_at: string;
  author: User;
  price: Price;
}

interface ReviewCourseItem {
  id: number | string;
  course_id: number | string;
  created_at: string;
  updated_at: string;
  course: Course & CustomCourse;
}

export interface CoursesListResponse {
  courses: Pagination<ReviewCourseItem[]>;
}
class Admin {
  getReviewCourses = async () => {
    return axiosClient.get<CoursesListResponse>(
      "/admin/submission-courses-list"
    );
  };
}
const AdminApi = new Admin();
export default AdminApi;
