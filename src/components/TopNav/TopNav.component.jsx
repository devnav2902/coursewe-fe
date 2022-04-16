import {
  BellOutlined,
  SearchOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";
import { Avatar, Badge, Cascader, Dropdown, List, Popover } from "antd";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import CategoriesApi from "../../api/categories.api";
import { logout } from "../../redux/actions/account.actions";
import { ROUTES, routesWithParams } from "../../utils/constants";
import { linkThumbnail } from "../../utils/functions";

const StyledCart = styled.div`
  .notification-badge {
    background-color: #e260f3;
  }
`;

const StyledListItems = styled.div`
  width: 32rem;

  .ant-spin-nested-loading {
    max-height: 250px;
    overflow-y: auto;
  }

  .price,
  .author {
    color: #000;
  }

  .author {
    color: #a08c8c;
    font-size: 1.3rem;
  }
`;

const TopNav = () => {
  const user = useSelector((state) => state.user);
  const { cart } = useSelector((state) => state.cart);
  const { fullname, email, avatar, role } = user.profile ?? {};
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = (e) => {
    e.preventDefault();

    dispatch(logout());
  };

  const [displayCascader, setDisplayCascader] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    CategoriesApi.get().then((res) => {
      const {
        data: { categories },
      } = res;
      setCategories(categories);
    });
  }, []);

  const total = useMemo(
    () =>
      cart
        .reduce((total, current) => {
          return (total += parseFloat(current.price.original_price));
        }, 0)
        .toLocaleString("vi-VN"),
    [cart]
  );

  const content = (
    <StyledListItems>
      <List
        footer={
          !cart.length ? null : (
            <div>
              <div className="total fw-bold mb-1">Tổng cộng: {total} đ</div>
              <Link to={ROUTES.CART} className="btn btn-color-default w-100">
                Xem trong giỏ hàng
              </Link>
            </div>
          )
        }
        dataSource={cart}
        itemLayout="horizontal"
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              avatar={
                <a href={routesWithParams.detail_course(item.slug)}>
                  <Avatar
                    size={70}
                    shape="square"
                    src={linkThumbnail(item.thumbnail)}
                  />
                </a>
              }
              title={
                <a
                  className="fw-bold"
                  href={routesWithParams.detail_course(item.slug)}
                >
                  {item.title}
                </a>
              }
              description={
                <a href={routesWithParams.detail_course(item.slug)}>
                  <span className="d-block author">{item.author.fullname}</span>
                  <span className="fw-bold d-block price">
                    <span className="original-price">
                      {item.price.format_price} đ
                    </span>
                    {/* <span className="discount"></span> */}
                  </span>
                </a>
              }
            />
          </List.Item>
        )}
      />
    </StyledListItems>
  );

  const ShoppingCart = () => (
    <div className="shopping-cart mr-3">
      <Popover
        placement="bottom"
        content={content}
        getPopupContainer={(e) => e}
      >
        <StyledCart>
          <Link to={ROUTES.CART} className="link">
            <Badge
              color="#e260f3"
              count={cart.length}
              offset={[5, 2]}
              title={`${cart.length} khóa học trong giỏ hàng`}
            >
              <ShoppingOutlined style={{ fontSize: 20 }} />
            </Badge>
          </Link>
        </StyledCart>
      </Popover>
    </div>
  );

  function onChange(value) {
    setDisplayCascader(false);

    const arrParams = value;
    const slug = arrParams.reduce((result, cur) => (result += `${cur}/`), "");

    slug && navigate(routesWithParams.categories(slug));
  }

  return (
    <nav className="nav-top">
      <div className="nav-content">
        <div className="logo">
          <Link to="/">Coursewe</Link>
        </div>
        <div className="category-link">
          <Cascader
            changeOnSelect={true}
            bordered={false}
            options={categories}
            expandTrigger="hover"
            dropdownClassName="categories-dropdown"
            onChange={onChange}
            value={null}
            onMouseEnter={() => setDisplayCascader(true)}
            onMouseLeave={() => setDisplayCascader(false)}
            placeholder="Danh mục"
            suffixIcon={null}
            open={displayCascader}
            getPopupContainer={(e) => e}
            fieldNames={{
              label: "name",
              value: "slug",
              children: "subcategory",
            }}
          />
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
            <Link to={ROUTES.INSTRUCTOR_COURSES}>Quản lý khóa học</Link>
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
                          <img src={linkThumbnail(avatar)} alt={fullname} />
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
                  <img src={linkThumbnail(avatar)} alt={fullname} />
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
