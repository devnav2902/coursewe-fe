import axiosClient from "../utils/axios";

class Profile {
  getBio = async () => {
    return axiosClient
      .get("/user/bio")
      .then((response) => response)
      .catch((error) => error);
  };
}
const ProfileApi = new Profile();
export default ProfileApi;
