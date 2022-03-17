import { useDispatch, useSelector } from "react-redux";
import { BE_URL, ROUTES } from "../../utils/constants";
import { Link } from "react-router-dom";
import {
  BellOutlined,
  ShoppingOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Dropdown } from "antd";
import { logout } from "../../redux/actions/account.actions";

const TopNav = () => {
  const user = useSelector((state) => state.user);
  const { cart } = useSelector((state) => state.cart);
  const { fullname, email, avatar, role } = user.profile ?? {};
  const dispatch = useDispatch();
  const handleLogout = (e) => {
    e.preventDefault();

    dispatch(logout());
  };

  const ShoppingCart = () => (
    <div className="shopping-cart">
      <Link to={ROUTES.CART} className="link">
        <ShoppingOutlined style={{ fontSize: 18 }} />
        {!cart.length ? null : (
          <span className="notification-badge">{cart.length}</span>
        )}
      </Link>
    </div>
  );

  return (
    <nav className="nav-top">
      <div className="nav-content">
        <div className="logo">
          <Link to="/">Coursewe</Link>
        </div>
        <div className="category-link">
          <Link to="/category">Danh mục khóa học</Link>
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
          <>
            <Link className="instructor" to="/instructor">
              Giảng dạy trên Devco
            </Link>
            <ShoppingCart />
            <Link className="btn-style-two login-button" to={ROUTES.SIGN_IN}>
              Đăng nhập
            </Link>
            <Link className="btn-style-two signup-button" to={ROUTES.SIGN_UP}>
              Đăng ký
            </Link>
          </>
        ) : (
          <div className="user">
            <Link to="/manage-course">Quản lý khóa học</Link>
            <Link to={ROUTES.MY_LEARNING}>My learning</Link>
            <ShoppingCart />
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
                getPopupContainer={() =>
                  document.querySelector(".user-dropdown")
                }
                trigger={["click"]}
                overlay={
                  <div className="profile-content">
                    <div className="profile-info">
                      <Link to="/profile">
                        <div className="user-img">
                          <img src={BE_URL + "/" + avatar} alt={fullname} />
                        </div>
                        <div className="account">
                          <p>{fullname}</p>
                          <span>{email}</span>
                        </div>
                      </Link>
                    </div>

                    <ul className="pages">
                      {role.name === "user" ? (
                        <>
                          <li>
                            <Link to="/dashboard">Instructor dashboard</Link>
                          </li>
                          <li>
                            <Link to="purchase-history">
                              Lịch sử thanh toán
                            </Link>
                          </li>
                        </>
                      ) : (
                        <li>
                          <Link to="/dashboard">Dashboard</Link>
                        </li>
                      )}

                      <li>
                        <Link to="/profile">Profile & settings</Link>
                      </li>
                      <li>
                        <Link to="/" onClick={(e) => handleLogout(e)}>
                          Đăng xuất
                        </Link>
                      </li>
                    </ul>
                  </div>
                }
              >
                <span className="profile-img">
                  <img src={BE_URL + "/" + avatar} alt={fullname} />
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
