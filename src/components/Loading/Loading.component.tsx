import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { FC } from "react";
import styled from "styled-components";

const LoadingWrapper = styled.div`
  display: flex;
  align-items: center;
  min-height: calc(95vh - 7rem);
  justify-content: center;
`;

type SpinSize = "small" | "default" | "large" | number;

const Loading: FC<{ size?: SpinSize }> = ({ children, size = 48 }) => {
  return (
    <LoadingWrapper>
      {children ? (
        children
      ) : (
        <Spin
          indicator={
            <LoadingOutlined
              style={{ fontSize: typeof size === "number" ? size : undefined }}
            />
          }
          size={typeof size !== "number" ? size : undefined}
        />
      )}
    </LoadingWrapper>
  );
};
export default Loading;
