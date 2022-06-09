import { DownOutlined, SearchOutlined } from "@ant-design/icons";
import { Table } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminApi, { ReviewCourses } from "../../../api/admin-review.api";
import Loading from "../../../components/Loading/Loading.component";
import { CoursesPagination } from "../../../ts/types/course.types";
import { ROUTES } from "../../../utils/constants";
import { linkThumbnail } from "../../../utils/functions";

const AdminReviewPage = () => {
  const [dataCourse, setDataCourse] =
    useState<CoursesPagination<ReviewCourses> | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    AdminApi.getReviewCourses().then((res) => {
      console.log(res);

      const {
        data: { courses },
      } = res;

      setDataCourse(courses);
      setLoaded(true);
    });
  }, []);

  const item: any = [];
  const dataSource = [
    dataCourse?.data.map((data) => {
      const { course, course_id, id, updated_at } = data;

      item.push({
        key: id,
        ID: course_id,
        INSTRUCTOR: (
          <img
            src={linkThumbnail(course.author.avatar)}
            alt={course.author.fullname}
            style={{
              width: "50px",
              height: "50px",
              borderRadius: "50%",
            }}
          />
        ),
        TITLE: course.title,
        PRICE: "10 Downing Street",
        DATE: updated_at,
        ACTION: (
          <Link to={ROUTES.landing_page_draft(course_id)}>
            <button>view</button>
          </Link>
        ),
      });
    }),
  ];

  const columns = [
    {
      title: "ID",
      dataIndex: "ID",
      key: "ID",
    },
    {
      title: "INSTRUCTOR",
      dataIndex: "INSTRUCTOR",
      key: "INSTRUCTOR",
    },
    {
      title: "TITLE",
      dataIndex: "TITLE",
      key: "TITLE",
    },
    {
      title: "PRICE",
      dataIndex: "PRICE",
      key: "PRICE",
    },
    {
      title: "DATE",
      dataIndex: "DATE",
      key: "DATE",
    },
    {
      title: "ACTION",
      dataIndex: "ACTION",
      key: "ACTION",
    },
  ];
  if (!dataCourse) return null;

  return (
    <div className="admin">
      <div className="admin__review">
        <div className="d-flex align-items-center header">
          <h1>Review courses</h1>
          <div className="right">
            <span className="filter"> Filter: </span>
            <span>
              Active
              <Link to="">
                <DownOutlined
                  style={{
                    fontSize: "1.2rem",
                    marginLeft: "0.5rem",
                    color: "black",
                    fontWeight: "900",
                  }}
                />
              </Link>
            </span>
          </div>
        </div>
        <div className="admin-search">
          <SearchOutlined />
          <input type="text" placeholder="Search..." />
        </div>
        <div className="admin-table">
          {!loaded ? (
            <Loading />
          ) : !dataCourse.data.length ? (
            <Table columns={columns} key={item.id} />
          ) : (
            <Table dataSource={item} columns={columns} key={item.id} />
          )}
        </div>
      </div>
    </div>
  );
};
export default AdminReviewPage;
