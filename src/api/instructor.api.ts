import { ArrayCustomCourses } from "../components/Course/Course.component";
import { ArrayCategories } from "../ts/types/categories.types";
import {
  Course,
  CoursesPagination,
  IntendedItems,
  Price,
  SectionItems,
} from "../ts/types/course.types";
import { User } from "../ts/types/user.types";
import axiosClient from "../utils/axios";

export type DataInstructor = {
  author: User;
  coursesData: CoursesPagination<ArrayCustomCourses>;
  totalStudents: number;
  totalReviews: number;
  totalCourses: number;
};

export type CourseResponse = {
  course_outcome: IntendedItems;
  course_requirements: IntendedItems;
  isPublished: boolean;
  section: SectionItems;
  description: string;
  video_demo: string;
  instructional_level_id: number;
  subtitle: string;
  author: User;
  price_id: number;
  price: Price;
  categories: ArrayCategories;
} & Course;
class Instructor {
  getCourseById = async (id: string | number) => {
    return axiosClient.get<{ course: CourseResponse }>(
      `/instructor/course/${id}`
    );
  };

  getDataInstructor = async (slug: string) => {
    return axiosClient.get<DataInstructor>(`/instructor/profile/${slug}`);
  };
}

const InstructorApi = new Instructor();

export default InstructorApi;
