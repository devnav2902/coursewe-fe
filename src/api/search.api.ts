import axiosClient from "../utils/axios";

export type SearchCourse = {
  title: string;
  id: number;
  slug: string;
  thumbnail: string;
};
export type ArraySearchCourses = SearchCourse[];
export type SearchCoursesResponse = {
  data: ArraySearchCourses;
};
class Search {
  search = async (value: string) => {
    return axiosClient
      .post<SearchCoursesResponse>(`/autocomplete/search`, {
        inputSearch: value,
      })
      .then((response) => response)
      .catch((error) => error.response);
  };
  getSearch = async () => {
    return axiosClient
      .get(`/search`)
      .then((res) => res)
      .catch((error) => error);
  };
}
const SearchApi = new Search();
export default SearchApi;
