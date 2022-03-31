import axiosClient from "../utils/axios";

class Learning {
  getCourses = async () => {
    return axiosClient
      .get("/my-learning")
      .then((res) => res)
      .catch((error) => error.response);
  };
}

const LearningApi = new Learning();

export default LearningApi;
