import styled from "styled-components";

export const StyledInstructorBioContainer = styled.div`
  &.profile {
    display: flex;
    margin: auto;
    padding: 3rem 0;
    max-width: 92rem;
    h2 {
      color: #3c3b37;
    }
  }
  .instructor-profile--left-column {
    margin-right: 5rem;
    flex: 1;
    .info-title {
      padding: 2.4rem 0 1.6rem;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
        Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
      font-size: 1.9rem;
    }
    .instructor {
      text-transform: uppercase;
      font-size: 1.7rem;
      color: #73726c;
      font-weight: 700;
    }

    .name-author {
      font-size: 4rem;
      line-height: 1.2;
      color: #3c3b37;
    }

    .instructor-profile {
      display: flex;
      margin-top: 2.4rem;
      .total-tag {
        margin-right: 3rem;
      }
      .heading-sm {
        font-weight: 600;
        color: #73726c;
        margin-bottom: 0.8rem;
      }
      .number {
        color: #3c3b37;
        font-weight: 700;
        font-size: 2.4rem;
      }
    }
  }
  .instructor-profile--right-column {
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    .avatar {
      border-radius: 50%;
      object-fit: cover;
      width: 20rem;
      height: 20rem;
      margin-bottom: 2rem;
    }
    .socical-link {
      display: flex;
      flex-direction: column;
      width: 20rem;
    }
    .socical-link {
      background-color: transparent;
      border: 1px solid #2896a9;
      margin-top: 0.8rem;
      height: 4.8rem;
      align-items: center;
      border-radius: 4px;
      min-width: 10rem;
      padding: 0 1.2rem;
      display: flex;
      justify-content: center;
      cursor: pointer;
    }
    .socical-link a {
      text-decoration: none;
      color: #0f7c90;
      font-weight: 700;
      font-size: 1.6rem;
      display: flex;
      align-items: center;
    }
    .socical-link a svg {
      margin-right: 0.5rem;
    }
  }

  /* ------------------- */
  .show-more {
    .content {
      font-weight: 400;
      max-width: 60rem;
      overflow: hidden;
      position: relative;
    }
  }

  .btn-show {
    background-color: transparent;
    color: #0f7c90;
    font-weight: 600;
    border: none;
    cursor: pointer;
  }

  // .opacity-show-less {
  //     width: 100%;
  //     height: 5rem;
  //     opacity: 1;
  //     position: absolute;
  //     bottom: 0;
  //     left: 0;
  //     background-color: rgba(255, 255, 255, 0.5);
  // }
`;
export const StyledUserProfile = styled.div`
  &.user-profile {
    .user-profile-content {
      padding: 50px;
      max-width: 992px;
      margin: auto;
    }
    .user-profile__left {
      margin-right: 40px;
    }
    img {
      width: 128px;
      height: 128px;
      object-fit: cover;
    }
    h2 {
      font-size: 14px;
      margin-bottom: 1rem;
    }
    .social-box {
      max-width: 128px;
      li:not(:last-child) {
        margin-right: 10px;
      }
      a {
        color: #2f47cf;
      }
      svg {
        font-size: 18px;
      }
    }
  }
`;
