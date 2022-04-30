import { ArrayCustomCourses } from "../components/Course/Course.component";
import { FeaturedCategories } from "../ts/types/categories.types";
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

  amountCoursesInTopics = async (slug: string) => {
    return axiosClient
      .get(`/categories/amount-courses-in-topics/${slug}`)
      .then((res) => res)
      .catch((error) => error.response);
  };

  featuredCategories = async (limit: number) => {
    return axiosClient.get<{ topLevelCategories: FeaturedCategories }>(
      `/featured-categories/${limit}`
    );
  };

  featuredCourses = async (limit: number) => {
    return axiosClient.get<{ courses: ArrayCustomCourses }>(
      `/featured-courses/${limit}`
    );
  };

  featuredCoursesByCategoryId = async (topLevelCategoryId: number) => {
    return axiosClient.get<{ courses: ArrayCustomCourses }>(
      `/category/featured-courses/${topLevelCategoryId}`
    );
  };
}
const CategoriesApi = new Categories();
export default CategoriesApi;
