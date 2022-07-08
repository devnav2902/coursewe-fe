import {
  ArrayCustomCourses,
  CustomCourse,
} from "../components/Course/Course.component";
import { FeaturedCategories } from "../ts/types/categories.types";
import { CoursesPagination } from "../ts/types/course.types";
import axiosClient from "../utils/axios";

export type CoursesByCategory = CoursesPagination<ArrayCustomCourses>;
export type CoursesByCategoryResponse = {
  courses: CoursesByCategory;
};

export type Topic = {
  name: string;
  slug: string;
  id: number;
  parent_id: number;
};
export type Subcategory = {
  subcategory?: Topic[];
} & Topic;
export type Category = {
  id: number;
  name: string;
  slug: string;
  subcategory: Subcategory[];
};
export type ArrayCategories = Category[];
export type CategoriesResponse = { categories: ArrayCategories };

export type AmountCoursesByLevel = {
  name: string;
  id: number;
  amount: number;
};
export type ArrayAmountCoursesByLevel = AmountCoursesByLevel[];

export type FilterRating = {
  [key: string]: { amount: number };
};

export type AmountCoursesInTopic = {
  amount: number;
  category_id: number;
  slug: string;
  title: string;
};
export type ArrayAmountCoursesInTopics = AmountCoursesInTopic[];

export type AmountCoursesByTypesPrice = {
  free: { amount: number; type: "free" };
  paid: { amount: number; type: "paid" };
};

export type DiscoveryUnitsResponse = {
  amountCoursesInTopics: ArrayAmountCoursesInTopics;
  filterRating: FilterRating;
  amountCoursesByInstructionalLevel: ArrayAmountCoursesByLevel;
  amountCoursesByTypesPrice: AmountCoursesByTypesPrice;
};

export type Breadcrumb = {
  category_id: number;
  level1_title: string;
  level1_slug: string;
  subcategory_id?: number;
  level2_title?: string;
  level2_slug?: string;
  topic_id?: number;
  level3_title?: string;
  level3_slug?: string;
};
export type BreadcrumbResponse = {
  breadcrumb: Breadcrumb;
};

export type PopularInstructor = {
  id: number;
  fullname: string;
  slug: string;
  avatar: string;
  totalStudents: number;
  roundedAvgCourses: number;
  numberOfCourses: number;
};
export type ArrayPopularInstructors = PopularInstructor[];
export type PopularInstructorsResponse = {
  popularInstructors: ArrayPopularInstructors;
};

export type CoursesBeginner = CoursesPagination<ArrayCustomCourses>;
export type CoursesBeginnerResponse = {
  coursesBeginner: CoursesBeginner;
};

export interface CategoriesListResponse {
  items: { category_id: number; title: string }[];
}
class Categories {
  getList = async () => {
    return axiosClient.get<CategoriesListResponse>("/categories/get-list");
  };

  get = async () => {
    return axiosClient.get<CategoriesResponse>("/categories");
  };

  coursesBeginner = async (slug: string) => {
    return axiosClient.get<CoursesBeginnerResponse>(
      `/categories/courses-beginner/${slug}`
    );
  };

  discoveryUnits = async (slug: string, params: object) => {
    return axiosClient.get<DiscoveryUnitsResponse>(
      `/categories/discovery-units/${slug}`,
      { params }
    );
  };

  getCoursesByCategorySlug = async (slug: string, params: object) => {
    return axiosClient.get<CoursesByCategoryResponse>(
      `/categories/get-courses/${slug}`,
      { params }
    );
  };

  getBreadcrumbByCategory = async (slug: string) => {
    return axiosClient.get<BreadcrumbResponse>(
      `/categories/breadcrumb/${slug}`
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
