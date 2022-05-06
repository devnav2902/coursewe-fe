import { Col, Row } from "antd";
import { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MyLearningApi, {
  ArrayCustomCourses,
} from "../../../api/my-learning.api";
import Loading from "../../../components/Loading/Loading.component";
import Course from "../components/Course.component";

const MyLearningPage: FC = () => {
  const [dataLearning, setDataLearning] = useState<{
    loadedCourses: boolean;
    courses: ArrayCustomCourses;
  }>({
    loadedCourses: false,
    courses: [],
  });

  useEffect(() => {
    MyLearningApi.getCourses().then((res) => {
      const {
        data: { courses },
      } = res;

      setDataLearning((state) => ({
        ...state,
        loadedCourses: true,
        courses: courses.data,
      }));
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
          !dataLearning.loadedCourses ? (
            <Loading />
          ) : !dataLearning.courses.length ? (
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
                {dataLearning.courses.map((course) => (
                  <Col key={course.id} span={6}>
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
