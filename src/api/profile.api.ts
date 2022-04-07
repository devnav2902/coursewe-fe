import axiosClient from "../utils/axios";

class Profile {
  getBio = async () => {
    return axiosClient
      .get("/user/bio")
      .then((response) => response)
      .catch((error) => error);
  };
  uploadAvatar = async (file: any) => {
    const formData = new FormData();

    formData.append("file", file);
    formData.append("name", "namsdsdfsdfsdfe");

    console.log(file);

    return axiosClient
      .post("/upload-avatar", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => res)
      .catch((error) => error);
  };
}
const ProfileApi = new Profile();
export default ProfileApi;
