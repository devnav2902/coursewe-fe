import {
  BellOutlined,
  SearchOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Badge,
  Cascader,
  ConfigProvider,
  Dropdown,
  Empty,
  List,
  Popover,
  Spin,
} from "antd";
import { SingleValueType } from "rc-cascader/lib/Cascader";
import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import CategoriesApi from "../../api/categories.api";
import { useAppDispatch, useTypedSelector } from "../../hooks/redux.hooks";
import { logout } from "../../redux/slices/user.slice";
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
  const user = useTypedSelector((state) => state.user);
  const { cart, loadedCart } = useTypedSelector((state) => state.cart);
  const { fullname, email, avatar, role } = user.profile ?? {};
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };

  const [displayCascader, setDisplayCascader] = useState(false);
  const [categoriesData, setCategoriesData] = useState({
    loaded: false,
    data: [],
  });

  useEffect(() => {
    CategoriesApi.get().then((res) => {
      const {
        data: { categories },
      } = res;
      setCategoriesData((state) => ({
        ...state,
        data: categories,
        loaded: true,
      }));
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

  const ShoppingCart = () =>
    !loadedCart ? null : (
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

  function onChange(value: SingleValueType) {
    setDisplayCascader(false);

    const arrParams = value as string[];
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
          <ConfigProvider
            renderEmpty={() =>
              !categoriesData.loaded ? (
                <div className="d-flex align-items-center justify-content-center">
                  <Spin />
                </div>
              ) : (
                categoriesData.loaded &&
                !categoriesData.data.length && (
                  <Empty description="Chưa có danh mục nào" />
                )
              )
            }
          >
            <Cascader
              changeOnSelect={true}
              bordered={false}
              options={categoriesData.data}
              expandTrigger="hover"
              dropdownClassName="categories-dropdown"
              onChange={onChange}
              value={[]}
              loadingIcon
              allowClear={false}
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
          </ConfigProvider>
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
          )
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
                getPopupContainer={(): HTMLElement =>
                  document.querySelector(".user-dropdown") as HTMLElement
                }
                trigger={["click"]}
                overlay={
                  <div className="profile-content">
                    <div className="profile-info">
                      <Link to="/profile">
                        <div className="user-img">
                          <img
                            src={!avatar ? "" : linkThumbnail(avatar)}
                            alt={fullname}
                          />
                        </div>
                        <div className="account">
                          <p>{fullname}</p>
                          <span>{email}</span>
                        </div>
                      </Link>
                    </div>

                    <ul className="pages">
                      {role && role.name === "user" ? (
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
                        <Link to="/" onClick={handleLogout}>
                          Đăng xuất
                        </Link>
                      </li>
                    </ul>
                  </div>
                }
              >
                <span className="profile-img">
                  <img
                    src={!avatar ? "" : linkThumbnail(avatar)}
                    alt={fullname}
                  />
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
