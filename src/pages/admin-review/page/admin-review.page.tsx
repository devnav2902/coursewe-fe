import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Menu, Space, Table, Tag } from "antd";
import { ColumnsType } from "antd/lib/table";
import { useEffect, useState } from "react";
import AdminApi, { CoursesListResponse } from "../../../api/admin-review.api";
import { ROUTES } from "../../../utils/constants";
import { StyledWrapper } from "../styles/admin-review.styles";
import moment from "moment";
moment.locale("vi");

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
                <Menu.Item key="1">
                  <Tag color="green">Đồng ý</Tag>
                </Menu.Item>
                <Menu.Item key="2">
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
