import axiosClient from "../utils/axios";

export type Revenue = { revenue: number; date: string };
export type RevenueArray = Revenue[];
export type RevenueResponse = {
  revenueData: RevenueArray;
};
type Params =
  | {
      fromDate: string;
      toDate: string;
    }
  | { LTM: true };

export type Enrollment = { total: number; date: string };
export type EnrollmentArray = Enrollment[];
export type EnrollmentResponse = {
  enrollmentData: EnrollmentArray;
};
export type Rating = {
  date: string;
  avg_rating: number;
  count_students: number;
};
export type RatingArray = Rating[];
export type RatingResponse = {
  chartRatingData: RatingArray;
};

export type AmountCoursesByCategory = {
  amountCourses: number;
  revenue: number;
  category: string;
};
export type AmountCoursesByCategoryArray = AmountCoursesByCategory[];
export type AmountCoursesByCategoryResponse = {
  amountCoursesByCategory: AmountCoursesByCategoryArray;
};

class Performance {
  getRevenue = async (params: Params) =>
    axiosClient.get<RevenueResponse>("/performance/revenue", {
      params,
    });

  getEnrollments = async (params: Params) => {
    return axiosClient.get<EnrollmentResponse>("/performance/enrollments", {
      params,
    });
  };

  getRating = async (params: Params) => {
    return axiosClient.get<RatingResponse>("/performance/rating", {
      params,
    });
  };

  getCourses = async (params: Params) => {
    return axiosClient.get<AmountCoursesByCategoryResponse>(
      "/performance/courses",
      { params }
    );
  };
}
const PerformanceApi = new Performance();
export default PerformanceApi;
