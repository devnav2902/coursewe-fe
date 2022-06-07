import { Dropdown, Menu } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Notification from "../../components/TopNav/Notification.component";
import { UserImage } from "../../components/TopNav/TopNav.component";
import { useTypedSelector } from "../../hooks/redux.hooks";
import { ROUTES } from "../../utils/constants";

const StyledNavTop = styled.nav`
  .nav-content {
    position: fixed;
    width: 100%;
    left: 0;
    display: flex;
    align-items: center;
    height: 7rem;
    padding: 0 2rem;
    z-index: 9999;
    .user {
      margin-left: auto;
      display: flex;
      align-items: center;

      .notification {
        margin-right: 2.5rem;
      }

      .user-img {
        width: 48px;
        height: 48px;
        overflow: hidden;
        border-radius: 50%;

        img {
          object-fit: cover;
          width: 100%;
          height: 100%;
        }
      }

      .user-dropdown {
        .ant-dropdown-menu-item:first-child {
          &:hover {
            background-color: transparent;
          }
        }
      }
    }
  }
`;

export const NavTop = () => {
  const user = useTypedSelector((state) => state.user);

  return (
    <StyledNavTop className="dashboard-nav">
      <div className="nav-content">
        <div className="user">
          <div className="notification">
            <Notification />
          </div>

          <div className="user-dropdown">
            <Dropdown
              arrow
              placement="bottomRight"
              getPopupContainer={(): HTMLElement =>
                document.querySelector(".user-dropdown") as HTMLElement
              }
              trigger={["hover"]}
              overlayStyle={{ minWidth: 260 }}
              overlay={
                <Menu style={{ padding: 10 }}>
                  <Menu.Item key="0">
                    <div className="mb-3">
                      <div className="profile-content">
                        <div className="profile-info">
                          <Link to={ROUTES.PROFILE} className="d-flex">
                            <UserImage />
                            <div className="account ml-1">
                              <b className="d-block">
                                {user.profile?.fullname}
                              </b>
                              <span className="d-block">
                                {user.profile?.email}
                              </span>
                            </div>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </Menu.Item>
                  <Menu.Item key="1">
                    <Link to={ROUTES.PROFILE}>Thông tin cá nhân</Link>
                  </Menu.Item>
                  <Menu.Item key="2">
                    <a href={ROUTES.SIGN_OUT}>Đăng xuất</a>
                  </Menu.Item>
                </Menu>
              }
            >
              <div className="cursor-pointer profile-img">
                <UserImage />
              </div>
            </Dropdown>
          </div>
        </div>
      </div>
    </StyledNavTop>
  );
};
