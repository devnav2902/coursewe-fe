import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { FC } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useAppDispatch, useTypedSelector } from "../../hooks/redux.hooks";
import { addToCart, getCart } from "../../redux/slices/cart.slice";
import { Course, Price } from "../../ts/types/course.types";
import { ROUTES } from "../../utils/constants";

const StyledCartButton = styled.div`
  width: 100%;
  font-size: 1.6rem;
`;

type CartButton = {
  course: Course & { price: Price };
};

const CartButton: FC<CartButton> = ({ course }) => {
  const dispatch = useAppDispatch();
  const cartData = useTypedSelector((state) => state.cart);
  const user = useTypedSelector((state) => state.user);

  function handleAddToCart(id: number) {
    dispatch(addToCart(id)).then(() => {
      dispatch(getCart());
    });
  }

  function existedCourseInCart(id: number) {
    return cartData.cart.courses.some((course) => course?.id === id);
  }

  const isPurchase = (() => {
    if (!user.profile || !course.is_purchased) return false;
    return true;
  })();

  return (
    <StyledCartButton>
      {/* Kiểm tra user đăng nhập, nếu đăng nhập sẽ sử dụng giỏ hàng từ database */}
      {!user.loaded || cartData.loading ? (
        <button className="btn btn-color-default w-100" disabled>
          <Spin indicator={<LoadingOutlined style={{ color: "#fff" }} />} />
        </button>
      ) : existedCourseInCart(course.id) ? (
        <Link to={ROUTES.CART} className="btn btn-color-default w-100">
          Xem trong giỏ hàng
        </Link>
      ) : isPurchase ? (
        <Link
          to={ROUTES.learning({ course_slug: course.slug })}
          className="btn w-100 btn-primary"
        >
          Đi đến khóa học
        </Link>
      ) : (
        <div
          className="btn btn-color-default w-100"
          onClick={() => handleAddToCart(course.id)}
        >
          Thêm vào giỏ hàng
        </div>
      )}
    </StyledCartButton>
  );
};

export default CartButton;
