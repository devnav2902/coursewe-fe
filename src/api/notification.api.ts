import { Pagination } from "../ts/types/pagination.types";
import { Notification as NotificationType } from "../ts/types/notification.types";
import axiosClient from "../utils/axios";

export type NotificationResponse = {
  notification: Pagination<[] | NotificationType[]>;
  unreadCount: number;
};

class Notification {
  get = async (page?: number) => {
    return axiosClient.get<NotificationResponse>(
      `/notification/${page ? "?page=" + page : ""}`
    );
  };

  markAsRead = async (notificationId: number) => {
    return axiosClient.patch("/notification/mark-as-read", {
      notification_id: notificationId,
    });
  };

  markAllAsRead = async () => {
    return axiosClient.patch("/notification/mark-all-as-read");
  };
}

const NotificationApi = new Notification();

export default NotificationApi;
