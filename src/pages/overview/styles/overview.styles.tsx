import styled from "styled-components";

export const StyledOverviewWrapper = styled.div`
  .overview-title {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 2rem;
    h2 {
      font-family: "Times New Roman", Times, serif;
      font-size: 3.5rem;
      font-weight: 800;
      margin-bottom: 0;
    }
  }
  .date-range {
    padding: 2rem 2rem 0;
  }
  .metrics-content {
    .overview-body {
      border-color: #ddd;
      margin-bottom: 21px;
      background-color: #fff;
      border: 1px solid rgb(209, 198, 198);

      margin-top: 30px;
      &:hover {
        box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2);
      }
    }

    .nav-tabs {
      text-align: center;
      display: flex;
      border-bottom: 1px solid #d1c6c6;
    }

    .instructor-analytics {
      z-index: 0;
      width: 100%;
      background-color: #fff;
      padding: 1.5rem 3rem 1rem;
      color: #3e4143;
      text-align: center;
      font-size: 1.6rem;
      > div {
        font-size: 1.4rem;
        font-weight: 400;
        line-height: 1.4;
      }
      .lg-text {
        color: #1c1d1f;
        font-size: 3.2rem;
        font-weight: 400;
        margin-top: 1rem;
        margin-bottom: 1rem;
        line-height: 1.1;
      }
    }
    .containerChart {
      padding: 0 1rem 2rem;
    }
  }

  .main-overview-content {
    box-shadow: none !important;
    max-width: 1200px;
    width: 100% !important;
    margin: 20px auto 50px;
    min-height: 100vh;
  }
`;
