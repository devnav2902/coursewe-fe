import axiosClient from "../utils/axios";

class Rating {
  filterRatingByCategorySlug = async (slug: string) => {
    return axiosClient
      .get(`/rating/filter-rating/${slug}`)
      .then((res) => res)
      .catch((error) => error.response);
  };
}

const RatingApi = new Rating();
export default RatingApi;
