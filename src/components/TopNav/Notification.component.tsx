import { BellOutlined } from "@ant-design/icons";
import { Badge, Button, Dropdown, List, Menu, Popover } from "antd";
import { useEffect, useState } from "react";
import { HiOutlineCheck } from "react-icons/hi";
import { IoEllipsisHorizontal } from "react-icons/io5";
import styled from "styled-components";
import NotificationApi, {
  NotificationResponse,
} from "../../api/notification.api";
import NotificationItem from "./NotificationItem.component";

const StyledListItems = styled.div`
  width: 32rem;

  .ant-spin-nested-loading {
    max-height: 32rem;
    padding: 5px;
    overflow-y: auto;
  }

  a {
    color: #000;
    &:hover {
      color: #0b77db;
    }
  }

  .img {
    width: 6.4rem;
    height: 6.4rem;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 1rem;
    flex-shrink: 0;

    img {
      object-fit: cover;
      width: 100%;
      height: 100%;
    }
  }

  time {
    color: #1876f2;
  }

  .is-seen {
    opacity: 0.6;
  }

  .ant-dropdown {
    top: 38px !important;
  }
`;

export interface NotificationData {
  loaded: boolean;
  notification: null | NotificationResponse["notification"];
  unreadCount: 0 | NotificationResponse["unreadCount"];
}

const Notification = () => {
  const [notificationData, setNotificationData] = useState<NotificationData>({
    loaded: false,
    notification: null,
    unreadCount: 0,
  });

  const [loading, setLoading] = useState(false); // using for "LOAD MORE" AND "MARK ALL AS READ"
  const [markAllAsReadValue, setMarkAllAsReadValue] = useState(false);

  useEffect(() => {
    NotificationApi.get().then(({ data }) => {
      setNotificationData({
        loaded: true,
        notification: data.notification,
        unreadCount: data.unreadCount,
      });
    });
  }, []);

  const data = notificationData.notification?.data;
  const currentPage = notificationData.notification?.current_page ?? 0;
  const lastPage = notificationData.notification?.last_page ?? 0;

  function onLoadMore() {
    setLoading(true);

    if (notificationData.notification) {
      const currentPage = notificationData.notification.current_page;
      const oldData = [...notificationData.notification.data];

      NotificationApi.get(currentPage + 1).then(({ data }) => {
        setNotificationData({
          loaded: true,
          notification: {
            ...data.notification,
            data: [...oldData, ...data.notification.data],
          },
          unreadCount: data.unreadCount,
        });

        setLoading(false);
      });
    }
  }

  function markAllAsRead() {
    if (!markAllAsReadValue && notificationData.unreadCount) {
      setLoading(true);

      NotificationApi.markAllAsRead().then((res) => {
        setLoading(false);
        setMarkAllAsReadValue(true);
      });
    }
  }

  const loadMore =
    notificationData.loaded && currentPage < lastPage ? (
      <div
        style={{
          textAlign: "center",
          marginTop: 12,
          height: 32,
          lineHeight: "32px",
        }}
      >
        <Button loading={loading} onClick={onLoadMore}>
          Tải thêm
        </Button>
      </div>
    ) : null;

  const menu = (
    <Menu>
      <Menu.Item key="1">
        <div onClick={markAllAsRead} className="d-flex align-items-center">
          <HiOutlineCheck fontSize={20} />
          <span className="ml-1">Đánh dấu tất cả là đã đọc</span>
        </div>
      </Menu.Item>
    </Menu>
  );

  const content = (
    <StyledListItems>
      <List
        className={loading ? "loading-pulse" : ""}
        loading={!notificationData.loaded}
        itemLayout="horizontal"
        dataSource={data}
        header={
          <div className="d-flex align-items-center justify-content-between">
            <h3>Thông báo</h3>
            <Dropdown
              overlay={menu}
              overlayStyle={{ zIndex: 2000 }}
              getPopupContainer={(e) => e}
              trigger={["click"]}
            >
              <div className="cursor-pointer">
                <IoEllipsisHorizontal fontSize={26} />
              </div>
            </Dropdown>
          </div>
        }
        loadMore={loadMore}
        renderItem={(item) => (
          <NotificationItem
            item={item}
            setNotificationData={setNotificationData}
            markAllAsRead={markAllAsReadValue}
          />
        )}
      />
    </StyledListItems>
  );

  return (
    <div className="icon-notification">
      <Popover
        placement="bottomRight"
        getPopupContainer={(e) => e}
        content={content}
      >
        <Badge
          color="#e260f3"
          count={markAllAsReadValue ? 0 : notificationData.unreadCount}
          offset={[5, 2]}
          overflowCount={9}
          showZero={false}
        >
          <BellOutlined className="cursor-pointer" style={{ fontSize: 20 }} />
        </Badge>
      </Popover>
    </div>
  );
};

export default Notification;
