import { Col, Row } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LearningApi from "../../../api/learning.api";
import Course from "../components/Course.component";

const MyLearningPage = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    LearningApi.getCourses().then((res) => {
      const {
        data: { courses },
      } = res;
      setCourses(courses.data);
      // console.log(data.courses);
    });
  }, []);

  return (
    <div>
      <div className="my-learning-section">
        <div className="my-learning-section__header">
          <div className="header-bar">
            <h1>Khóa học của tôi</h1>

            <div className="bar">
              <span>Tất cả khóa học</span>
            </div>
          </div>
        </div>
        {
          !courses.length ? (
            <div className="txt">
              <p>Start learning from over 183,000 courses today.</p>
              <p>
                When you enroll in a course, it will appear here.
                <Link to="{{ route('category') }}">Browse now.</Link>
              </p>
            </div>
          ) : (
            <div className="my-learning-section__courses">
              <Row gutter={[15, 15]}>
                {courses.map((course) => (
                  <Col span={6}>
                    <Course key={course.id} course={course} />
                  </Col>
                ))}
              </Row>
            </div>
          )
          // $courses->links()
        }
      </div>
    </div>
  );
};

export default MyLearningPage;
