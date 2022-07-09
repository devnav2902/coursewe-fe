import { Col, Row, Tabs } from "antd";
import Title from "antd/lib/typography/Title";
import RatingQualityApi, { IListCoursesResponse } from "api/rating-quality.api";
import { useCallback, useEffect, useState } from "react";
import CourseItem from "../components/CourseItem.component";

const { TabPane } = Tabs;

const QualityCourseReviewPage = () => {
  const [courseReview, setCourseReview] = useState<{
    loaded: boolean;
    result: null | IListCoursesResponse["listCourses"];
  }>({
    loaded: false,
    result: null,
  });

  const getListCourses = useCallback(() => {
    RatingQualityApi.listCourses()
      .then(({ data }) => {
        setCourseReview({ loaded: true, result: data.listCourses });
      })
      .catch(() => {
        setCourseReview({ loaded: true, result: null });
      });
  }, []);

  useEffect(getListCourses, [getListCourses]);

  return (
    <div>
      <Title level={3}>Kiểm duyệt chất lượng khóa học</Title>

      <Tabs defaultActiveKey="1">
        <TabPane tab="Khóa học cần kiểm duyệt" key="1">
          <Row gutter={[15, 15]}>
            {courseReview.result?.data.map((item, _) => {
              return (
                <Col key={item.id} span={8} xs={24} md={12} lg={8}>
                  <CourseItem data={item} />
                </Col>
              );
            })}
          </Row>
        </TabPane>
        <TabPane tab="Khóa học đã kiểm duyệt" key="2">
          Content of Tab Pane 2
        </TabPane>
      </Tabs>
    </div>
  );
};

export default QualityCourseReviewPage;
