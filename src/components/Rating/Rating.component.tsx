import { Rate } from "antd";
import styled from "styled-components";
import { FC } from "react";

const RatingWrapper = styled.div<{ size: string }>`
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
  .ant-rate-star-half {
    .ant-rate-star-second {
      color: #e7c9c9;
    }
  }
`;

type RatingProps = {
  value: string | number;
  disabled?: boolean;
  size?: string;
  count: number;
};

const Rating: FC<RatingProps> = ({
  value,
  disabled = true,
  size = "16px",
  count = 5,
}) => {
  return (
    <RatingWrapper size={size}>
      <Rate
        allowHalf
        disabled={disabled}
        defaultValue={typeof value === "number" ? value : parseFloat(value)}
        count={count}
      />
    </RatingWrapper>
  );
};

export default Rating;
