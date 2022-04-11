import { Rate } from "antd";
import styled from "styled-components";

const RatingWrapper = styled.div`
  display: inline-block;
  line-height: 0;
  .ant-rate {
    font-size: ${(props) => (props.size ? props.size : "20px")};
  }
  .ant-rate-star {
    color: #e59819;
    &:not(:last-child) {
      margin-right: 3px;
    }
  }
  .ant-rate-star-zero {
    .ant-rate-star-first,
    .ant-rate-star-second {
      color: #e7c9c9;
    }
  }
`;

const Rating = ({ value, disabled = true, size }) => {
  return (
    <RatingWrapper size={size}>
      <Rate allowHalf disabled={disabled} defaultValue={value} />
    </RatingWrapper>
  );
};

export default Rating;
