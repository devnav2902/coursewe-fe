import axiosClient from "../utils/axios";

class Learning {
  getCourseBySlug = async (slug: string) => {
    return axiosClient
      .get(`/learning/${slug}`)
      .then((res) => res)
      .catch((error) => error.response);
  };

  getSections = async (courseId: number) => {
    return axiosClient
      .get(`/sections/${courseId}`)
      .then((res) => res)
      .catch((error) => error.response);
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
