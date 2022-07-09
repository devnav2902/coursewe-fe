import { FileProtectOutlined, PieChartOutlined } from "@ant-design/icons";
import { Breadcrumb, Dropdown, Layout, Menu } from "antd";
import Notification from "components/TopNav/Notification.component";
import { UserImage } from "components/TopNav/TopNav.component";
import { useTypedSelector } from "hooks/redux.hooks";
import { FC } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ROUTES } from "utils/constants";

const StyledLayoutWrapper = styled.div`
  background-color: #f5f5f5;
  min-height: 100vh;

  /* .ant-menu-title-content {
    display: none;
  } */

  li.ant-menu-item {
    .ant-menu-title-content {
      a {
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
`;

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

const { Content, Sider } = Layout;

const QualityReviewLayout: FC = ({ children }) => {
  const { profile } = useTypedSelector((state) => state.user);

  return (
    <StyledLayoutWrapper>
      <Layout>
        <Sider
          style={{
            background: "transparent",
            borderRight: "1px solid#ece3e3",
          }}
          width={120}
          className="site-layout-background"
        >
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            style={{
              height: "100%",
              borderRight: 0,
              background: "transparent",
              textAlign: "center",
            }}
          >
            <Menu.Item
              style={{ marginTop: "50px", marginBottom: "50px" }}
              key="1"
            >
              <Link to={ROUTES.QUALITY_COURSE_REVIEW}>
                <FileProtectOutlined style={{ fontSize: 32 }} />
              </Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to={ROUTES.QUALITY_COURSE_REVIEW}>
                <PieChartOutlined style={{ fontSize: 32 }} />
              </Link>
            </Menu.Item>
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
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    </StyledLayoutWrapper>
  );
};

export default QualityReviewLayout;
