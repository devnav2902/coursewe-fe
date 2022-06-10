import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import { Breadcrumb, Tabs } from "antd";
import { FC } from "react";
import { useTypedSelector } from "../../../hooks/redux.hooks";
import { ROUTES } from "../../../utils/constants";
import Picture from "../components/Picture.component";
import Profile from "../components/Profile.component";
import { StyledBanner, StyledProfile } from "../styles/profile.styles";

const { TabPane } = Tabs;

const ProfilePage: FC = () => {
  const { profile: user } = useTypedSelector((state) => state.user);
  return (
    <StyledProfile>
      <StyledBanner>
        <div className="banner-wrap">
          <Breadcrumb>
            <Breadcrumb.Item
              href={ROUTES.home(user?.role.name === "admin" ? "admin" : "user")}
            >
              <HomeOutlined />
              <span>Trang chủ</span>
            </Breadcrumb.Item>
            <Breadcrumb.Item href={ROUTES.PROFILE}>
              <UserOutlined />
              <span>Thông tin cá nhân</span>
            </Breadcrumb.Item>
          </Breadcrumb>
          <div className="title">Thông tin cá nhân</div>
        </div>
      </StyledBanner>
      <div className="profile-page__main">
        <Tabs defaultActiveKey="1">
          <TabPane tab="Profile" key="1">
            <Profile />
          </TabPane>
          <TabPane tab="Hình đại diện" key="2">
            <Picture />
          </TabPane>
          {/* <TabPane tab="Mật khẩu" key="3">
            <div className="title">Đổi mật khẩu</div>
            <div className="form-group">
              <div className="group">
                <Input
                  label={"Mật khẩu cũ"}
                  type={"password"}
                  name="old_password"
                  register={register}
                />
              </div>
              <div className="group">
                <Input
                  label={"Mật khẩu mới"}
                  type={"text"}
                  name="new_password"
                  register={register}
                />
              </div>
            </div>
          </TabPane> */}
        </Tabs>
      </div>
    </StyledProfile>
  );
};
export default ProfilePage;
