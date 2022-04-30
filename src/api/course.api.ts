import { CustomCourse } from "../components/Course/Course.component";
import axiosClient from "../utils/axios";
import { Course as CourseType } from "../ts/types/course.types";

export type CoursesOfInstructor = (CourseType & {
  updated_at: string;
  submit_for_review: boolean;
  isPublished: boolean;
})[];
class Course {
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
    return axiosClient.get<{ courses: CustomCourse[] }>("/course/best-selling");
  };

  getLatestCourses = async () => {
    return axiosClient.get<{ latestCourses: CustomCourse[] }>("/course/latest");
  };

  getCourseBySlug = async (slug: string) => {
    return axiosClient
      .get(`/course/get/${slug}`)
      .then((res) => res)
      .catch((error) => error.response);
  };
  getCourseOfAuthorById = async (id: number) => {
    return axiosClient
      .get("/instructor/course/" + id)
      .then((res) => res)
      .catch((error) => error.response);
  };

  getCoursesByCurrentUser = async () => {
    return axiosClient.get<{ coursesData: { data: CoursesOfInstructor } }>(
      "/user/courses"
    );
  };

  getCourseById = async (id: string | number) => {
    return axiosClient
      .get(`/course/${id}`)
      .then((res) => res)
      .catch((error) => error.response);
  };
  createCourse = async (title: string) => {
    return axiosClient
      .post("/create-course", { title })
      .then((res) => res)
      .catch((error) => error);
  };
  updateInformation = async (id: string | number, data: any) => {
    let dataForm = new FormData();
    for (const key in data) data[key] && dataForm.append(key, data[key]);

    return axiosClient
      .post(`/course/update-information/${id}`, dataForm, {
        headers: {
          "Content-Type":
            "multipart/form-data; charset=utf-8; boundary=" +
            Math.random().toString().substr(2),
        },
      })
      .then((res) => res)
      .catch((error) => error.response);
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
