import { EditOutlined } from "@ant-design/icons";
import { Card, Space } from "antd";
import Meta from "antd/lib/card/Meta";
import { CoursesOfInstructor } from "api/course.api";
import { FC } from "react";
import { FiClock } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ROUTES } from "utils/constants";
import { linkThumbnail } from "utils/functions";

const placeholderImg = require("assets/images/placeholder.webp");

const StyledCourse = styled.div`
  border-radius: 16px;
  box-shadow: 0 0 2px 0 #f3f1f1, 0 6px 18px -4px #ebe5e5;
  overflow: hidden;
`;

type CourseType = CoursesOfInstructor[0];
interface Props {
  course: CourseType;
}

const Course: FC<Props> = ({ course }) => {
  const navigate = useNavigate();

  return (
    <StyledCourse>
      <Card
        cover={
          <img
            style={{ aspectRatio: "16/9", objectFit: "cover" }}
            alt={course.title}
            src={
              course.thumbnail
                ? linkThumbnail(course.thumbnail)
                : placeholderImg
            }
          />
        }
        actions={[
          !!course.submit_for_review ? (
            <Space align="center" style={{ lineHeight: 1, color: "#3d71e0" }}>
              <FiClock />
              <span>Đang được xem xét</span>
            </Space>
          ) : (
            <EditOutlined
              onClick={() =>
                !course.submit_for_review &&
                navigate(ROUTES.course_basics(course.id))
              }
              key="edit"
              style={{ fontSize: 18 }}
            />
          ),
        ]}
      >
        <Meta
          title={
            <Link
              to={
                !!course.submit_for_review
                  ? "#"
                  : ROUTES.course_basics(course.id)
              }
              title={course.title}
            >
              {course.title}
            </Link>
          }
          description={<div>Cập nhật: {course.updated_at}</div>}
        />
        <div className="status mt-3">
          {course.isPublished ? (
            <div>
              <strong className="mr-1">Công khai</strong>
              <span>Bản nháp</span>
            </div>
          ) : (
            <div>
              <span className="mr-1">Công khai</span>
              <strong>Bản nháp</strong>
            </div>
          )}
        </div>
      </Card>
    </StyledCourse>
  );
};

export default Course;
