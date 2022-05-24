import React from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../../utils/constants";
import styled from "styled-components";

const StyledSuccess = styled.div`
  &.payment {
    min-height: 100vh;
    position: fixed;
    width: 100%;
    top: 0;
    padding: 2rem;
    left: 0;
    z-index: 9999;
    background-color: rgba(0, 0, 0, 0.2);
  }
  .form-payment {
    transition: all 0.2s cubic-bezier(0.075, 0.82, 0.165, 1);
    max-height: calc(100vh - 6rem);
    overflow-y: auto;
    max-width: 450px;
    width: 100%;
    margin: auto;
    padding: 2rem 3rem;
    background-color: #fff;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 4px;
    table {
      width: 100%;
      margin-bottom: 2rem;
      tr {
        td:first-child {
          color: rgb(170, 151, 151);
          text-align: left;
        }
        td:last-child {
          color: rgb(102, 93, 93);
          text-align: right;
        }
      }
    }
    .shopping-list__container {
      max-height: 200px;
      overflow-y: auto;
    }
    .shopping-list {
      border-collapse: collapse;
      th,
      td {
        text-align: center !important;
        vertical-align: top;
        padding: 5px 10px;
        border: 1px solid #000;
        white-space: nowrap;
      }
      td {
        img {
          width: 50px;
          height: 50px;
          object-fit: cover;
        }
        &:nth-child(1) {
          max-width: 100px;
          overflow: hidden;
          text-overflow: ellipsis;
          width: 65%;
        }
        &:nth-child(2) {
          width: 35%;
        }
      }
    }
    .buttons {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 3rem 3rem 0;
      a {
        padding: 1rem 2rem;
        border-radius: 4px;
        color: #fff;
        font-weight: bold;
        border: 1px solid #e260f3;
        background-color: #e260f3;
        &:hover {
          background-color: rgb(202, 75, 219);
        }
        &:first-child {
          background-color: #fff;
          margin-right: 5px;
          color: #647bff;
          border: 1px solid #647bff;
          &:hover {
            background-color: rgba(240, 240, 240, 0.897);
          }
        }
      }
    }
    .icon-check {
      margin-top: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 4.5rem;
      color: #34b77a;
      margin-bottom: 1rem;
    }
    .title-payment {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 3.2rem;
      color: #34b77a;
      margin-bottom: 4rem;
    }
    .paid {
      padding: 1rem 0;
      font-size: 2rem;
      font-weight: 700;
      border-top: 1px solid rgb(204, 186, 186);
    }
  }
`;
function Success({ details }) {
  if (!details) return null;
  const {
    update_time,
    payer: {
      name: { given_name, surname },
    },
    purchase_units,
  } = details;

  let total = 0.0;
  let shoppingList = "";

  // console.log(sum);
  // courses.forEach((course) => {
  //   let purchase = 0.0;
  //   if (course.coupon) purchase = course.coupon.discount_price;
  //   else purchase = course.price.price;

  //   shoppingList += ` <tr><td>${course.title}</td><td>$${purchase}</td></tr>`;
  // });

  return (
    <StyledSuccess className="payment container">
      <div className="form-payment">
        <div className="icon-check">
          <i className="fas fa-check-circle"></i>
        </div>
        <div className="title-payment">
          <span>Thanh toán thành công</span>
        </div>
        <table>
          <tbody>
            <tr>
              <td>Thời gian thanh toán</td>
              <td>{update_time}</td>
            </tr>
            <tr>
              <td>Customer</td>
              <td>{given_name + " " + surname}</td>
            </tr>
            <tr>
              <td>Payment Method</td>
              <td>Paypal</td>
            </tr>
            <tr>
              <td>Số tiền thanh toán</td>
              <td>
                {purchase_units[0].amount.currency_code === "USD" && "$"}
                {total}
              </td>
            </tr>
          </tbody>
        </table>

        <div className="shopping-list__container">
          <table className="shopping-list">
            <thead>
              <tr>
                <th>Khóa học</th>
                <th>Thanh toán</th>
              </tr>
            </thead>
            <tbody>{shoppingList}</tbody>
          </table>
        </div>

        <div className="buttons">
          <Link to="/" className="print">
            Trở về
          </Link>
          <Link to={ROUTES.MY_LEARNING} className="button">
            Danh sách khóa học
          </Link>
        </div>
      </div>
    </StyledSuccess>
  );
}

export default Success;
