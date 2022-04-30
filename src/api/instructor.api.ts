import { ArrayCustomCourses } from "../components/Course/Course.component";
import { CoursesPagination } from "../ts/types/course.types";
import { User } from "../ts/types/user.types";
import axiosClient from "../utils/axios";

export type DataInstructor = {
  author: User;
  coursesData: CoursesPagination<ArrayCustomCourses>;
  totalStudents: number;
  totalReviews: number;
  totalCourses: number;
};
class Instructor {
  getCourseById = async (id: string | number) => {
    return axiosClient
      .get(`/instructor/course/${id}`)
      .then((res) => res)
      .catch((error) => error.response);
  };

  getDataInstructor = async (slug: string) => {
    return axiosClient.get<DataInstructor>(`/instructor/profile/${slug}`);
  };
}

const InstructorApi = new Instructor();

export default InstructorApi;
