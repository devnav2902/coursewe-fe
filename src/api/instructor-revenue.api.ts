import { Price } from "ts/types/course.types";
import { Pagination } from "ts/types/pagination.types";
import axiosClient from "../utils/axios";

export interface InstructorRevenueResponse {
  courses: Pagination<
    {
      id: number;
      author_id: number;
      thumbnail: string;
      course_bill_sum_purchase: number;
      price: Price;
      created_at: string;
      course_bill_count: number;
      rating_avg_rating: null | string;
    }[]
  >;
  totalRevenue: number;
  bestRevenueCourse: number;
  revenueLatestCourse: number | null;
}

class InstructorRevenue {
  get = async () => {
    return axiosClient.get<InstructorRevenueResponse>(
      "/instructor-revenue/get"
    );
  };
}

const InstructorRevenueApi = new InstructorRevenue();

export default InstructorRevenueApi;
