import { Col, Row } from "antd";

import Course from "../../../components/Course/Course.component";
import { MdArrowForwardIos, MdArrowBackIosNew } from "react-icons/md";
import styled from "styled-components";

const StyledCarouselBtn = styled.div`
  position: absolute;
  transform: translateY(-50%);
  top: 50%;
  border: 1px solid #6a6f73;
  box-shadow: 0 2px 4px rgb(0 0 0 / 8%), 0 4px 12px rgb(0 0 0 / 8%);
  border-radius: 50%;
  width: 4.8rem;
  height: 4.8rem;
  background-color: #1c1d1f;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  top: 25%;
  z-index: 100;
  &:hover {
    background-color: #393b3f;
  }
  &.carousel-prev-btn {
    transform: translateX(-50%);
    left: 0%;
  }
  &.carousel-next-btn {
    right: 0%;
    transform: translateX(50%);
  }
`;

const CoursesBeginner = () => {
  return (
    <div>
      <h1>helloooooooooooooooooo o</h1>

      <div className="content">
        <h2 className="title">Khóa học cho người mới bắt đầu</h2>

        <div className="courses" style={{ position: "relative" }}>
          <StyledCarouselBtn className="carousel-btn carousel-prev-btn">
            <MdArrowBackIosNew />
          </StyledCarouselBtn>
          <Row gutter={10}>
            {Array.from({ length: 5 }).map((_, i) => {
              const course = {
                title: "hello everyone",
                slug: "hello",
                thumbnail:
                  "https://img-c.udemycdn.com/course/240x135/3223049_5074_2.jpg",
                rating_avg_rating: 5.0,
                rating_count: 200,
              };
              return (
                <Col flex={1}>
                  <Course key={i} course={course} />
                </Col>
              );
            })}
          </Row>
          <StyledCarouselBtn className="carousel-btn carousel-next-btn">
            <MdArrowForwardIos />
          </StyledCarouselBtn>
        </div>
      </div>
    </div>
  );
};

export default CoursesBeginner;
