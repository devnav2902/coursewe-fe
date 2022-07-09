import { Col, Row, Tabs } from "antd";
import Text from "antd/lib/typography/Text";
import Title from "antd/lib/typography/Title";
import RatingQualityApi, { IListCoursesResponse } from "api/rating-quality.api";
import LoadingOverlay from "pages/categories/components/LoadingOverlay.component";
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
    <div style={{ position: "relative" }}>
      <Title level={3}>Kiểm duyệt chất lượng khóa học</Title>

      <Tabs defaultActiveKey="1">
        <TabPane tab="Khóa học cần kiểm duyệt" key="1">
          <Row gutter={[15, 15]}>
            {!courseReview.loaded ? (
              <LoadingOverlay />
            ) : (courseReview.result?.data.length as number) < 1 ? (
              <Col span={24} className="center pd-2">
                <Text strong>Chưa có khóa học cần xét duyệt!</Text>
              </Col>
            ) : (
              courseReview.result?.data.map((item, _) => {
                return (
                  <Col key={item.id} span={8} xs={24} md={12} lg={8}>
                    <CourseItem data={item} getListCourses={getListCourses} />
                  </Col>
                );
              })
            )}
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
