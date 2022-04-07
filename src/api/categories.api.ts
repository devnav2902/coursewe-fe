import axiosClient from "../utils/axios";

class Categories {
  get = async () => {
    return axiosClient
      .get("/categories")
      .then((res) => res)
      .catch((error) => error.response);
  };

  getCoursesByCategorySlug = async (slug: string) => {
    return axiosClient
      .get(`/categories/get-courses/${slug}`)
      .then((res) => res)
      .catch((error) => error.response);
  };
}
const CategoriesApi = new Categories();
export default CategoriesApi;
