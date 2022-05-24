import axiosClient from "../utils/axios";

class Search {
  search = async (value: string) => {
    return axiosClient
      .post(`/autocomplete/search`, { inputSearch: value })
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
