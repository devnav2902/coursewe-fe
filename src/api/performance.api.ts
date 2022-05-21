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

  getRating = async (year: number, currentMonth: number) => {
    return axiosClient
      .post("/performance/rating", { year, currentMonth })
      .then((res) => res)
      .catch((error) => error);
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
