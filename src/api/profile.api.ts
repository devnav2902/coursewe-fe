import axiosClient from "../utils/axios";

type Message = {
  message: String;
};
export type MissingRequirements = { [x: string]: Message[] };
type CheckInstructorProfileResponse = {
  missingRequirements: MissingRequirements;
};
class Profile {
  getBio = async () => {
    return axiosClient
      .get("/user/bio")
      .then((response) => response)
      .catch((error) => error);
  };

  updateProfile = async (data: object) => {
    return axiosClient.patch("/change-profile", data);
  };

  checkInstructorProfileBeforePublishCourse = async () => {
    return axiosClient.get<CheckInstructorProfileResponse>(
      "/check-instructor-profile-before-publish-course"
    );
  };
}
const ProfileApi = new Profile();
export default ProfileApi;
