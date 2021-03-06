import axiosClient from "../utils/axios";
import {
  Course as CourseType,
  CourseOutcome,
  CourseRequirements,
  Lecture,
  Price,
  Ratings,
  SectionItems,
} from "../ts/types/course.types";
import { Pagination } from "../ts/types/pagination.types";
import { User } from "../ts/types/user.types";
import { CustomCourse as CourseComponentType } from "../components/Course/Course.component";

export type CoursesOfInstructor = (CourseType & {
  updated_at: string;
  submit_for_review: boolean;
  isPublished: boolean;
})[];

export type CoursesOfInstructorResponse = {
  coursesData: Pagination<CoursesOfInstructor>;
};

export type CustomLecture = Omit<Lecture, "resource"> & {
  resource_count: number;
};

export type CustomCourse = CourseType & {
  course_outcome: CourseOutcome[];
  course_requirements: CourseRequirements[];
  course_bill_count: number;
  rating_avg_rating: string;
  section: SectionItems;
  description: string;
  author: User;
  price: Price;
  video_demo: string;
  section_count: number;
  lecture_count: number;
  lecture: CustomLecture[];
  rating: Ratings;
  rating_count: number;
  subtitle: string;
};

export interface GraphItem {
  rating: number;
  percent: number;
}

export type RatingArray = GraphItem[];
class Course {
  draftCoursePreview = async (courseId: number | string) => {
    return axiosClient.get<{ course: CustomCourse }>(
      `/course/preview/${courseId}`
    );
  };

  userHasRated = async (courseId: number) => {
    return axiosClient
      .get(`/course/has-rated/${courseId}`)
      .then((res) => res)
      .catch((error) => error.response);
  };

  userHasPurchased = async (courseId: number) => {
    return axiosClient
      .get(`/course/has-purchased/${courseId}`)
      .then((res) => res)
      .catch((error) => error.response);
  };

  bestSellingCourses = async () => {
    return axiosClient.get<{ courses: CourseComponentType[] }>(
      "/course/best-selling"
    );
  };

  getLatestCourses = async () => {
    return axiosClient.get<{ latestCourses: CourseComponentType[] }>(
      "/course/latest"
    );
  };

  getCourseBySlug = async (slug: string) => {
    return axiosClient.get<{ course: CustomCourse; graph: RatingArray }>(
      `/course/get/${slug}`
    );
  };
  getCourseOfAuthorById = async (id: number | string) => {
    return axiosClient.get<{ course: CustomCourse }>(
      `/instructor/course/${id}`
    );
  };

  getCoursesByCurrentUser = async (page?: number) => {
    return axiosClient.get<CoursesOfInstructorResponse>(
      `/user/courses${page ? `?page=${page}` : ""}`
    );
  };

  getCourseById = async (id: string | number) => {
    return axiosClient.get<CustomCourse>(`/course/${id}`);
  };
  createCourse = async (title: string) => {
    return axiosClient
      .post("/create-course", { title })
      .then((res) => res)
      .catch((error) => error);
  };
  updateInformation = async (id: string | number, data: any) => {
    return axiosClient.patch(`/course/update-information/${id}`, data);
  };

  updateCourseOutcome = async (id: string | number, data: any) => {
    return axiosClient
      .patch(`/course/update-course-outcome/${id}`, data)
      .then((res) => res)
      .catch((error) => error.response);
  };

  updateCourseRequirements = async (id: string | number, data: any) => {
    return axiosClient
      .patch(`/course/update-course-requirements/${id}`, data)
      .then((res) => res)
      .catch((error) => error.response);
  };

  deleteCourseOutcome = async (id: string | number, data: any) => {
    return axiosClient
      .delete(`/course/delete-course-outcome/${id}`, { data })
      .then((res) => res)
      .catch((error) => error.response);
  };

  deleteCourseRequirements = async (id: string | number, data: any) => {
    return axiosClient
      .delete(`/course/delete-course-requirements/${id}`, { data })
      .then((res) => res)
      .catch((error) => error.response);
  };
}

const CourseApi = new Course();

export default CourseApi;
