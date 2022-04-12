import { HeartOutlined } from "@ant-design/icons";
import styled from "styled-components";

const StyledButton = styled.div`
  width: 5rem;
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 0.8rem;
  border-radius: 50%;
  border: 1px solid #000;
  flex-shrink: 0;

  &:hover {
    background-color: #e9e7e7;
  }
`;

const WishlistButton = () => {
  return (
    <StyledButton className="btn">
      <HeartOutlined style={{ fontSize: "20px", color: "#000" }} />
    </StyledButton>
  );
};

export default WishlistButton;
