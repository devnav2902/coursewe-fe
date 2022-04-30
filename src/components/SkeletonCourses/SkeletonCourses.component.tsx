import { Col, Row, Skeleton } from "antd";
import { FC } from "react";

type SkeletonCourseProps = {
  amount: number;
};

const SkeletonCourses: FC<SkeletonCourseProps> = function ({ amount = 1 }) {
  return (
    <Row gutter={15}>
      {Array.from({ length: amount }).map((_, i) => (
        <Col key={i} flex={1}>
          <Skeleton key={i} active />
        </Col>
      ))}
    </Row>
  );
};
export default SkeletonCourses;
export { SkeletonCourses };
