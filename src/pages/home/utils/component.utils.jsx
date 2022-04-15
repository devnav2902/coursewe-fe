import { Col, Row, Skeleton } from "antd";

const SkeletonCourses = function () {
  return (
    <Row gutter={15}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Col key={i} flex={1}>
          <Skeleton key={i} active />
        </Col>
      ))}
    </Row>
  );
};
export default SkeletonCourses;
export { SkeletonCourses };
