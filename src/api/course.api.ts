import axios from "axios";
import axiosClient from "../utils/axios";

class Course {
  get = async (limit?: number) => {
    const url = "http://127.0.0.1:8000/api/course";
    if (limit) {
      return axios.get(`${url}?limit=${limit}`).then((res) => {
        return res;
      });
    } else {
      return axios.get(`${url}`).then((res) => {
        return res;
      });
    }
  };

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
}

const CourseApi = new Course();

export default CourseApi;
