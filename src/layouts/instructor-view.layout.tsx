import {
  BarChartOutlined,
  FundProjectionScreenOutlined,
  UsergroupAddOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Dropdown, Layout, Menu } from "antd";
import SubMenu from "antd/lib/menu/SubMenu";
import { FC, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Notification from "../components/TopNav/Notification.component";
import { UserImage } from "../components/TopNav/TopNav.component";
import { useTypedSelector } from "../hooks/redux.hooks";
import { Role } from "../ts/types/user.types";
import { ROUTES } from "../utils/constants";

const StyledNavTop = styled.nav`
  .nav-content {
    width: 100%;
    display: flex;
    align-items: center;
    height: 7rem;
    padding: 0 2rem;
    background-color: #fff;

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

const StyledLogo = styled.div`
  font-size: 24px;
  text-align: center;
  color: #fff;
  font-weight: bold;
  padding: 10px;
`;

const OverviewLayout: FC = ({ children }) => {
  const { Content, Sider } = Layout;

  const [collapsed, setCollapsed] = useState(false);

  const { profile } = useTypedSelector((state) => state.user);
  const role = profile?.role.name as Role;

  const onCollapse = (collapsed: boolean) => {
    setCollapsed(collapsed);
  };

  return (
    <>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={onCollapse}
          width={280}
        >
          <StyledLogo>
            <Link className="logo" to={ROUTES.home(role)}>
              <span>Coursewe</span>
            </Link>
          </StyledLogo>
          <Menu theme="dark" mode="inline">
            <Menu.Item key="1">
              <Link to={ROUTES.OVERVIEW}>
                <BarChartOutlined style={{ fontSize: "22px" }} />
                <span>Tổng quan</span>
              </Link>
            </Menu.Item>
            {role === "user" && (
              <Menu.Item key="2">
                <Link to={ROUTES.INSTRUCTOR_COURSES}>
                  <FundProjectionScreenOutlined style={{ fontSize: "22px" }} />
                  <span>Quản lý khóa học</span>
                </Link>
              </Menu.Item>
            )}
            {role === "admin" && (
              <>
                <Menu.Item key="3">
                  <Link to={ROUTES.ADMIN_REVIEW}>
                    <VideoCameraOutlined style={{ fontSize: "22px" }} />
                    <span>Xét duyệt khóa học</span>
                  </Link>
                </Menu.Item>

                <SubMenu
                  key="sub1"
                  title={
                    <span>
                      <UsergroupAddOutlined style={{ fontSize: 20 }} />
                      <span>Quản lý người dùng</span>
                    </span>
                  }
                >
                  <Menu.Item key="4">Học viên</Menu.Item>
                  <Menu.Item key="5">Giảng viên</Menu.Item>
                  <Menu.Item key="6">
                    <Link to={ROUTES.QUALITY_REVIEW}>Đội ngũ chuyên môn</Link>
                  </Menu.Item>
                </SubMenu>
              </>
            )}

            {/* <Menu.Item key="3">
              <Link to={ROUTES.ADMIN_REVIEW}>
                <VideoCameraOutlined style={{ fontSize: "22px" }} />
                <span>Quản lý người dùng</span>
              </Link>
            </Menu.Item> */}
          </Menu>
        </Sider>
        <Layout>
          <div>
            <StyledNavTop className="dashboard-nav">
              <div className="nav-content">
                <Breadcrumb style={{ margin: "16px 0" }}>
                  <Breadcrumb.Item>User</Breadcrumb.Item>
                  <Breadcrumb.Item>Bill</Breadcrumb.Item>
                </Breadcrumb>

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
                                        {profile?.fullname}
                                      </b>
                                      <span className="d-block">
                                        {profile?.email}
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
          </div>
          <Content style={{ margin: "0 16px" }}>
            <main className="pd-2">{children}</main>
          </Content>
        </Layout>
      </Layout>
      );
    </>
    // <StyledWrapper>
    //   <NavTop />
    //   <div className="main-page spacing-top-nav">
    //     <SideBarOverview />
    //     <main>{children}</main>
    //   </div>
    // </StyledWrapper>
  );
};
export default OverviewLayout;
