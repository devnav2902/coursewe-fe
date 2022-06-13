import { User } from "../ts/types/user.types";
import axiosClient from "../utils/axios";
import { CoursesByCategoryResponse } from "./categories.api";

export type SearchCourse = {
  title: string;
  id: number;
  slug: string;
  thumbnail: string;
  author: Omit<User, "role">;
};
export type ArraySearchCourses = SearchCourse[];
export type SearchCoursesResponse = {
  data: ArraySearchCourses;
};
class Search {
  search = async (value: string) => {
    return axiosClient.post<SearchCoursesResponse>(`/autocomplete/search`, {
      inputSearch: value,
    });
  };
  getSearch = async (value: string, page: string) => {
    return axiosClient.get<CoursesByCategoryResponse>(`/search?page=${page}`, {
      params: { inputSearch: value },
    });
  };
}
const SearchApi = new Search();
export default SearchApi;
