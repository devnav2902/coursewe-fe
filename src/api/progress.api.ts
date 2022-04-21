import axiosClient from "../utils/axios";

class Progress {
  updateProgress = async (data: { lectureId: number; progress: boolean }) => {
    return axiosClient
      .post("/progress", data)
      .then((res) => res)
      .catch((error) => error.response);
  };

  getProgress = async (id: number) => {
    return axiosClient
      .get("/progress/" + id)
      .then((res) => res)
      .catch((error) => error.response);
  };
}

const ProgressApi = new Progress();

export default ProgressApi;
