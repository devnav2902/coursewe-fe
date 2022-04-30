import styled from "styled-components";

export const StyledPurchaseHistoryContainer = styled.div`
  min-height: 80vh;
  padding: 3rem;
  .title {
    font-size: 3.2rem;
    font-weight: bold;
    font-family: Georgia, "Times New Roman", Times, serif;
  }
  .bars {
    border-bottom: 1px solid #00000050;
    .bar__item {
      padding: 3rem 0 1rem;
      font-weight: bold;
      position: relative;
      display: inline-block;
      &::before {
        z-index: 10;
        content: "";
        position: absolute;
        bottom: -1px;
        left: 0;
        width: 100%;
        height: 2px;
        background-color: #000000;
      }
    }
  }
  .purchase-content {
    .empty {
      text-align: center;
      padding: 5rem;
      i {
        width: 6rem;
        height: 6rem;
        text-align: center;
        line-height: 6rem;
        background: #f5f5f5;
        border-radius: 50%;
      }
      p {
        padding: 2rem;
        color: #00000080;
      }
    }

    .list-item {
      padding: 3rem 0;
    }
    table {
      width: 100%;
      border-collapse: collapse;
    }
    thead {
      background: #ebebeb;
    }
    td,
    th {
      text-align: left;
      border: 1px solid #00000080;
      padding: 1rem 2rem;
    }
  }
`;
