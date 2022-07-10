import { SearchOutlined } from "@ant-design/icons";
import { Button, Col, Input, Pagination, Row, Select } from "antd";
import CourseApi, { CoursesOfInstructorResponse } from "api/course.api";
import Loading from "components/Loading/Loading.component";
import { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ROUTES } from "utils/constants";
import Course from "../components/Course.component";
import { StyledWrapper } from "../styles/instructor-courses.styles";

const StyledInput = styled(Input)`
  .ant-input,
  .ant-input-group > span {
    height: auto;
    border-color: #d9d9d9;
  }
`;

const InstructorCoursesPage: FC = () => {
  const [coursesData, setCoursesData] = useState<{
    courses: null | CoursesOfInstructorResponse["coursesData"];
    loaded: boolean;
  }>({
    courses: null,
    loaded: false,
  });

  useEffect(() => {
    CourseApi.getCoursesByCurrentUser().then(({ data }) => {
      setCoursesData((state) => ({
        ...state,
        loaded: true,
        courses: data.coursesData,
      }));
    });
  }, []);

  function onChangePage(page: number) {
    setCoursesData((state) => ({
      ...state,
      loaded: false,
    }));

    CourseApi.getCoursesByCurrentUser(page).then(({ data }) => {
      setCoursesData((state) => ({
        ...state,
        loaded: true,
        courses: data.coursesData,
      }));
    });
  }

  return (
    <StyledWrapper>
      {!coursesData.loaded ? (
        <Loading />
      ) : (coursesData.courses?.total as number) < 1 ? (
        <div className="empty">
          <div className="empty__header">
            <span>Bạn chưa tạo khóa học nào!</span>

            <Link className="btn-color-default btn" to={ROUTES.CREATE_COURSE}>
              Tạo khóa học mới
            </Link>
          </div>

          <div className="img">
            <img
              src="https://cdn.dribbble.com/users/2217210/screenshots/12013698/media/c5149aa66b86b923cbf219707265bf16.jpg"
              alt=""
            />
          </div>
        </div>
      ) : (
        <div className="menu-courses">
          <h2>Khóa học của bạn</h2>

          <Row align="middle" className="mb-3">
            <div className="mr-1">
              <StyledInput
                addonAfter={<SearchOutlined />}
                placeholder="Tìm kiếm khóa học..."
              />
            </div>

            <Select placeholder="Sắp xếp theo">
              <Select.Option>Mới nhất</Select.Option>
              <Select.Option>A-Z</Select.Option>
            </Select>

            <Button className="ml-auto" type="primary">
              <Link to={ROUTES.CREATE_COURSE}>Tạo khóa học mới</Link>
            </Button>
          </Row>

          <div>
            <Row gutter={[20, 20]}>
              {coursesData.courses?.data.map((course) => {
                return (
                  <Col key={course.id} span={8} sm={24} md={8}>
                    <Course course={course} />
                  </Col>
                );
              })}
            </Row>
          </div>

          <Row justify="end">
            <Pagination
              onChange={onChangePage}
              pageSize={coursesData.courses?.per_page}
              defaultCurrent={1}
              current={coursesData.courses?.current_page}
              total={coursesData.courses?.total}
            />
          </Row>
        </div>
      )}
    </StyledWrapper>
  );
};
export default InstructorCoursesPage;
