import { Col, Row, Pagination } from "antd";
import { FC, useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MyLearningApi, {
  ArrayCustomCourses,
} from "../../../api/my-learning.api";
import Loading from "../../../components/Loading/Loading.component";
import Course from "../components/Course.component";
import { ROUTES } from "../../../utils/constants";
import { Pagination as PaginationType } from "../../../ts/types/pagination.types";
import { StyledWrapper } from "../styles/my-learning.styles";

const MyLearningPage: FC = () => {
  const [dataLearning, setDataLearning] = useState<{
    loadedCourses: boolean;
    courses: null | PaginationType<ArrayCustomCourses>;
  }>({
    loadedCourses: false,
    courses: null,
  });

  const getCourses = useCallback((page?: number) => {
    setDataLearning((state) => ({
      ...state,
      loadedCourses: false,
    }));

    MyLearningApi.getCourses(page).then(({ data }) => {
      const { courses } = data;

      setDataLearning((state) => ({
        ...state,
        loadedCourses: true,
        courses,
      }));
    });
  }, []);

  useEffect(getCourses, [getCourses]);

  function onChangePage(page: number) {
    getCourses(page);
  }

  return (
    <StyledWrapper className="my-learning-section">
      <div className="header">
        <div className="header-bar">
          <h1>Khóa học của tôi</h1>

          <div className="bar">
            <span>Tất cả khóa học</span>
          </div>
        </div>
      </div>
      {!dataLearning.loadedCourses ? (
        <Loading />
      ) : !dataLearning?.courses?.total ? (
        <div className="txt">
          <p>Tham gia học tập với hơn 183.000 khóa học.</p>
          <p>
            Khi bạn tham gia khóa học, các khóa học sẽ xuất hiện ở đây.
            <Link to={ROUTES.home("user")}>Khám phá ngay.</Link>
          </p>
        </div>
      ) : (
        <div className="courses">
          <Row gutter={[15, 15]} className="mb-3">
            {dataLearning.courses.data.map((course) => (
              <Col key={course.id} span={6}>
                <Course
                  getCourses={getCourses}
                  key={course.id}
                  course={course}
                />
              </Col>
            ))}
          </Row>

          <Row justify="end">
            <Pagination
              onChange={onChangePage}
              pageSize={dataLearning.courses?.per_page}
              defaultCurrent={1}
              current={dataLearning.courses?.current_page}
              total={dataLearning.courses?.total}
              showSizeChanger={false}
            />
          </Row>
        </div>
      )}
    </StyledWrapper>
  );
};

export default MyLearningPage;
