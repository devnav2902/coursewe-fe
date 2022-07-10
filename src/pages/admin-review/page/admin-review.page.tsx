import {
  ExclamationCircleOutlined,
  ExclamationCircleTwoTone,
  SettingTwoTone,
} from "@ant-design/icons";
import {
  Avatar,
  Menu,
  Modal,
  Popover,
  Progress,
  Space,
  Table,
  Tag,
} from "antd";
import { ColumnsType } from "antd/lib/table";
import Text from "antd/lib/typography/Text";
import AdminApi, {
  CoursesListResponse,
  ReviewCourseItem,
} from "api/admin-review.api";
import moment from "moment";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { NotificationType } from "ts/types/notification.types";
import { RatingQualityType } from "ts/types/rating-quality.types";
import { ROUTES } from "utils/constants";
import {
  linkThumbnail,
  openNotification,
  roundsTheNumber,
} from "utils/functions";
import ExpandedRow from "../components/ExpandedRow.component";
import { StyledWrapper } from "../styles/admin-review.styles";
moment.locale("vi");

const { confirm } = Modal;

interface DataType extends ReviewCourseItem {}

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

  const data: DataType[] = !dataCourse.data ? [] : dataCourse.data.data;

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
      dataIndex: "updated_at",
      key: "deadline",
      render: (date, _) => {
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
      key: "rating_quality_team",
      render: (value: RatingQualityType[], record) => {
        return value.length ? (
          <Avatar.Group>
            {value.map((item) => (
              <Avatar key={item.id} src={linkThumbnail(item.user.avatar)} />
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
      dataIndex: "updated_at",
      key: "updated_at",
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
                    href={ROUTES.landing_page_draft(record.id)}
                  >
                    Trang chi tiết khóa học
                  </a>
                </Menu.Item>
                <Menu.Item key="2">
                  <a
                    target="_blank"
                    href={ROUTES.check_video({ course_id: record.id })}
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
            AdminApi.qualityReview(record.id, type)
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
            rowKey="id"
            expandable={{
              expandedRowRender: (record) => <ExpandedRow record={record} />,
            }}
          />
        </StyledTable>
      </div>
    </StyledWrapper>
  );
};
export default AdminReviewPage;
