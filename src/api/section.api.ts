import { Section as SectionType, SectionItems } from "../ts/types/course.types";
import axiosClient from "../utils/axios";

type CreateOrUpdateLectureParams = {
  sectionId?: number | string;
  courseId: number | string;
  title: string;
};

class Section {
  getSectionById = async (sectionId: number) => {
    return axiosClient.get<{ section: SectionType }>(`/section/${sectionId}`);
  };

  getSectionsByCourseId = async (courseId: number | string) => {
    return axiosClient.get<{ sections: SectionItems }>(
      `/section/course/${courseId}`
    );
  };

  update = async ({
    sectionId,
    courseId,
    title,
  }: CreateOrUpdateLectureParams) => {
    return axiosClient.patch(`/section/update`, { sectionId, courseId, title });
  };

  create = async ({ courseId, title }: CreateOrUpdateLectureParams) => {
    return axiosClient.post(`/section/create`, { courseId, title });
  };

  delete = async (sectionId: number, courseId: number | string) => {
    return axiosClient.delete(
      `/user/me/taught-courses/${courseId}/sections/${sectionId}`
    );
  };

  reorder = async ({
    courseId,
    data,
  }: {
    courseId: number | string;
    data: { order: number; id: number }[];
  }) => {
    return axiosClient.patch(`/section/re-order/course/${courseId}`, {
      data,
    });
  };
}

const SectionApi = new Section();
export default SectionApi;
