import styled from "styled-components";

export const StyledInstructor = styled.div`
  padding: 20px 0;

  .slick-slide {
    padding: 10px;
  }

  .inner-box {
    text-align: center;
    padding: var(--spacing-3) var(--spacing-2) var(--spacing-3);
    display: flex;
    flex-direction: column;
    box-shadow: 0 0 2px rgba(77, 77, 77, 0.212);
    position: relative;

    background-color: var(--color-white);
    .image {
      position: relative;
      width: 10rem;
      height: 10rem;
      margin: 0 auto;
      margin-bottom: var(--spacing-2);
      box-shadow: 0 0 5px rgb(220, 219, 219);
      border-radius: 50%;
      background-color: #fff;
      z-index: 2;
      &::before {
        z-index: -1;
        content: "";
        position: absolute;
        width: 4rem;
        height: 4rem;
        border-radius: 50%;
        background-color: rgb(215, 230, 244);
        left: 1rem;
        bottom: -1rem;
      }
      &::after {
        width: 3px;
        height: 3px;
        content: "";
        position: absolute;
        z-index: -1;
        right: 2rem;
        top: -2rem;
        box-shadow: rgb(177, 205, 252) 0px 0px 0px 0px,
          rgb(177, 205, 252) -25px 25px 0px 0px,
          rgb(177, 205, 252) -10px 25px 0px 0px,
          rgb(177, 205, 252) 5px 25px 0px 0px,
          rgb(177, 205, 252) 20px 25px 0px 0px,
          rgb(177, 205, 252) 20px 40px 0px 0px,
          rgb(177, 205, 252) 5px 40px 0px 0px,
          rgb(177, 205, 252) -10px 40px 0px 0px,
          rgb(177, 205, 252) 5px 55px 0px 0px,
          rgb(177, 205, 252) 20px 55px 0px 0px,
          rgb(177, 205, 252) 20px 70px 0px 0px;
      }
      img {
        border-radius: 50%;
        object-fit: cover;
        width: 100%;
        height: 100%;
      }
    }
    .name {
      position: relative;
      color: var(--color-dark);
      font-size: 1.4rem;
      font-weight: 700;
      font-family: "Roboto", sans-serif;
    }
    .text {
      position: relative;
      color: var(--color-blue);
      font-size: 1.3rem;
      font-weight: 500;
      margin-top: auto;
    }
    .course {
      color: var(--color-muted);
      margin-bottom: var(--spacing-1);
      margin-top: var(--spacing-1);
      -webkit-line-clamp: 2;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    .course span {
      font-weight: 500;
      color: var(--color-dark);
    }
  }
  .content-wrapper {
    padding: 5rem 0 8rem;
    justify-content: center;
    > div {
      max-width: 40rem;
      margin-left: 9.6rem;
    }
    h3 {
      font-family: Georgia, "Times New Roman", Times, serif;
      font-weight: 700;
      font-size: 3.2rem;
      line-height: 1.25;
    }
    .content {
      line-height: 1.4;
      font-size: 1.9rem;
      margin-bottom: 1.6rem;
    }
    .link {
      a {
        display: inline-block;
      }
    }
  }

  .author-box {
    &__footer {
      padding-top: 20px;
      color: rgb(61, 61, 61);
    }
  }
`;

export const StyledCourseCardLarge = styled.div`
  width: 100%;
  margin: 0 1rem 2rem;
  display: flex;
  padding: 0 0 2rem;
  overflow: hidden;

  &:not(:last-child) {
    border-bottom: 1px solid #dcdacb;
  }

  .image {
    width: 260px;
    height: 145px;
    flex-shrink: 0;
    position: relative;
    overflow: hidden;
    a {
      position: relative;
      display: block;
      width: 100%;
      height: 100%;
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .content {
    display: flex;
    margin-left: 16px;
    flex-grow: 1;
    &__right {
      margin-left: auto;
      flex-shrink: 0;
    }
    &__left {
      margin-right: 2rem;
    }
  }

  .title {
    font-weight: bold;
    margin-bottom: 0;
  }
  .subtitle {
    color: #000;
    font-size: 1.4rem;
    margin-bottom: 0;
  }
  .author,
  .price {
    color: var(--color-red);
    font-size: 1.4rem;
  }
  .author {
    display: flex;
    color: #73726c;
    a {
      color: #73726c;
    }
  }
  .course-info {
    font-size: 1.4rem;
    color: #73726c;
    display: flex;
    align-items: center;
    .course-info__row {
      display: flex;
      align-items: center;

      &:not(:first-child)::before {
        content: "\\25CF";
        margin: 0 0.4rem;
        font-size: 6px;
      }
    }
  }

  .price {
    font-weight: bold;
    padding-top: 3px;
    font-size: 1.6rem;
    font-weight: bold;
    color: var(--color-dark);
  }

  .rating {
    display: flex;
    align-items: center;
    font-size: 1.3rem;
    .value {
      font-weight: bold;
      margin-right: 5px;
      color: #b4690e;
    }
    .amount {
      color: #6a6f73;
      margin-left: 4px;
    }
  }
`;

export const StyledQuickViewBox = styled.div`
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
