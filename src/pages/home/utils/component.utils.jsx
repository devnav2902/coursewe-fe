import { Col, Row, Skeleton } from "antd";

const SkeletonCourses = function () {
  return (
    <Row gutter={15}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Col flex={1}>
          <Skeleton key={i} active />
        </Col>
      ))}
    </Row>
  );
};

export { SkeletonCourses };