import axiosClient from "../utils/axios";
import { InstructionalLevel as InstructionalLevelType } from "../ts/types/course.types";

export type AmountCoursesByLevel = {
  name: string;
  id: number;
  amount: number;
};
export type ArrayAmountCoursesByLevel = AmountCoursesByLevel[];
export type AmountCoursesByLevelResponse = {
  amountCoursesByInstructionalLevel: ArrayAmountCoursesByLevel;
};
class InstructionalLevel {
  get = async () => {
    return axiosClient.get<{ instructionalLevel: InstructionalLevelType[] }>(
      "/course/instructional-level"
    );
  };

  amountCoursesByInstructionalLevel = async (slug: string) => {
    return axiosClient.get<AmountCoursesByLevelResponse>(
      `/instructional-level/amount-courses/${slug}`
    );
  };
}

const InstructionalLevelApi = new InstructionalLevel();

export default InstructionalLevelApi;
