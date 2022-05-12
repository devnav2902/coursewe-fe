import axiosClient from "../utils/axios";
import { InstructionalLevel as InstructionalLevelType } from "../ts/types/course.types";

class InstructionalLevel {
  get = async () => {
    return axiosClient.get<{ instructionalLevel: InstructionalLevelType[] }>(
      "/course/instructional-level"
    );
  };
}

const InstructionalLevelApi = new InstructionalLevel();

export default InstructionalLevelApi;
