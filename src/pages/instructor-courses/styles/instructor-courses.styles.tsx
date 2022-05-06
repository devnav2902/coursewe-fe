import styled from "styled-components";

export const StyledWrapper = styled.div`
  .overview-container {
    display: flex;
    min-width: 1px;
    margin-bottom: 64px;
    width: 100%;
    padding: 3rem;

    .overview-content {
      width: 100%;
      .overview-title {
        display: flex;
        flex-wrap: wrap;
        margin-bottom: 3rem;
        h2 {
          font-family: "Times New Roman", Times, serif;
          font-size: 3.5rem;
          font-weight: 800;
        }
      }
      .metrics-content {
        width: 100%;
        span {
          font-size: 1.7rem;
          color: rgb(19, 107, 107);
        }
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
        .nav-overview-container {
          width: 100%;
          position: relative;
        }
        .nav-tabs {
          display: flex;
          border-bottom: 1px solid #d1c6c6;
          .overview_admin {
            display: flex;
          }
          .ant-tabs {
            width: 100%;
          }
          li {
            z-index: 100;

            display: block;
            position: relative;
            padding: 0 15px 1rem;

            button {
              z-index: 0;
              width: 100%;
              background-color: #fff;
              padding: 1.5rem 3rem 1rem;
              color: #3e4143;
            }
          }
          .text-midnight-lighter {
            line-height: 1rem;
            font-size: 13px;
          }

          .text-midnight {
            color: #1c1d1f;
            font-size: 36px;
            font-weight: 700;
            margin-top: 1rem;
            margin-bottom: 10.5px;
            line-height: 1.1;
            color: inherit;
          }
          .text-midnight-lighter {
            line-height: 1.5rem;
          }
        }

        .tab-content .date {
          width: 100%;
          height: 4rem;
          align-items: center;
          justify-content: end;
          margin-right: 2rem;
          display: flex;
          font-size: 1.2rem;
          select {
            font-size: 1.2rem;
            padding: 2px;
            font-weight: 800;
          }
        }
        .instructor-analytics--chart {
          padding: 20px;
          width: 100%;
          min-height: 500px;
          position: relative;
        }
        .instructor-analytics--date-filter {
          height: 100%;
          margin-right: 10px;
          text-align: right;
        }
        .instructor-analytics-message {
          width: 100%;

          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
        .containerChart {
          display: none;
          height: 600px;
          canvas {
            padding: 10rem 5rem;
          }
        }
        .instructor-analytics--chart-footer {
          text-align: center;
          width: 100%;
          border-top: 1px solid #6a6f73;
          padding: 5px 0;
          a {
            padding: 6px 10px;
            font-size: 15px;
            line-height: 1.35135;

            i {
              font-size: 1.1rem;
              color: black;

              margin-left: 2px;
            }
          }
        }
      }
    }
  }
  .body-overview {
    padding: 0;
    .footer {
      .footer-content {
        max-width: 1200px;
        width: 100%;
        margin: auto;
      }
    }

    .menu {
      height: 100vh;
      z-index: 100;
      background: var(--color-white);
      padding-bottom: 5rem;
      background-color: black !important;
      width: 60px;

      ul {
        height: 100vh;
        z-index: 9999;
        width: 100%;
        display: flex;
        align-items: center;
        flex-direction: column;
        backface-visibility: hidden;
        .hover {
          transition: width 0.6s, visibility 0.3s;
          background-color: black;
          width: 0px;
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          visibility: hidden;
          &__item:hover {
            background-color: rgb(63, 61, 61);
          }
          a {
            position: relative;
            i {
              margin-right: 1rem;
            }
            i {
              transform: translateX(-50%);
              left: 30px;
              position: absolute;
            }
            .logo {
              transform: translateX(-50%);
              left: 30px;
              position: absolute;

              &__container {
                transform: translateX(-50%);
                left: 30px;
                position: absolute;
                span {
                  line-height: normal;
                }
                .first-letter {
                  opacity: 0;
                }
                .full-text {
                  transition: opacity 0.4s;
                  opacity: 0.6;
                  top: 0;
                  left: 0;
                  position: absolute;
                }
              }
            }

            span {
              margin-left: 2rem;
              line-height: 1;
              white-space: nowrap;
            }
          }
        }
        .logo {
          span {
            margin-left: 0 !important;
          }
          font-size: 3rem;
          font-weight: 700;
        }
        .menu-hover {
          position: relative;
        }
        &:hover {
          z-index: 9999;
          > li {
            visibility: hidden;
          }
          .hover {
            width: 320px;
            visibility: visible;
          }
          .full-text {
            opacity: 1 !important;
          }
        }

        a {
          height: 60px;
          color: #fff;
          align-items: center;
          display: flex;
        }
      }
    }
  }
  .main-overview-page {
    margin: 0 !important;
    max-width: 100% !important;
    .sidebar-overview {
      z-index: 1 !important;
      height: 100vh;
      background-color: #dfdfdf !important;
      margin-left: 60px !important;
    }
  }
  .main-overview-content {
    box-shadow: none !important;
    max-width: 1200px;
    width: 100% !important;
    margin: 20px auto 50px;
    min-height: 100vh;
  }
  .sidebar-menu {
    position: fixed;
    height: 100vh;
    z-index: 9999;
  }
  .activeChart {
    display: block !important;
  }
`;