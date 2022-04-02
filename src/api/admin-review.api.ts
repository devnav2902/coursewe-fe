import axiosClient from "../utils/axios";

class Admin {
  getReviewCourses = async () => {
    return axiosClient
      .get("/admin/submission-courses-list")
      .then((res) => res)
      .catch((error) => error.response);
  };
}
const AdminApi = new Admin();
export default AdminApi;
