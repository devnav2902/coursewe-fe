import axiosClient from "../utils/axios";
import { InstructionalLevel as InstructionalLevelType } from "../ts/types/course.types";

class InstructionalLevel {
  get = async () => {
    return axiosClient.get<{ instructionalLevel: InstructionalLevelType[] }>(
      "/course/instructional-level"
    );
  };

  amountCoursesByInstructionalLevel = async (slug: string) => {
    return axiosClient
      .get(`/instructional-level/amount-courses/${slug}`)
      .then((res) => res)
      .catch((error) => error.response);
  };
}

const InstructionalLevelApi = new InstructionalLevel();

export default InstructionalLevelApi;
