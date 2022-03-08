import { Rate } from "antd";
import styled from "styled-components";

const RatingWrapper = styled.div`
  display: inline-block;
  .ant-rate {
    font-size: ${(props) => (props.size ? props.size : "20px")};
  }
  .ant-rate-star {
    color: #e59819;
    &:not(:last-child) {
      margin-right: 3px;
    }
    .anticon {
      vertical-align: auto !important;
    }
  }
`;

const Rating = ({ value, disabled, size }) => {
  return (
    <RatingWrapper size={size}>
      <Rate disabled={disabled} defaultValue={value} />
    </RatingWrapper>
  );
};

export default Rating;
