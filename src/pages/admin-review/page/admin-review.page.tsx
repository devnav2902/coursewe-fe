import {
  DownOutlined,
  ExclamationCircleOutlined,
  ExclamationCircleTwoTone,
  SettingTwoTone,
} from "@ant-design/icons";
import {
  Avatar,
  Dropdown,
  Menu,
  Modal,
  Popover,
  Progress,
  Space,
  Table,
  Tag,
} from "antd";
import { ColumnsType } from "antd/lib/table";
import moment from "moment";
import { useEffect, useState } from "react";
import AdminApi, { CoursesListResponse } from "api/admin-review.api";
import { NotificationType } from "ts/types/notification.types";
import { ROUTES } from "utils/constants";
import {
  linkThumbnail,
  openNotification,
  roundsTheNumber,
} from "utils/functions";
import { StyledWrapper } from "../styles/admin-review.styles";
import { RatingQualityType } from "ts/types/rating-quality.types";
import styled from "styled-components";
import Text from "antd/lib/typography/Text";
moment.locale("vi");

const { confirm } = Modal;

interface DataType {
  key: string;
  title: string;
  price: string | number;
  course_updated_at: string | number;
  author: { fullname: string; slug: string };
  course_id: number | string;
  rating_quality: RatingQualityType[];
  rating_quality_avg_rating: string | null;
}

const StyledTable = styled.div`
  box-shadow: rgb(145 158 171 / 20%) 0px 0px 2px 0px,
    rgb(145 158 171 / 12%) 0px 12px 24px -4px;
  border-radius: 16px;
  padding: 20px;
  background-color: #fff;

  table {
    td {
      vertical-align: top;
    }
  }
`;

interface CourseData {
  loaded: boolean;
  data: null | CoursesListResponse["courses"];
}

