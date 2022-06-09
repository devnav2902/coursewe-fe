import styled from "styled-components";

export const StyledWrapper = styled.div`
  margin: 20px 0 50px;

  h2 {
    color: black;
    font-family: serif;
    font-size: 3rem;
  }

  .img {
    position: relative;
    height: 400px;
    text-align: center;
    img {
      height: 100%;
      object-fit: cover;
    }
  }
  .empty {
    &__header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 50px;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.151);
      margin-bottom: 4rem;
    }
  }
  .popular-courses {
    width: 100%;
    margin: auto;
  }
  .popular-courses .courses {
    display: flex;
    margin: 0 -10px;
  }
  .popular-courses .courses .wrap {
    border-radius: 15px;
    position: relative;
    width: calc(33.333% - 20px);
    margin: 10px 10px;
    min-height: 290px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    cursor: pointer;
    &:hover {
      box-shadow: 0 0 10px var(--boxshadow);
    }
    h4 {
      font-size: 16px;
      margin-bottom: 10px;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      a {
        color: var(--text-color);
      }
    }
  }

  .container {
    padding: 10px;
    flex-grow: 1;
  }

  .menu-courses {
    padding: 20px 30px;

    .menu h3 {
      color: var(--color-muted);
    }
    > ul li {
      margin-top: 20px;
      height: 120px;
      display: flex;
      align-items: center;
      cursor: pointer;
      border: 1px solid rgb(206, 206, 206);
      transition: all 0.1s linear;
      position: relative;
    }
    > ul li .img-courses {
      height: 100%;
      flex-shrink: 0;
      width: 120px;

      background-color: var(--background);
      overflow: hidden;
      img {
        height: 100%;
        width: 100%;
        object-fit: cover;
        height: 100%;
      }
    }

    &-wrapper {
      height: 48px;
      margin: 5rem 0;
      display: flex;
      align-items: center;
      .search {
        display: flex;
        height: 100%;
        margin-right: 3rem;
        input {
          outline: none;
          padding: 0 0.8rem;
          position: relative;
        }
        .icon {
          background: #000;
          width: 4.8rem;
          height: 100%;
          color: #fff;
        }
      }
      input,
      select {
        border: 1px solid #000;
        height: inherit;
      }
      select {
        padding: 0 1rem;
      }
    }
  }
  .rating-content {
    flex-shrink: 0;
    margin-left: 2rem;
  }
  .menu-courses .info {
    padding: 10px;
    max-width: 600px;
    width: 100%;
    margin-left: 15px;
    align-self: flex-start;
    height: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    &.info-hover {
      max-width: none;
      &:hover {
        &::before,
        .view {
          opacity: 1;
          visibility: visible;
        }
      }
      &::before {
        content: "";
        left: 0;
        top: 0;
        position: absolute;
        background-color: rgba(255, 255, 255, 0.9);
        width: 100%;
        height: 100%;
        opacity: 0;
        visibility: hidden;
      }
    }
    h5 {
      margin-bottom: 5px;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
    }
    time {
      font-size: 13px;
      color: rgb(54, 54, 54);
    }
    .status {
      font-size: 14px;
      margin-top: auto;
    }
  }
  .isPublished {
    margin-top: 1rem;
    span {
      font-weight: 700;
      color: black;
    }
  }
  .in-review {
    // flex-grow: 3;
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    z-index: 10;

    &::before {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      z-index: 12;
      content: "";
      left: 0;
      background-color: rgba(143, 134, 134, 0.349);
    }

    &__content {
      width: 100%;
      max-width: 320px;
      margin: auto;
      position: relative;
      z-index: 20;
      color: #000;
    }

    span:last-child {
      font-size: 1.4rem;
    }
    .in-review-top {
      svg {
        font-size: 1.4rem;
        color: rgb(55, 190, 22);
      }
      span {
        color: #000;
        font-size: 1.6rem;
        font-weight: 600;
      }
    }
  }
  .view {
    opacity: 0;
    visibility: hidden;
    color: rgb(146, 47, 146);

    display: inline-block;

    font-weight: 700;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;
