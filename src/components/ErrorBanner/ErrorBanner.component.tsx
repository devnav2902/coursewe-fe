import { Alert, Col } from "antd";
import { FC } from "react";

type ErrorBannerProps = {
  error: { message: string } | string;
  span?: number;
  offset?: number;
};

const ErrorBanner: FC<ErrorBannerProps> = ({
  error,
  span = 24,
  offset = 0,
}) => {
  return !error ? null : (
    <Col span={span} style={{ marginTop: 5, padding: 0 }} offset={offset}>
      {typeof error === "string" ? (
        <Alert message={error} banner style={{ whiteSpace: "break-spaces" }} />
      ) : (
        error && <Alert message={error.message} banner />
      )}
    </Col>
  );
};

export default ErrorBanner;
