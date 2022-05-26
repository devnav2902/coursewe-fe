import { BellOutlined, SearchOutlined } from "@ant-design/icons";
import { Dropdown, Spin } from "antd";
import { useState } from "react";
import { FC } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useTypedSelector } from "../../hooks/redux.hooks";
import { logout } from "../../redux/slices/user.slice";
import { ROUTES } from "../../utils/constants";
import { linkThumbnail } from "../../utils/functions";
import Categories from "./Categories.component";
import ShoppingCart from "./ShoppingCart.component";

const UserImage: FC = () => {
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
  const { cart } = useTypedSelector((state) => state.cart);

  const [cartTemp, setCartTemp] = useState(0);
  const { fullname, email, role } = user.profile ?? {};
  const dispatch = useAppDispatch();

  function handleLogout() {
    dispatch(logout());
  }

  return (
    <nav className="nav-top">
      <div className="nav-content">
        <div className="logo">
          <Link to="/">Coursewe</Link>
        </div>
        <div className="category-link">
          <Categories />
        </div>
        <form action="" className="search-bar">
          <div className="icon">
            <SearchOutlined style={{ fontSize: 18 }} />
          </div>

          <input
            type="text"
            placeholder="Chào bạn! hôm nay bạn muốn học gì?"
            autoComplete="off"
            className="input-search"
            name="input-search"
          />

          <div className="search">
            <div className="search-result">
              <div className="result-search"></div>
              <div className="see-more">
                <button type="submit" className="btn btn-form a-see-more">
                  Xem thêm...
                </button>
              </div>
            </div>
          </div>
        </form>

        {!user.profile ? (
          !user.loaded ? (
            <Spin />
          ) : (
            <>
              <Link className="instructor" to={ROUTES.INSTRUCTOR_COURSES}>
                Giảng dạy trên Coursewe
              </Link>
              <ShoppingCart />
              <Link className="btn-style-two login-button" to={ROUTES.SIGN_IN}>
                Đăng nhập
              </Link>
              <Link className="btn-style-two signup-button" to={ROUTES.SIGN_UP}>
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
              <div className="icon-notification">
                {/* <div className="icon-notification @if (count($globalNotificationCourse)) has @endif"> */}
                <BellOutlined style={{ fontSize: 18 }} />
              </div>
              <div className="wrapper-notification">
                <div className="header-notification d-flex">
                  <h6>Thông báo</h6>
                  {/* <a href="{{ route('notification') }}">Xem tất cả</a> */}
                </div>

                {/* @if (!count($globalNotificationCourse))
                          <div className="notification-tab-pane center">
                              Không có thông báo mới.
                          </div>
                      @else
                          <div className="notification-tab-pane">
                              @foreach ($globalNotificationCourse as $courses)
                                  @foreach ($courses->notification_course as $notifi)
                                      @include('components.notification-item',
                                      ['notifi'=>$notifi])
                                  @endforeach
                              @endforeach
                          </div>
                      @endif */}
              </div>
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
                        <Link to="/" onClick={handleLogout}>
                          Đăng xuất
                        </Link>
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
    </nav>
  );
};
export default TopNav;
