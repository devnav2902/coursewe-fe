import axios, { CancelTokenSource } from "axios";
import axiosClient from "../utils/axios";

type Upload = {
  data: FormData;
  onUploadProgress: (e: ProgressEvent) => void;
  source: CancelTokenSource;
};

type UpdateLectureParams = {
  lectureId: number | string;
  courseId: number | string;
  title: string;
};

type CreateLectureParams = Omit<UpdateLectureParams, "lectureId"> & {
  sectionId: number | string;
};
class Lecture {
  getByLectureId = async (lectureId: number) => {
    return axiosClient
      .get(`/lecture/id/${lectureId}`)
      .catch((error) => error.response);
  };

  update = async ({ lectureId, courseId, title }: UpdateLectureParams) => {
    return axiosClient.patch(`/lecture/update`, { lectureId, courseId, title });
  };

  create = async ({ sectionId, courseId, title }: CreateLectureParams) => {
    return axiosClient.post(`/lecture/create`, { sectionId, courseId, title });
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

  reorder = async ({
    courseId,
    data,
    sectionId,
  }: {
    sectionId: number | string;
    courseId: number | string;
    data: { order: number; id: number }[];
  }) => {
    return axiosClient.patch(
      `/lecture/re-order/section/${sectionId}/course/${courseId}`,
      {
        data,
      }
    );
  };
}

const LectureApi = new Lecture();
export default LectureApi;
