import styled from "styled-components";

export const StyledWrapper = styled.div`
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
    .menu h3 {
      color: var(--color-muted);
    }
  }
  .rating-content {
    flex-shrink: 0;
    margin-left: 2rem;
  }
`;
