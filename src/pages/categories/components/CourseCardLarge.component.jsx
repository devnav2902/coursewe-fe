import React from "react";
import { Link } from "react-router-dom";
import Rating from "../../../components/Rating/Rating.component";
import { routesWithParams } from "../../../utils/constants";
import { Popover } from "antd";
import { HeartOutlined } from "@ant-design/icons";
import styled from "styled-components";

const StyledQuickViewBox = styled.div`
  .goal {
    font-size: 18px;
    font-weight: bold;
    padding-bottom: 10px;
  }
  .list-items {
    padding-bottom: 15px;
  }
  .desc,
  .list-items {
    width: 340px;
    line-height: 1.4;
    font-size: 14px;
  }
  .btn {
    font-weight: bold;
    font-size: 16px;
  }
  .toggle-wishlist {
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
  }
`;

const quickViewBox = (
  <StyledQuickViewBox>
    <div className="goal">Bạn sẽ nhận được</div>
    <div className="list-items">
      <li>Build your own SQL Server SELECT statements.</li>
      <li>Build your own SQL Server SELECT statements.</li>
      <li>Build your own SQL Server SELECT statements.</li>
      <li>Build your own SQL Server SELECT statements.</li>
    </div>
    <div className="quick-view-footer d-flex align-item-center">
      <button className="btn-color-default add-to-cart btn">
        Thêm vào giỏ hàng
      </button>
      <button className="toggle-wishlist">
        <HeartOutlined style={{ fontSize: "20px", color: "#000" }} />
      </button>
    </div>
  </StyledQuickViewBox>
);

const CourseCardLarge = () => {
  return (
    <Popover
      getPopupContainer={(element) => element}
      placement="top"
      content={quickViewBox}
      className="popover"
    >
      <div>
        <Link to={""} className="course-block">
          <div className="image">
            <div>
              <img
                src="https://scontent.fsgn5-6.fna.fbcdn.net/v/t39.30808-6/277248286_508260630778791_5425866134226774706_n.jpg?stp=dst-jpg_p526x296&_nc_cat=106&ccb=1-5&_nc_sid=8bfeb9&_nc_ohc=yrjevg8CcaUAX-ZeFjz&_nc_ht=scontent.fsgn5-6.fna&oh=00_AT9266guIkhWGugNdn683PlTQZuxFLXctSLYBOSlsKDN1A&oe=624C97FB"
                alt="{{ $course->title }}"
              />
            </div>
          </div>
          <div className="content d-flex">
            <div className="content__left">
              <h3 className="title truncate">
                2022 Complete Python Bootcamp From Zero to Hero in Python
              </h3>
              <p className="subtitle">
                Guide to Starting and Growing an Online Business
              </p>

              <div className="author">
                <Link to={routesWithParams.instructor_bio("...")}>
                  Nguyen anh vu
                </Link>
              </div>

              <div className="rating d-flex align-items-center">
                <span className="value">5.0</span>
                <Rating value={5} size={"13px"} />
                <span className="amount">(200)</span>
              </div>
              <div className="course-info">
                <span className="course-info__row">125 bài giảng</span>
                <span className="course-info__row">Tất cả trình độ</span>
              </div>
            </div>
            <div className="content__right">
              <div className="price">1.299.000 đ</div>
            </div>
          </div>
        </Link>
      </div>
    </Popover>
  );
};

export default CourseCardLarge;
