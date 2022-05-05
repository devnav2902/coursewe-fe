import styled from "styled-components";

export const StyledCouponTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  border: 1px solid rgb(153, 153, 153);
  th,
  td {
    text-align: left;
    padding: 1rem;
    vertical-align: top;
    border: 1px solid rgb(153, 153, 153);
  }
  tr th {
    white-space: nowrap;
  }
  span {
    display: block;
    margin-bottom: 8px;
  }
`;

export const StyledPromotionsWrapper = styled.div`
  &.promotions {
    .col-coupon {
      border: 1px solid #6a6f73;
      padding: 1.5rem;
      transition: all 0.2s;
      &:hover {
        background-color: #cadfff;
      }
      .ant-radio-inner {
        border-color: #000;
        &::after {
          background: #000;
        }
      }
    }

    .coupons {
      margin-top: 3rem;

      .font-heading {
        font-size: 2rem;
        font-weight: 700;
        margin-bottom: 2rem;
      }
      .button-create-coupon {
        background-color: #000;
        padding: 1rem;
        color: #fff;
        font-weight: bold;
      }
      .optional {
        font-weight: 400;
        text-transform: capitalize;
        color: #9a9fa3;
      }
    }

    .table-container {
      border: 1px solid rgb(153, 153, 153);
      padding: 3rem 3rem 4rem;
      .month-coupons {
        font-weight: 700;
      }

      .center {
        text-align: center;
      }
      .content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .create-coupon {
          height: 35px;
          padding: 0 10px;
          background: #000;
          color: #fff;
          &:hover {
            background: rgba(0, 0, 0, 0.8);
          }
        }
        &.content-coupons {
          flex-direction: column;
        }
        &-header__info {
          width: 100%;
          align-items: center;
          justify-content: space-between;
          .notification {
            color: rgb(236, 51, 51);
          }
        }
        .coupon {
          margin-bottom: 2rem;
          &-wrapper {
            display: flex;
            align-items: center;
            height: 40px;
            padding: 20px;
            input {
              height: inherit;
              outline: none;
              flex-grow: 1;
              border: 1px solid #000;
              padding: 0 2rem;
            }
            button {
              background-color: rgba(0, 0, 0, 0.836);
              color: #fff;
              padding: 0 3rem;
              border: none;
              height: inherit;
              &:hover {
                background-color: #000;
              }
            }
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

          &-code__description {
            font-size: 14px;
            margin-bottom: 2rem;
          }
          &-code {
            margin-bottom: 3rem;
            span,
            input {
              display: block;
            }
            span {
              margin-bottom: 1rem;
            }
            input {
              width: 100%;
            }
          }
        }
        .radio {
          > span {
            font-weight: bold;
            display: inline-block;
            padding-bottom: 2rem;
          }
          &-grid {
            align-items: center;
            padding-bottom: 2rem;
          }
          &-item {
            display: flex;
            align-items: center;
            &:not(:last-child) {
              margin-right: 3rem;
            }
          }
          &-item label {
            display: inline-block;
            margin-left: 5px;
            padding-bottom: 2px;
          }
        }
        .data-input {
          display: inline-flex;
          height: 4rem;
          align-items: center;
          width: 100%;
          transition: all 0.3s linear;
          --color-border: rgb(240, 240, 240);

          &:focus-within {
            --color-border: rgb(216, 216, 216);
          }
          input {
            font-size: 18px;
            text-align: right;
            border-color: var(--color-border);
          }
          > span {
            display: flex;
            border: 1px solid var(--color-border);
            align-items: center;
            padding: 0 12px;
            background-color: var(--color-border);
            height: inherit;
            flex-shrink: 0;
          }
        }
        .price-coupon {
          margin-bottom: 2rem;

          input {
            text-align: right;
          }
        }
        .data-coupon {
          .cancel {
            color: blueviolet;
          }

          #code {
            width: 100%;
            padding: 1rem 1.2rem;
          }
          &__wrapper {
            flex-wrap: wrap;
            margin: 0 -2rem;

            --max-width: 360px;
          }
          &__type,
          &__info {
            width: calc(50% - 4rem);
            margin: 0 2rem;
          }
          &__info {
            padding-top: 4rem;
            td,
            th {
              border: 1px solid #999999;
            }
          }

          &__input:not(:empty) {
            max-width: var(--max-width);
            margin-bottom: 2rem;
            input {
              width: 100%;
            }
            label {
              margin-bottom: 1rem;
              display: inline-block;
              color: #9d9d9d;
            }
          }
        }

        .button-coupon {
          width: 100%;
          max-width: var(--max-width);
          background-color: rgb(253, 92, 92);
          color: #fff;
          padding: 1rem 1.2rem;
          font-weight: 500;
          &:disabled {
            background-color: #ff9e9e;
          }
          &:not(:disabled):hover {
            background-color: rgb(255, 105, 105);
          }
        }

        .message {
          padding-top: 2rem;
          li {
            font-size: 14px;
            list-style: circle;
          }
        }
      }
    }
  }
`;
