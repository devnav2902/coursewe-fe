import { Tabs } from "antd";
import Picture from "../components/Picture.component";
import Profile from "../components/Profile.component";

const { TabPane } = Tabs;

const ProfilePage = () => {
  return (
    <div className="profile-page">
      <div className="profile-banner transparent-bgr">
        <div className="banner-wrap">
          <div className="title">Thông tin cá nhân</div>
        </div>
      </div>
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
    </div>
  );
};
export default ProfilePage;