const AdminReviewPage = () => {
  const [dataCourse, setDataCourse] = useState<CourseData>({
    loaded: false,
    data: null,
  });

  useEffect(() => {
    AdminApi.getReviewCourses().then(({ data }) => {
      const { courses } = data;

      setDataCourse((state) => ({ ...state, data: courses, loaded: true }));
    });
  }, [dataCourse.loaded]);

  const data: DataType[] = !dataCourse.data
    ? []
    : dataCourse.data.data.map((item) => {
        const {
          price,
          author,
          title,
          id,
          updated_at,
          rating_quality,
          rating_quality_avg_rating,
        } = item;

        return {
          key: item.id.toString(),
          price:
            parseFloat(price.original_price) === 0
              ? "Miễn phí"
              : price.format_price + " VNĐ",
          title: title,
          course_updated_at: updated_at,
          author: {
            fullname: author.fullname,
            slug: author.slug,
          },
          course_id: id,
          rating_quality,
          rating_quality_avg_rating,
        };
      });

  const columns: ColumnsType<DataType> = [
    {
      title: "Tên khóa học",
      dataIndex: "title",
      key: "title",
      render: (text) => <a>{text}</a>,
      width: 240,
      ellipsis: true,
    },
    {
      title: "Thời hạn đánh giá",
      dataIndex: "course_updated_at",
      key: "deadline",
      render: (date, record) => {
        const restOfTheTime = (() => {
          const currentTime = moment(new Date());
          const sendedTime = moment(date, "DD/MM/YYYY HH:mm A");
          const deadline = moment(sendedTime).add(7, "days");

          const value = currentTime.diff(sendedTime);

          return deadline.subtract(value).fromNow(true);
        })();

        const percent =
          ((restOfTheTime.split(" ")[0] as unknown as number) / 7) * 100;

        return (
          <Space direction="vertical">
            <Text>Còn lại: {restOfTheTime}</Text>
            <Progress
              percent={percent}
              status={percent <= 20 ? "exception" : "active"}
              showInfo={false}
            />
          </Space>
        );
      },
    },
    {
      title: "Thành viên đã đánh giá",
      dataIndex: "rating_quality",
      key: "rating_quality",
      render: (value: RatingQualityType[], record) => {
        return value.length ? (
          <Avatar.Group>
            {value.map((item) => (
              <Avatar src={linkThumbnail(item.user.avatar)} />
            ))}
          </Avatar.Group>
        ) : (
          <div>Hiện chưa có đánh giá nào!</div>
        );
      },
    },
    {
      title: "Điểm số chất lượng hiện tại",
      dataIndex: "rating_quality_avg_rating",
      key: "rating_quality_avg_rating",
      render: (value, record) => {
        return value ? roundsTheNumber(value, 1) : "Chưa đánh giá";
      },
    },
    {
      title: "Thời gian",
      dataIndex: "course_updated_at",
      key: "course_updated_at",
      render: (text) => (
        <span>{moment(text, "DD/MM/YYYY HH:mm A").fromNow()}</span>
      ),
    },
    {
      title: "Hành động",
      key: "action",
      width: 120,
      className: "center",
      render: (_, record) => (
        <>
          <Popover
            title="Xem chi tiết trang"
            trigger={["click"]}
            placement="bottom"
            content={
              <Menu>
                <Menu.Item key="1">
                  <a
                    target="_blank"
                    href={ROUTES.landing_page_draft(record.course_id)}
                  >
                    Trang chi tiết khóa học
                  </a>
                </Menu.Item>
                <Menu.Item key="2">
                  <a
                    target="_blank"
                    href={ROUTES.check_video({ course_id: record.course_id })}
                  >
                    Trang nội dung bài giảng
                  </a>
                </Menu.Item>
              </Menu>
            }
          >
            <ExclamationCircleTwoTone
              style={{ fontSize: 22 }}
              className="mr-1"
            />
          </Popover>
          <Popover
            title="Lựa chọn xét duyệt"
            trigger={["click"]}
            placement="bottom"
            content={
              <Menu>
                <Menu.Item
                  key="1"
                  onClick={() => showConfirm(record, "approved")}
                >
                  <Tag color="green">Đồng ý</Tag>
                </Menu.Item>
                <Menu.Item
                  key="2"
                  onClick={() => showConfirm(record, "unapproved")}
                >
                  <Tag color="geekblue">Cần chỉnh sửa thêm</Tag>
                </Menu.Item>
              </Menu>
            }
          >
            <SettingTwoTone style={{ fontSize: 22 }} />
          </Popover>
        </>
      ),
    },
  ];

  function showConfirm(record: DataType, type: NotificationType) {
    confirm({
      title:
        type === "approved"
          ? `Bạn có chắc đồng ý cho khóa học "${record.title}" mở bán công khai?`
          : `Thông báo cho người dùng khóa học "${record.title}" chưa đủ yêu cầu mở bán công khai?`,
      icon: <ExclamationCircleOutlined />,

      async onOk() {
        try {
          return await new Promise((resolve, reject) => {
            AdminApi.qualityReview(record.course_id, type)
              .then((res) => {
                resolve(res);
                openNotification("success", "Xét duyệt khóa học thành công!");
                setDataCourse((state) => ({ ...state, loaded: false }));
              })
              .catch((error) => {
                reject(error);
                openNotification(
                  "error",
                  error?.response?.message ??
                    "Lỗi trong quá trình xét duyệt khóa học!"
                );
              });
          });
        } catch {
          return;
        }
      },
      onCancel() {},
      okText: "Đồng ý",
      cancelText: "Hủy bỏ",
    });
  }

  return (
    <StyledWrapper className="admin">
      <h2>Xét duyệt khóa học</h2>

      <div className="admin__review">
        <StyledTable>
          <Table
            loading={!dataCourse.loaded}
            bordered
            pagination={{ current: dataCourse.data?.current_page }}
            dataSource={data}
            columns={columns}
            expandable={{
              expandedRowRender: (record) => (
                <p style={{ margin: 0 }}>{record.author.fullname}</p>
              ),
            }}
          />
        </StyledTable>
      </div>
    </StyledWrapper>
  );
};
export default AdminReviewPage;
