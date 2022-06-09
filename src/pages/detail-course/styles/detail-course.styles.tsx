import styled from "styled-components";

const StyledBtnItem = styled.div`
  padding-bottom: 1px;
  line-height: 1;
  border-bottom: #000 1px solid;
  transition: all 0.2s;
  &:hover {
    border-color: transparent;
  }
`;

const StyledCouponWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 40px;

  input {
    height: inherit;
    outline: none;
    flex-grow: 1;
    border: 1px solid #000;
    padding: 0 1rem;
  }

  button {
    background-color: rgba(0, 0, 0, 0.836);
    color: #fff;
    padding: 0 1rem;
    min-width: 10rem;
    flex-shrink: 0;
    border: none;
    height: inherit;
    &:hover {
      background-color: #000;
    }
  }

  .coupon-code {
    align-items: center;
    padding: 1rem 2rem;
  }
  button#remove {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: transparent;
    font-size: 17px;
    margin-right: 1em;
  }
  .warning {
    font-size: 14px;
    padding: 1rem 2rem;
    color: rgb(253, 80, 80);
  }
`;

const StyledCouponItem = styled.div`
  line-height: 1;
  font-size: 1.4rem;

  span {
    margin-right: 0.5rem;
  }
`;

const StyledButtonBox = styled.div`
  &.buttons-box {
    text-align: center;
    padding: 0 2rem 2rem;
    .buy,
    .enroll {
      width: 100%;
      height: 4.8rem;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .buy,
    .enroll {
      color: #000;
      background-color: transparent;
      border: 1px solid #000;
      &:hover {
        background-color: rgba(218, 218, 218, 0.31);
      }
    }
    .btn-wrapper {
      margin-bottom: 1rem;
    }

    .purchase-course {
      .txt {
        display: inline-block;
        font-weight: 600;
        margin-bottom: 1rem;
      }
    }
  }
`;

export {
  StyledBtnItem,
  StyledCouponItem,
  StyledCouponWrapper,
  StyledButtonBox,
};
