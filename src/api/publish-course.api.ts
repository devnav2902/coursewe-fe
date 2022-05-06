import axiosClient from "../utils/axios";

type missingRequirements = string[];

export type MissingPublishRequirements = {
  title?: missingRequirements;
  subtitle?: missingRequirements;
  description?: missingRequirements;
  thumbnail?: missingRequirements;
  video_demo?: missingRequirements;
  course_outcome_count?: missingRequirements;
  lecture_count?: missingRequirements;
  categories_count?: missingRequirements;
};

type CheckingPublishRequirementsResponse = {
  missingPublishRequirements: MissingPublishRequirements;
};

class PublishCourse {
  checkingPublishRequirements = async (courseId: number | string) => {
    return axiosClient.get<CheckingPublishRequirementsResponse>(
      `/checking-publish-requirements/${courseId}`
    );
  };
}

const PublishCourseApi = new PublishCourse();
export default PublishCourseApi;
