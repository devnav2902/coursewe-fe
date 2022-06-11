import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import React from "react";
import { StyledLoadingOverlay } from "../styles/categories.styles";

const LoadingOverlay = () => {
  return (
    <StyledLoadingOverlay>
      <div className="d-flex justify-content-center">
        <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} />} />
      </div>
    </StyledLoadingOverlay>
  );
};

export default LoadingOverlay;
