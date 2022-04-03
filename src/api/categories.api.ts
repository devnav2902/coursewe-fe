import axiosClient from "../utils/axios";

class Categories {
  get = async () => {
    return axiosClient
      .get("/get-categories")
      .then((res) => res)
      .catch((error) => error.response);
  };
}
const CategoriesApi = new Categories();
export default CategoriesApi;
