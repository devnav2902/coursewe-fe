import axiosClient from "../utils/axios";

export type FilterRatingByCategorySlug = {
  [key: string]: { amount: number };
};
export type ArrayFilterRating = FilterRatingByCategorySlug[];
type FilterRatingResponse = { filterRating: ArrayFilterRating };
class Rating {
  filterRatingByCategorySlug = async (slug: string) => {
    return axiosClient.get<FilterRatingResponse>(
      `/rating/filter-rating/${slug}`
    );
  };
}

const RatingApi = new Rating();
export default RatingApi;
