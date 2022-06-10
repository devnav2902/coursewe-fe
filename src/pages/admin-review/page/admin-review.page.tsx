import { DownOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { Dropdown, Menu, Modal, Space, Table, Tag } from "antd";
import { ColumnsType } from "antd/lib/table";
import moment from "moment";
import { useEffect, useState } from "react";
import AdminApi, { CoursesListResponse } from "../../../api/admin-review.api";
import { NotificationType } from "../../../ts/types/notification.types";
import { ROUTES } from "../../../utils/constants";
import { openNotification } from "../../../utils/functions";
import { StyledWrapper } from "../styles/admin-review.styles";
moment.locale("vi");

const { confirm } = Modal;

interface DataType {
  key: string;
  title: string;
  price: string | number;
  course_updated_at: string | number;
  author: { fullname: string; slug: string };
  course_id: number | string;
  created_at: string;
}

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
  }, []);

  const data: DataType[] = !dataCourse.data
    ? []
    : dataCourse.data.data.map((item) => {
        const { course, created_at } = item;

        console.log(item);

        return {
          key: item.id.toString(),
          price:
            parseFloat(course.price.original_price) === 0
              ? "Miễn phí"
              : course.price.format_price + " VNĐ",
          title: course.title,
          course_updated_at: course.updated_at,
          author: {
            fullname: course.author.fullname,
            slug: course.author.slug,
          },
          course_id: course.id,
          created_at,
        };
      });

  const columns: ColumnsType<DataType> = [
    {
      title: "Tên khóa học",
      dataIndex: "title",
      key: "title",
      render: (text) => <a>{text}</a>,
      width: 260,
      ellipsis: true,
    },
    {
      title: "Người tạo",
      dataIndex: ["author", "fullname"],
      key: "fullname",
      render: (text, record) => {
        return (
          <a target="_blank" href={ROUTES.instructor_bio(record.author.slug)}>
            {text}
          </a>
        );
      },
    },
    {
      title: "Giá bán",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Ngày gửi yêu cầu",
      dataIndex: "created_at",
      key: "created_at",
      render: (text) => <span>{moment(text, "YYYY-MM-DD").fromNow()}</span>,
    },
    {
      title: "Ngày cập nhật",
      dataIndex: "course_updated_at",
      key: "course_updated_at",
      render: (text) => (
        <span>{moment(text, "DD/MM/YYYY HH:mm A").fromNow()}</span>
      ),
    },
    {
      title: "Hành động",
      key: "action",
      width: 250,
      render: (_, record) => (
        <>
          <Dropdown
            className="mb-1 cursor-pointer"
            trigger={["click"]}
            overlay={
              <Menu>
                <Menu.Item key="1">
                  <a
                    target="_blank"
                    href={ROUTES.landing_page_draft(record.course_id)}
                  >
                    Trang chi tiết khóa học
                  </a>
                </Menu.Item>
                <Menu.Item key="2">Trang nội dung bài giảng</Menu.Item>
              </Menu>
            }
          >
            <Space>
              Xem chi tiết trang
              <DownOutlined />
            </Space>
          </Dropdown>
          <Dropdown
            className="cursor-pointer"
            trigger={["click"]}
            overlay={
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
            <Space>
              Lựa chọn xét duyệt
              <DownOutlined />
            </Space>
          </Dropdown>
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
        <div className="admin-table">
          <Table
            loading={!dataCourse.loaded}
            bordered
            title={() => {
              return (
                <div className="d-flex justify-content-between align-item-center">
                  <h3>Danh sách khóa học</h3>
                </div>
              );
            }}
            dataSource={data}
            columns={columns}
          />
        </div>
      </div>
    </StyledWrapper>
  );
};
export default AdminReviewPage;
