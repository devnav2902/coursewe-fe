import { Col, Row, Skeleton as SkeletonAntd } from "antd";
import { FC } from "react";

type SkeletonProps = {
  amount: number;
  colSpan?: number;
  flex?: number;
};

const Skeleton: FC<SkeletonProps> = ({ amount = 1, colSpan = 24, flex }) => {
  return (
    <Row gutter={15}>
      {Array.from({ length: amount }).map((_, i) => (
        <Col key={i} span={colSpan} flex={flex}>
          <SkeletonAntd key={i} active />
        </Col>
      ))}
    </Row>
  );
};
export default Skeleton;
