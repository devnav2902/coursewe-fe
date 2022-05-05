import { ShoppingOutlined } from "@ant-design/icons";
import { Avatar, Badge, List, Popover } from "antd";
import { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useAppDispatch, useTypedSelector } from "../../hooks/redux.hooks";
import { getCart } from "../../redux/slices/cart.slice";
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

const ShoppingCart = () => {
  const userLoaded = useTypedSelector((state) => state.user.loaded);
  const { cart, loadedCart } = useTypedSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (userLoaded) dispatch(getCart());
  }, [userLoaded, dispatch]);

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

  return (
    <div className="shopping-cart mr-3">
      {!loadedCart ? (
        <StyledCart>
          <Badge
            color="#e260f3"
            count={cart.length}
            offset={[5, 2]}
            title={`${cart.length} khóa học trong giỏ hàng`}
          >
            <ShoppingOutlined style={{ fontSize: 20 }} />
          </Badge>
        </StyledCart>
      ) : (
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
      )}
    </div>
  );
};

export default ShoppingCart;
