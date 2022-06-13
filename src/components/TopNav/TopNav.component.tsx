import { Dropdown } from "antd";
import { FC } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useTypedSelector } from "../../hooks/redux.hooks";
import { logout } from "../../redux/slices/user.slice";
import { ROUTES } from "../../utils/constants";
import { linkThumbnail } from "../../utils/functions";
import Categories from "./Categories.component";

import Notification from "./Notification.component";
import PostFiltersForm from "./PostFiltersForm.component";
import ShoppingCart from "./ShoppingCart.component";

export const UserImage: FC = () => {
  const { profile } = useTypedSelector((state) => state.user);

  return (
    <div className="user-img w-100 h-100 d-flex align-items-center justify-content-center">
      {!profile?.avatar ? (
        <div
          className="first-letter w-100 h-100 d-flex align-items-center justify-content-center fw-bold"
          style={{
            background: "#9a9a9a",
            color: "#fff",
            fontSize: "1.8rem",
          }}
        >
          {profile?.fullname?.charAt(0).toUpperCase()}
        </div>
      ) : (
        <img
          src={!profile?.avatar ? "" : linkThumbnail(profile?.avatar)}
          alt={profile?.fullname}
        />
      )}
    </div>
  );
};

const TopNav: FC = () => {
  const user = useTypedSelector((state) => state.user);

  const { fullname, email, role } = user.profile ?? {};

  return (
    <nav className="nav-top">
      <div className="nav-content">
        <div className="nav-content-left">
          <div className="logo">
            <Link to="/">Coursewe</Link>
          </div>
          <div className="category-link">
            <Categories />
          </div>
          <PostFiltersForm />
        </div>
        <div className="nav-content-right">
          {!user.profile ? (
            !user.loaded ? null : (
              <>
                <a className="instructor" href={ROUTES.INSTRUCTOR_COURSES}>
                  Giảng dạy trên Coursewe
                </a>
                <ShoppingCart />
                <Link className="btn login-button" to={ROUTES.SIGN_IN}>
                  Đăng nhập
                </Link>
                <Link
                  className="btn btn-primary signup-button"
                  to={ROUTES.SIGN_UP}
                >
                  Đăng ký
                </Link>
              </>
            )
          ) : (
            <div className="user">
              {role?.name === "user" ? (
                <>
                  <Link to={ROUTES.INSTRUCTOR_COURSES}>Quản lý khóa học</Link>
                  <Link to={ROUTES.MY_LEARNING}>Học tập</Link>
                  <ShoppingCart />
                </>
              ) : (
                <Link to={ROUTES.OVERVIEW}>Dashboard</Link>
              )}
              <div className="notification">
                <Notification />
              </div>

              <div className="user-dropdown">
                <Dropdown
                  placement="topRight"
                  getPopupContainer={(): HTMLElement =>
                    document.querySelector(".user-dropdown") as HTMLElement
                  }
                  trigger={["click"]}
                  overlay={
                    <div className="profile-content">
                      <div className="profile-info">
                        <Link to={ROUTES.PROFILE}>
                          <UserImage />
                          <div className="account">
                            <p>{fullname}</p>
                            <span>{email}</span>
                          </div>
                        </Link>
                      </div>

                      <ul className="pages">
                        {role && role.name === "user" ? (
                          <li>
                            <Link to={ROUTES.PURCHASE_HISTORY}>
                              Lịch sử thanh toán
                            </Link>
                          </li>
                        ) : (
                          <li>
                            <Link to={ROUTES.OVERVIEW}>Dashboard</Link>
                          </li>
                        )}

                        <li>
                          <Link to={ROUTES.PROFILE}>Thông tin cá nhân</Link>
                        </li>
                        <li>
                          <a href={ROUTES.SIGN_OUT}>Đăng xuất</a>
                        </li>
                      </ul>
                    </div>
                  }
                >
                  <span className="profile-img">
                    <UserImage />
                  </span>
                </Dropdown>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
export default TopNav;
