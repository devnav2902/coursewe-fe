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

  deleteCourseOutcome = async (id: string | number) => {
    return axiosClient
      .delete(`/course/update-course-outcome/${id}`)
      .then((res) => res)
      .catch((error) => error.response);
  };
}

const CourseApi = new Course();

export default CourseApi;
