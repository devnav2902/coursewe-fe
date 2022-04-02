import axios from "axios";
import axiosClient from "../utils/axios";

class Course {
  getCourseBySlug = async (slug: string) => {
    return axiosClient
      .post("/course", { slug })
      .then((res) => res)
      .catch((error) => error.response);
  };
  getCourseOfAuthorById = async (id: number) => {
    return axiosClient
      .get("/instructor/course/" + id)
      .then((res) => res)
      .catch((error) => error.response);
  };

  getCourseByCurrentUser = async () => {
    return axiosClient
      .get("/user/courses")
      .then((res) => res)
      .catch((error) => error);
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
}

const CourseApi = new Course();

export default CourseApi;
