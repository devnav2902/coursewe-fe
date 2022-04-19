import axiosClient from "../utils/axios";

class MyLearning {
  getCourses = async () => {
    return axiosClient
      .get("/my-learning")
      .then((res) => res)
      .catch((error) => error.response);
  };
}

const MyLearningApi = new MyLearning();

export default MyLearningApi;
