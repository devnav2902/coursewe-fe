import { List } from "antd";
import { Dispatch, FC, SetStateAction, useState } from "react";
import { Link } from "react-router-dom";
import {
  Notification,
  NotificationCourse,
  NotificationPurchase,
} from "../../ts/types/notification.types";
import { ROUTES } from "../../utils/constants";
import { linkThumbnail } from "../../utils/functions";
import moment from "moment";
import "moment/locale/vi";
import NotificationApi from "../../api/notification.api";
import { NotificationData } from "./Notification.component";
moment.locale("vi");

type Props = {
  item: Notification;
  markAllAsRead: boolean;
  setNotificationData: Dispatch<SetStateAction<NotificationData>>;
};

const NotificationItem: FC<Props> = ({
  item,
  markAllAsRead,
  setNotificationData,
}) => {
  const {
    notification_entity: { text_start, text_end, type },
    notification_course,
    notification_purchase,
    created_at,
    is_seen,
    id,
  } = item;

  const [markAsReadValue, setMarkAsReadValue] = useState(is_seen);

  let text = "";
  let src = "";
  let path = "#";
  let time = moment(created_at).fromNow();

  switch (true) {
    case !!notification_course: {
      const course = (notification_course as NotificationCourse).course;
      const title = course.title;

      text = title;
      src = course.thumbnail;
      path = ROUTES.INSTRUCTOR_COURSES;

      break;
    }
    case !!notification_purchase: {
      const courseBill = (notification_purchase as NotificationPurchase)
        .course_bill;
      const title = courseBill.title;

      text = title;
      src = courseBill.thumbnail;
      path = ROUTES.MY_LEARNING;

      break;
    }

    default:
      break;
  }

  function markAsRead() {
    if (!markAsReadValue) {
      NotificationApi.markAsRead(id).then((res) => {
        setMarkAsReadValue(1);
        setNotificationData((state) => ({
          ...state,
          unreadCount: state.unreadCount - 1,
        }));
      });
    }
  }

  return (
    <List.Item>
      <Link
        onClick={markAsRead}
        to={path}
        className={markAsReadValue || markAllAsRead ? "is-seen" : ""}
      >
        <div className="d-flex">
          <div className="img">
            <img src={linkThumbnail(src)} alt={text} />
          </div>
          <div>
            <span className="d-block">
              {text_start} <b>{text}</b>
              {type === "purchased" ? "," : ""} {text_end}
            </span>

            {created_at && <time>{time}</time>}
          </div>
        </div>
      </Link>
    </List.Item>
  );
};

export default NotificationItem;
