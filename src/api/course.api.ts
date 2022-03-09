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
}

const CourseApi = new Course();

export default CourseApi;
