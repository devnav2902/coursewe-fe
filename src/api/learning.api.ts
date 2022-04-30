import { Course } from "../redux/slices/learning.slice";
import { SectionItems } from "../ts/types/course.types";
import axiosClient from "../utils/axios";

class Learning {
  getCourseBySlug = async (slug: string) => {
    return axiosClient.get<{ course: Course }>(`/learning/${slug}`);
  };

  getSections = async (courseId: number) => {
    return axiosClient.get<{ sections: SectionItems }>(`/sections/${courseId}`);
  };
}

const LearningApi = new Learning();

export default LearningApi;
