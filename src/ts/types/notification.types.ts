import { Bill } from "./course-bill.types";
import { Purchased } from "./course.types";

export type NotificationType =
  | "approved"
  | "unapproved"
  | "submit_for_review"
  | "purchased"
  | "quality_review";

export type NotificationEntity = {
  id: number;
  type: NotificationType;
  text_start: string;
  text_end: string;
};

export type NotificationCourse = {
  id: number;
  notification_id: number;
  course_id: number;
  course: {
    author_id: number;
    id: number;
    title: string;
    thumbnail: string | null;
    is_purchased: Purchased;
  };
};

export type NotificationPurchase = {
  id: number;
  notification_id: number;
  course_bill_id: number;
  course_bill: Bill;
};

export type NotificationQualityReview = {
  admin_id: number;
  id: number;
  notification_id: number;
};

export type Notification = {
  id: number;
  notification_entity_id: number;
  is_seen: boolean | 1 | 0;
  created_at: string;
  updated_at: string;
  notification_entity: NotificationEntity;
  notification_course: null | NotificationCourse;
  notification_purchase: null | NotificationPurchase;
  notification_quality_review: null | NotificationQualityReview;
};
