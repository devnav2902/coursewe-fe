import styled from "styled-components";

const StyledCarouselBtn = styled.div`
  position: absolute;
  transform: translateY(-50%);
  top: 50%;
  border: 1px solid #6a6f73;
  box-shadow: 0 2px 4px rgb(0 0 0 / 8%), 0 4px 12px rgb(0 0 0 / 8%);
  border-radius: 50%;
  width: 4.8rem;
  height: 4.8rem;
  background-color: #1c1d1f;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  top: 25%;
  z-index: 100;
  &:hover {
    background-color: #393b3f;
  }
  &.carousel-prev-btn {
    transform: translateX(-50%);
    left: 10px;
  }
  &.carousel-next-btn {
    right: 10px;
    transform: translateX(50%);
  }

  &.slick-disabled {
    display: none;
  }
`;

export { StyledCarouselBtn };
