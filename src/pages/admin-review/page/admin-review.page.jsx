import { DownOutlined, SearchOutlined } from "@ant-design/icons";
import { Table } from "antd";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminApi from "../../../api/admin-review.api";
import { BE_URL, ROUTES } from "../../../utils/constants";

const AdminReviewPage = () => {
  const [dataCourse, setDataCourse] = useState([]);

  useEffect(() => {
    AdminApi.getReviewCourses().then((res) => {
      const {
        data: { courses },
      } = res;

      setDataCourse(courses);
    });
  }, []);

  const item = [];
  const dataSource = [
    dataCourse.map((data) => {
      const { course, course_id, id } = data;
      item.push({
        ID: course_id,
        INSTRUCTOR: (
          <img
            src={BE_URL + "/" + course.author.avatar}
            alt={course.fullname}
            style={{
              width: "50px",
              height: "50px",
              borderRadius: "50%",
            }}
          />
        ),
        TITLE: course.title,
        PRICE: "10 Downing Street",
        DATE: course.updated_at,
        ACTION: (
          <Link to={ROUTES.course_draft(course_id)}>
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
          <Table dataSource={item} columns={columns} />
        </div>
      </div>
    </div>
  );
};
export default AdminReviewPage;
