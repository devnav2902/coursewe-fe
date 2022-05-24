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
  // getLecture = async (courseId: number) => {
  //   return axiosClient
  //     .get(`/sections/${courseId}`)
  //     .then((res) => res)
  //     .catch((error) => error.response);
  // };
  getVideo = async (course_slug: string, lectureId: number) => {
    return axiosClient.get(`course/${course_slug}/lecture/${lectureId}`);
  };
}

const LearningApi = new Learning();

export default LearningApi;
