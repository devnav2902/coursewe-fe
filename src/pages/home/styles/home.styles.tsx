import styled from "styled-components";

export const StyledWrapper = styled.div`
  position: relative;

  .page-wrapper {
    max-width: 1440px;
    margin: 0 auto !important;
    &__content {
      padding: 0 2.4rem;
    }
  }
  .section-title {
    margin-bottom: 2.4rem;
    font-family: Georgia, "Times New Roman", Times, serif;
    font-weight: 700;
    line-height: 1.25;
    font-size: 3.2rem;
  }
  .slick-slide {
    padding: 0 10px;
  }

  .banner-content {
    margin-bottom: 30px;
    overflow: hidden;
    position: relative;
    z-index: 10;
    img {
      width: 100vw;
      object-fit: cover;
    }

    .content-box {
      position: absolute;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 8%), 0 4px 12px rgba(0, 0, 0, 8%);
      padding: 2.4rem;
      max-width: 38rem;
      left: 4.8rem;
      top: 2.4rem;
      display: flex;
      flex-direction: column;
      box-shadow: none;
      background: #fff;

      h1 {
        margin-bottom: 8px;
        font-size: 3.2rem;
        line-height: 1.25;
        font-family: Georgia, "Times New Roman", Times, serif;
      }
      p {
        font-size: 1.9rem;
      }
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
  }
`;
