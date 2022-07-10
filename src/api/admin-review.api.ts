import { Category } from "ts/types/categories.types";
import { RatingQualityType } from "ts/types/rating-quality.types";
import { Course, Price } from "ts/types/course.types";
import { NotificationType } from "ts/types/notification.types";
import { Pagination } from "ts/types/pagination.types";
import { User } from "ts/types/user.types";
import axiosClient from "utils/axios";

interface CustomCourse {
  description: string;
  created_at: string;
  updated_at: string;
  author: User;
  price: Price;
}

export interface ReviewCourseItem extends Course, CustomCourse {
  categories: Category[];
  rating_quality: RatingQualityType[];
  rating_quality_avg_rating: null | string;
  ratings: { rating: number; votes: number }[];
}

export interface CoursesListResponse {
  courses: Pagination<ReviewCourseItem[]>;
}
class Admin {
  getReviewCourses = async () => {
    return axiosClient.get<CoursesListResponse>(
      "/admin/submission-courses-list"
    );
  };

  qualityReview = async (courseId: number | string, type: NotificationType) => {
    return axiosClient.post<CoursesListResponse>("/admin/quality-review", {
      courseId,
      type,
    });
  };
}
const AdminApi = new Admin();
export default AdminApi;
