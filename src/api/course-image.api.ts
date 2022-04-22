import axiosClient from "../utils/axios";
import { API_URL } from "../utils/constants";

class CourseImage {
  GET_API_COURSE_IMAGE = `${API_URL}/course-image`;

  controller: AbortController | null;

  constructor() {
    this.controller = null;
  }

  updateCourseImage = async (
    course_id: string | number,
    thumbnail: Blob,
    setProgress: (number: number) => void
  ) => {
    const formData = new FormData();
    formData.append("course_id", course_id.toString());
    formData.append("thumbnail", thumbnail);

    const controller = new AbortController();
    this.controller = controller;

    return axiosClient
      .post(`/course-image`, formData, {
        onUploadProgress: (data) => {
          //Set the progress value to show the progress bar
          setProgress(Math.round((100 * data.loaded) / data.total));
        },
        signal: controller.signal,
      })
      .then((res) => res);
  };
}

const CourseImageApi = new CourseImage();

export default CourseImageApi;
