import React from "react";
import {
  FundProjectionScreenOutlined,
  EyeOutlined,
  BarChartOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { ROUTES } from "../../utils/constants";
const SideBarOverview = () => {
  const {
    profile: {
      role: { name },
    },
  } = useSelector((state) => state.user);

  return (
    <div className="sidebar-menu">
      <div className="menu">
        <ul>
          <li>
            <Link className="logo" to="/">
              <span>D</span>
            </Link>
          </li>
          <li>
            <Link to={ROUTES.INSTRUCTOR_COURSES}>
              <FundProjectionScreenOutlined style={{ fontSize: "22px" }} />
            </Link>
          </li>
          <li>
            <Link to={ROUTES.OVERVIEW}>
              <BarChartOutlined style={{ fontSize: "22px" }} />
            </Link>
          </li>
          {name === "admin" && (
            <li>
              <a
                href="{{
                                    route('submission-courses-list')
                                }}"
              >
                <EyeOutlined style={{ fontSize: "22px" }} />
              </a>
            </li>
          )}
          <div className="hover">
            <div className="hover__item">
              <Link className="logo" to="/">
                <div className="logo__container">
                  <span className="first-letter">D</span>
                  <span className="full-text">Devco</span>
                </div>
              </Link>
            </div>
            <div className="hover__item">
              <Link to={ROUTES.INSTRUCTOR_COURSES}>
                <FundProjectionScreenOutlined style={{ fontSize: "22px" }} />
                <span>Courses</span>
              </Link>
            </div>
            <div className="hover__item">
              <Link to={ROUTES.OVERVIEW}>
                <BarChartOutlined style={{ fontSize: "22px" }} />
                <span>Performance</span>
              </Link>
            </div>
            {name === "admin" && (
              <div className="hover__item">
                <a
                  href="{{
                                        route('submission-courses-list')
                                    }}"
                >
                  <EyeOutlined style={{ fontSize: "22px" }} />
                  <span>Review courses</span>
                </a>
              </div>
            )}
          </div>
        </ul>
      </div>
    </div>
  );
};
export default SideBarOverview;
