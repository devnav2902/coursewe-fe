import { ShoppingOutlined } from "@ant-design/icons";
import { Avatar, Badge, ConfigProvider, Empty, List, Popover } from "antd";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useAppDispatch, useTypedSelector } from "../../hooks/redux.hooks";
import { getCart } from "../../redux/slices/cart.slice";
import { ROUTES } from "../../utils/constants";
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

  const originalPrice = cart.original_price;
  const currentPrice = cart.current_price;

  const content = (
    <StyledListItems>
      <ConfigProvider
        renderEmpty={() => (
          <Empty description="Chưa có khóa học nào trong giỏ hàng!" />
        )}
      >
        <List
          footer={
            !cart.courses.length ? null : (
              <div>
                <div className="total fw-bold mb-1">
                  Tổng cộng:{" "}
                  {parseFloat(originalPrice) === parseFloat(currentPrice) ? (
                    <span>{originalPrice} VNĐ</span>
                  ) : (
                    <>
                      <span>{currentPrice} VNĐ</span>&nbsp;
                      <span
                        className="line-through"
                        style={{ color: "#6a6f73", fontWeight: "normal" }}
                      >
                        {originalPrice} VNĐ
                      </span>
                    </>
                  )}
                </div>
                <Link to={ROUTES.CART} className="btn btn-color-default w-100">
                  Xem trong giỏ hàng
                </Link>
              </div>
            )
          }
          dataSource={cart.courses}
          itemLayout="horizontal"
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                avatar={
                  <a href={ROUTES.detail_course(item.slug)}>
                    <Avatar
                      size={70}
                      shape="square"
                      src={linkThumbnail(item.thumbnail)}
                    />
                  </a>
                }
                title={
                  <a className="fw-bold" href={ROUTES.detail_course(item.slug)}>
                    {item.title}
                  </a>
                }
                description={
                  <a href={ROUTES.detail_course(item.slug)}>
                    <span className="d-block author">
                      {item.author.fullname}
                    </span>
                    <span className="fw-bold d-block price">
                      {!item.course_coupon ? (
                        <span>{item.price.format_price} VNĐ</span>
                      ) : (
                        <>
                          <span className="discount">
                            {parseInt(item.course_coupon.discount_price) ===
                            parseInt(item.price.format_price)
                              ? 0
                              : item.course_coupon.discount_price}{" "}
                            VNĐ
                          </span>
                          &nbsp;
                          <span
                            className="line-through"
                            style={{ color: "#6a6f73", fontWeight: "normal" }}
                          >
                            {item.price.format_price} VNĐ
                          </span>
                        </>
                      )}
                    </span>
                  </a>
                }
              />
            </List.Item>
          )}
        />
      </ConfigProvider>
    </StyledListItems>
  );

  return (
    <div className="shopping-cart mr-3">
      {!loadedCart ? (
        <StyledCart>
          <Badge
            color="#e260f3"
            count={cart.courses.length}
            offset={[5, 2]}
            title={`${cart.courses.length} khóa học trong giỏ hàng`}
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
                count={cart.courses.length}
                offset={[5, 2]}
                title={`${cart.courses.length} khóa học trong giỏ hàng`}
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
