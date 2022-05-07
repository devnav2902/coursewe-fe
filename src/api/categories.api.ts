import { ArrayCustomCourses } from "../components/Course/Course.component";
import { FeaturedCategories } from "../ts/types/categories.types";
import { CoursesPagination } from "../ts/types/course.types";
import { User } from "../ts/types/user.types";
import axiosClient from "../utils/axios";

export type CoursesByCategory = CoursesPagination<ArrayCustomCourses>;
export type CoursesByCategoryResponse = { courses: CoursesByCategory };
export type AmountCoursesInTopic = {
  amount: number;
  category_id: number;
  slug: string;
  title: string;
};
export type ArrayAmountCoursesInTopics = AmountCoursesInTopic[];
export type AmountCoursesInTopicsResponse = {
  topicsWithCourses: ArrayAmountCoursesInTopics;
};

export type AmountCoursesByTypesPrice = {
  free: { amount: number };
  paid: { amount: number };
};
export type AmountCoursesByTypesPriceResponse = {
  amountCoursesByTypesPrice: AmountCoursesByTypesPrice;
};

export type PopularInstructor = {
  amountSudents: number;
  avgRating: number;
  infoAuthor: User;
  totalCourses: number;
};
export type ArrayPopularInstructors = PopularInstructor[];
export type PopularInstructorsResponse = {
  popularInstructors: ArrayPopularInstructors;
};

export type Topic = { name: string; slug: string };
export type Subcategory = {
  subcategory: Topic[];
} & Topic;
export type Category = {
  name: string;
  slug: string;
  subcategory: Subcategory[];
};
export type ArrayCategories = Category[];
export type CategoriesResponse = { categories: ArrayCategories };

class Categories {
  get = async () => {
    return axiosClient.get<CategoriesResponse>("/categories");
  };

  getCoursesByCategorySlug = async (slug: string) => {
    return axiosClient.get<CoursesByCategoryResponse>(
      `/categories/get-courses/${slug}`
    );
  };
  getAmountCoursesByTypesPrice = async (slug: string) => {
    return axiosClient.get<AmountCoursesByTypesPriceResponse>(
      `/categories/types-price/${slug}`
    );
  };
  amountCoursesInTopics = async (slug: string) => {
    return axiosClient.get<AmountCoursesInTopicsResponse>(
      `/categories/amount-courses-in-topics/${slug}`
    );
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

  getPopularInstructors = async (slug: string) => {
    return axiosClient.get<PopularInstructorsResponse>(
      `/categories/popular-instructors/${slug}`
    );
  };
}
const CategoriesApi = new Categories();
export default CategoriesApi;
