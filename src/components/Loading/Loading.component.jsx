import { Spin } from "antd";
import styled from "styled-components";

const LoadingWrapper = styled.div`
  display: flex;
  align-items: center;
  min-height: calc(100vh - 7rem);
  justify-content: center;
`;

const Loading = ({ children }) => {
  return <LoadingWrapper>{children ? children : <Spin />}</LoadingWrapper>;
};
export default Loading;
