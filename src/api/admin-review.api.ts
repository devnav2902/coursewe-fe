import {
  Course,
  CourseOutcome,
  InstructionalLevel,
  Lecture,
  Price,
  Section,
} from "../ts/types/course.types";
import { User } from "../ts/types/user.types";
import axiosClient from "../utils/axios";
import { CustomCourse } from "./course.api";

type ReviewCourse = {
  author: User;
  author_id: number;
  course_outcome: CourseOutcome[];
  course_requirements: [];
  id: number;
  instructional_level: InstructionalLevel[];
  price: Price[];
  title: string;
};

export type ReviewCourses = {
  course: ReviewCourse;
  course_id: number;
  created_at: string;
  id: number;
  updated_at: string;
};

class Admin {
  getReviewCourses = async () => {
    return axiosClient
      .get<{ courses: ReviewCourses[] }>("/admin/submission-courses-list")
      .then((res) => res)
      .catch((error) => error.response);
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
