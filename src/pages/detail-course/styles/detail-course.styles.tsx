import styled from "styled-components";

export const StyledCourseContent = styled.div`
  width: 100%;
  position: relative;
  max-width: calc(100% - 40rem);
`;

export const StyledDetailCourseWrapper = styled.div`
  position: relative;
`;

export const StyledDetailCourseMain = styled.div`
  .head-wrapper.linear-gradient {
    background: linear-gradient(to right, #fcd8a8, #f3dabb, #fde9d0);

    .head {
      padding: 5rem 2rem;
      max-width: 1200px;
      margin: 0 auto;
      width: 100%;
    }

    .head-content {
      flex-grow: 1;
      padding-right: 4rem;
      position: relative;
      z-index: 20;
      &::after,
      &::before {
        position: absolute;
        content: "";
        border-radius: 50%;
        z-index: -1;
      }
      &::after {
        top: 32%;
        left: 56%;
        width: 115px;
        height: 115px;
        background-color: #f5d7b2;
      }
      &::before {
        width: 256px;
        height: 256px;
        top: -100px;
        left: 70%;
        background-color: #f3d6b1;
      }
    }
  }

  .nav-top {
    display: none;
    background-color: #000;
    color: #fff;
    &.nav-top-fixed {
      display: block;
    }
  }
  .info-course {
    .title {
      font-weight: bold;
    }
    .rating-content {
      margin-top: 0.5rem;
      > span:not(:last-child) {
        color: #b9770b !important;
      }
      span {
        font-size: 1.4rem;
      }
    }
  }

  .title {
    h1 {
      margin-bottom: 1rem;
      color: #77562b;
      line-height: 1.3;
      font-size: 3.8rem;
    }
  }

  .rating-content {
    margin-top: 1.5rem;
    line-height: 1;
    > span {
      &:not(:last-child) {
        color: #b9770b;
      }
      font-weight: bold;
      font-size: 1.6rem;
      margin-right: 3px;
      display: inline-block;
    }
    > div {
      margin: 0 0.5rem;
    }
    .rating-count {
      color: #8e7557 !important;
      margin-right: 1rem;
    }

    span i {
      font-size: 1.3rem;
      transform: translateY(-1px);
    }
  }

  .head-sidebar {
    flex: 0 0 36rem;
    &.fixed {
      .widget-content {
        position: fixed !important;
        top: 2rem;
        z-index: 9901;
        .intro-video {
          display: none;
        }
      }
    }
    .widget-content {
      transition: all 0.2s;
      border-radius: 15px;
      width: 36rem;
      z-index: 23;
      position: absolute;
      overflow: hidden;
      background-color: var(--color-white);
      box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2);
    }
    .intro-video {
      position: relative;
      text-align: center;
      display: block;
      overflow: hidden;
      padding: 6rem 0px 3rem;
      background-repeat: no-repeat;
      background-size: cover;
      cursor: pointer;
    }
    .intro-video-play {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .intro-video h4 {
      color: #fff;
      font-weight: 800;
      font-size: 1.5rem;
      margin-top: var(--spacing-2);
      text-transform: capitalize;
      position: relative;
      z-index: 11;
    }
    .intro-video-box {
      background-color: #fff;
      border-radius: 50%;
      width: 50px;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      z-index: 20;
      font-size: 24px;

      svg {
        padding-left: 3px;
        color: black;
      }
    }
    .intro-video:before {
      position: absolute;
      content: "";
      left: 0px;
      top: 0px;
      right: 0px;
      z-index: 10;
      width: 100%;
      height: 100%;
      bottom: 0px;
      background-color: rgba(95, 32, 32, 0.6);
    }

    .infor-course {
      padding: 1.5rem 2rem;
      h4 {
        font-size: 16px;
        font-weight: 700;
        margin-bottom: 1rem;
      }
      li {
        font-size: 14px;
        padding: 5px 0;
      }
    }
    .widget-content .price {
      position: relative;
      display: flex;
      align-items: center;
      font-weight: 700;
      font-size: 3.2rem;
      color: #3c3b37;
      padding: 1.5rem 2rem;
    }
    .sale-off {
      text-decoration: line-through;
      margin: 0 10px;
      color: rgb(99, 98, 98);
    }
    .discount-price {
      font-size: 2.8rem;
    }
    .original-price.sale-off,
    .discount {
      font-size: 14px;
      font-weight: 500;
    }

    .time-left {
      position: relative;
      color: var(--color-muted);
      font-size: 1.4rem;
      margin-top: var(--spacing-1);
      margin-bottom: var(--spacing-2);
      text-align: center;
      font-weight: 500;
    }
  }
`;

export const StyledMainContent = styled.div`
  display: flex;
  padding: var(--spacing-2);
  width: 100%;
  max-width: 1200px;
  margin: auto;

  .course-info {
    &__item {
      > p {
        font-size: 2.4rem;
        font-weight: 700;
        margin-bottom: 2rem;
        display: inline-block;
      }
      &.border {
        border: 1px solid #d1d7dc;
      }

      &:not(:last-child) {
        margin-bottom: 3rem;
      }
      .ant-collapse-item {
        background-color: #f7f9fa;
      }
    }
  }

  .video-box {
    position: relative;
    overflow: hidden;
    margin-top: var(--spacing-2);
    border-radius: 3px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 5%);
  }
  .video-image {
    position: relative;
    img {
      position: relative;
      width: 100%;
      z-index: 3;
    }
  }

  h6 {
    position: relative;
    color: var(--color-dark);
    font-size: 2.4rem;
    font-weight: 700;
    margin-bottom: 2.5rem;
  }
`;

