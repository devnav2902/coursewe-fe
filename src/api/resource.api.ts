import axios, { CancelTokenSource } from "axios";
import axiosClient from "../utils/axios";

type Upload = {
  data: FormData;
  onUploadProgress: (e: ProgressEvent) => void;
  source: CancelTokenSource;
};
class Resource {
  getByLectureId = async (lectureId: number) => {
    return axiosClient
      .get(`/resources/lecture-id/${lectureId}`)
      .catch((error) => error.response);
  };

  upload = async ({ data, onUploadProgress, source }: Upload) => {
    return axiosClient
      .post("/resources/upload", data, {
        onUploadProgress,
        cancelToken: source.token,
      })
      .catch((error) => {
        if (axios.isCancel(error)) {
          console.log("Request canceled", error);
        } else {
        }
      });
  };

  delete = async (lectureId: number, courseId: number, resourceId: number) => {
    return axiosClient
      .delete(
        `/user/me/taught-courses/${courseId}/lectures/${lectureId}/resources/${resourceId}/`
      )
      .then((res) => res)
      .catch((error) => error.response);
  };

  download = async (
    lectureId: number,
    courseId: number | string,
    resourceId: number
  ) => {
    return axiosClient
      .get(
        `/users/me/subscribed-courses/${courseId}/lectures/${lectureId}/assets/${resourceId}/download/`,
        {
          responseType: "blob",
        }
      )
      .then((res) => res)
      .catch((error) => error.response);
  };
}

const ResourceApi = new Resource();
export default ResourceApi;
