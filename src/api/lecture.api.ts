import axios, { CancelTokenSource } from "axios";
import axiosClient from "../utils/axios";

type Upload = {
  data: FormData;
  onUploadProgress: (e: ProgressEvent) => void;
  source: CancelTokenSource;
};
class Lecture {
  getByLectureId = async (lectureId: number) => {
    return axiosClient
      .get(`/lecture/id/${lectureId}`)
      .catch((error) => error.response);
  };

  upload = async ({ data, onUploadProgress, source }: Upload) => {
    return axiosClient
      .post("/lecture/upload", data, {
        onUploadProgress,
        cancelToken: source.token,
      })
      .catch((error) => {
        if (axios.isCancel(error)) {
          throw Error(error);
        } else {
        }
      });
  };

  delete = async (lectureId: number, courseId: number) => {
    return axiosClient
      .delete(`/user/me/taught-courses/${courseId}/lectures/${lectureId}`)
      .then((res) => res)
      .catch((error) => error.response);
  };
}

const LectureApi = new Lecture();
export default LectureApi;
