import styled from "styled-components";

const StyledPrice = styled.div`
  &.price {
    margin-top: 3rem;
    display: flex;

    .ant-select {
      min-width: 120px !important;
    }

    .button {
      height: 100%;
      padding: 0px 2rem;
      margin-left: 2rem;
      background: black;
      color: #fff;
      &:hover {
        background: rgba(0, 0, 0, 0.9);
      }
    }
  }
`;

const StyledButtonSave = styled.div`
  button {
    flex-shrink: 0;
    &:disabled {
      cursor: not-allowed;
      background-color: #f7f9fa !important;
      border-color: #d1d7dc !important;
      color: #6a6f73 !important;
    }
  }
`;

export { StyledPrice, StyledButtonSave };
