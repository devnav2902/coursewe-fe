import axiosClient from "../utils/axios";

class Profile {
  getBio = async () => {
    return axiosClient
      .get("/user/bio")
      .then((response) => response)
      .catch((error) => error);
  };

  updateProfile = async (data: object) => {
    return axiosClient
      .patch("/change-profile", data)
      .then((res) => res)
      .catch((error) => error);
  };
}
const ProfileApi = new Profile();
export default ProfileApi;
