import axiosClient from "../utils/axios";

class Instructor {
  getCourseById = async (id: string | number) => {
    return axiosClient
      .get(`/instructor/course/${id}`)
      .then((res) => res)
      .catch((error) => error.response);
  };
}

const InstructorApi = new Instructor();

export default InstructorApi;
