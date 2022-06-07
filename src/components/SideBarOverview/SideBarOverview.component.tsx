import {
  BarChartOutlined,
  FundProjectionScreenOutlined,
} from "@ant-design/icons";
import { MdVideoSettings } from "react-icons/md";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useTypedSelector } from "../../hooks/redux.hooks";
import { Role } from "../../ts/types/user.types";
import { ROUTES } from "../../utils/constants";

const StyledSidebar = styled.div`
  position: fixed;
  height: 100vh;
  z-index: 9999;
  top: 0;

  .menu {
    height: 100vh;
    z-index: 100;
    background: #fff;
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

      &:hover {
        .hover {
          width: 320px;
          visibility: visible;
        }
        .full-text {
          opacity: 1 !important;
        }
        > li {
          visibility: hidden;
        }
      }

      .logo {
        font-size: 3rem;
        font-weight: 700;
        span {
          margin-left: 0 !important;
        }
      }

      a {
        height: 60px;
        color: #fff;
        align-items: center;
        display: flex;
      }

      .hover {
        transition: width 0.6s, visibility 0.3s;
        background-color: black;
        width: 0px;
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        visibility: hidden;

        &__item {
          &:hover {
            background-color: #3f3d3d;
          }
          span {
            display: flex;
            align-items: center;
            margin-left: 5rem;
            white-space: nowrap;
            &.anticon {
              margin-left: 0;
            }
          }

          svg {
            transform: translateX(-50%);
            left: 30px;
            position: absolute;
          }
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

        .logo__container {
          transform: translateX(-50%);
          left: 30px;
          position: absolute;

          span {
            line-height: 1;
          }
        }
      }
    }
  }
`;

const SideBarOverview = () => {
  const { profile } = useTypedSelector((state) => state.user);
  const role = profile?.role.name as Role;

  return (
    <StyledSidebar className="sidebar-menu">
      <div className="menu">
        <ul>
          <li>
            <Link className="logo" to={ROUTES.home(role)}>
              <span>C</span>
            </Link>
          </li>
          <li>
            <Link to={ROUTES.OVERVIEW}>
              <BarChartOutlined style={{ fontSize: "22px" }} />
            </Link>
          </li>
          {role === "user" && (
            <li>
              <Link to={ROUTES.INSTRUCTOR_COURSES}>
                <FundProjectionScreenOutlined style={{ fontSize: "22px" }} />
              </Link>
            </li>
          )}
          {role === "admin" && (
            <li>
              <Link to={ROUTES.ADMIN_REVIEW}>
                <MdVideoSettings style={{ fontSize: "22px" }} />
              </Link>
            </li>
          )}
          <div className="hover">
            <div className="hover__item">
              <Link className="logo" to={ROUTES.home(role)}>
                <div className="logo__container">
                  <span className="first-letter">C</span>
                  <span className="full-text">Coursewe</span>
                </div>
              </Link>
            </div>
            <div className="hover__item">
              <Link to={ROUTES.OVERVIEW}>
                <BarChartOutlined style={{ fontSize: "22px" }} />
                <span>Tổng quan</span>
              </Link>
            </div>
            {role === "user" && (
              <div className="hover__item">
                <Link to={ROUTES.INSTRUCTOR_COURSES}>
                  <FundProjectionScreenOutlined style={{ fontSize: "22px" }} />
                  <span>Quản lý khóa học</span>
                </Link>
              </div>
            )}

            {role === "admin" && (
              <div className="hover__item">
                <Link to={ROUTES.ADMIN_REVIEW}>
                  <MdVideoSettings style={{ fontSize: "22px" }} />
                  <span>Xét duyệt khóa học</span>
                </Link>
              </div>
            )}
          </div>
        </ul>
      </div>
    </StyledSidebar>
  );
};
export default SideBarOverview;
