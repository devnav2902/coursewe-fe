import axiosClient from "../utils/axios";

class InstructionalLevel {
  get = async () => {
    return axiosClient
      .get("/course/instructional-level")
      .then((res) => res)
      .catch((error) => error.response);
  };
}

const InstructionalLevelApi = new InstructionalLevel();

export default InstructionalLevelApi;