export const StyledInfoBoxed = styled.div`
  position: relative;
  padding-top: 25px;
  margin-bottom: 25px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  h6 {
    position: relative;
    color: #000;
    font-weight: 700;
    margin-bottom: var(--spacing-1);
  }
  .info-author {
    display: flex;
    align-items: center;
  }
  .authors {
    a {
      color: var(--color-dark);
      font-size: 1.4rem;
      font-weight: 700;
      display: flex;
      align-items: center;
    }
  }

  .follow {
    position: relative;
    margin-left: 1.6rem;
  }
  .follow a {
    position: relative;
    color: var(--color-blue);
    font-size: 1.4rem;
    font-weight: 700;
  }
  .social-box .share {
    position: relative;
    color: #000;
    font-size: 1.6rem;
    font-weight: 700;
    display: block;
    margin-bottom: var(--spacing-1);
  }
  .social-box li {
    position: relative;
    margin: 0px 4px;
    display: inline-block;
  }
  .social-box svg {
    position: relative;
    font-size: 24px;
    color: var(--color-blue);
    text-align: center;
  }
`;

export const StyledVideoDemo = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 99999;
  background-color: rgba(0, 0, 0, 0.6);
  &.hidden {
    display: none;
  }
  .video-container {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .react-player {
      aspect-ratio: 16/9;
    }
    .video {
      max-width: 600px;
      width: 100%;
      padding: 3rem;
      background-color: black;
      .video-top {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .video-top-left {
          h5 {
            margin-bottom: 1rem;
            color: rgb(202, 185, 185);
          }
        }
        .video-top-right {
          svg {
            font-size: 18px;
            cursor: pointer;
            color: #fff;
            &:hover {
              color: rgb(228, 217, 217);
            }
          }
        }
      }
      h4 {
        margin-bottom: 2rem;
        font-size: 2rem;
        color: #fff;
      }
    }
  }
`;

export const StyledStudentReviewBox = styled.div`
  position: relative;
  padding: 3rem;
  position: relative;
  display: flex;
  flex-wrap: wrap;

  // rating
  .rating-column {
    flex: 0 0 20%;
  }
  .inner-column {
    text-align: center;
  }
  .total-rating {
    position: relative;
    color: #be5a0e;
    font-size: 6.4rem;
    line-height: 1;
    font-weight: 700;
    margin-bottom: 1rem;
  }
  .rating {
    position: relative;
    color: var(--color-red);
    font-size: 1.4rem;
  }
  .title {
    color: #be5a0e;
    font-size: 1.4rem;
    font-weight: 700;
    margin-top: 1rem;
  }
  // graph-column
  .graph-column {
    padding-right: 15px;
    padding-left: 15px;
    flex: 0 0 80%;
  }
  .skill-item {
    margin-bottom: 1rem;
  }

  .skill-bar {
    display: flex;
    align-items: center;
  }
  .bar-inner {
    position: relative;
    flex-grow: 1;
    overflow: hidden;
    height: 8px;
    background: #dcdacb;
  }
  .bar-inner .bar {
    position: absolute;
    left: 0px;
    top: 0px;
    height: 8px;
    width: 0%;
    background-color: #73726c;
    transition: all 2s ease;
  }
  .skill-bar .rating {
    text-align: right;
    flex: 0 0 14rem;
    margin-top: -3px;
    position: relative;
    font-family: var(--font);
    font-size: 1.2rem;
    margin-left: var(--spacing-3);
    display: flex;
    font-weight: 700;
    align-items: center;
  }
  .stars {
    margin-right: 1rem;
  }
`;

export const StyledReviewComments = styled.div`
  .comment-box {
    padding: 0 3rem;
  }
  .reviewer-comment-box {
    position: relative;
    display: flex;
    margin-bottom: 2rem;
    padding-bottom: 2rem;
    &:not(:last-child) {
      border-bottom: 1px solid var(--color-border);
    }
  }

  h4 {
    position: relative;
    color: var(--color-dark);
    font-weight: 700;
    font-size: 1.6rem;
    margin-bottom: 0.5rem;
  }
  .user-img {
    margin-right: 2rem;
    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      flex-shrink: 0;
      object-fit: cover;
    }
  }
  .text {
    color: var(--color-dark);
    font-size: 1.4rem;
    line-height: 1.6;
    margin-top: 0.5rem;
    font-weight: 400;
  }
  .helpful {
    color: var(--color-red);
    font-size: 1.3rem;
    margin: var(--spacing-1) 0;
  }
  .like-option {
    margin-bottom: 0;
    display: flex;
    align-items: center;
  }
  .icon {
    width: 3.6rem;
    height: 3.6rem;
    color: #2896a9;
    font-size: 18px;
    cursor: pointer;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #2896a9;
    margin-right: var(--spacing-1);
    &:hover {
      border-color: #1c6a78;
    }
  }
  .rating {
    > span {
      display: inline-block;
      margin-left: 1rem;
    }
  }
`;

export const StyledBtnItem = styled.div`
  padding-bottom: 1px;
  line-height: 1;
  border-bottom: #000 1px solid;
  transition: all 0.2s;
  &:hover {
    border-color: transparent;
  }
`;

export const StyledCouponWrapper = styled.div`
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

export const StyledCouponItem = styled.div`
  line-height: 1;
  font-size: 1.4rem;

  span {
    margin-right: 0.5rem;
  }
`;

export const StyledButtonBox = styled.div`
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
