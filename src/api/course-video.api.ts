import axios from "axios";
import axiosClient from "../utils/axios";
import { openNotification } from "../utils/functions";

class CourseVideo {
  controller: AbortController | null;

  constructor() {
    this.controller = null;
  }

  updateCourseVideo = async (
    course_id: string | number,
    video_demo: Blob,
    setProgress: (number: number) => void
  ) => {
    const formData = new FormData();
    formData.append("course_id", course_id.toString());
    formData.append("video_demo", video_demo);

    const controller = new AbortController();
    this.controller = controller;

    return axiosClient
      .post(`/course-video`, formData, {
        onUploadProgress: (data) => {
          //Set the progress value to show the progress bar
          setProgress(Math.round((100 * data.loaded) / data.total));
        },
        signal: controller.signal,
      })
      .then((res) => res);
  };
}

const CourseVideoApi = new CourseVideo();

export default CourseVideoApi;
