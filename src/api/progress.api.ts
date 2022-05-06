import { LearningProgress } from "../ts/types/course.types";
import axiosClient from "../utils/axios";

class Progress {
  updateProgress = async (data: { lectureId: number; progress: boolean }) => {
    return axiosClient.post("/progress", data);
  };

  getProgress = async (id: number) => {
    return axiosClient.get<LearningProgress>("/progress/" + id);
  };
}

const ProgressApi = new Progress();

export default ProgressApi;
