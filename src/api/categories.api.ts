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
  getAmountCoursesByTypesPrice = async (slug: string) => {
    return axiosClient
      .get(`/categories/types-price/${slug}`)
  }
  amountCoursesInTopics = async (slug: string) => {
    return axiosClient
      .get(`/categories/amount-courses-in-topics/${slug}`)
      .then((res) => res)
      .catch((error) => error.response);
  };

  featuredCategories = async (limit: number) => {
    return axiosClient
      .get(`/featured-categories/${limit}`)
      .then((res) => res)
      .catch((error) => error.response);
  };

  featuredCourses = async (limit: number) => {
    return axiosClient
      .get(`/featured-courses/${limit}`)
      .then((res) => res)
      .catch((error) => error.response);
  };

  featuredCoursesByCategoryId = async (topLevelCategoryId: number) => {
    return axiosClient
      .get(`/category/featured-courses/${topLevelCategoryId}`)
      .then((res) => res)
      .catch((error) => error.response);
  };
}
const CategoriesApi = new Categories();
export default CategoriesApi;
