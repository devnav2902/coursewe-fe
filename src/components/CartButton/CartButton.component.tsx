import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { FC } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useTypedSelector } from "../../hooks/redux.hooks";
import { addToCart } from "../../redux/slices/cart.slice";
import { Course } from "../../ts/types/course.types";
import { ROUTES } from "../../utils/constants";

const StyledCartButton = styled.div`
  width: 100%;
  font-size: 1.6rem;
`;

type CartButton = {
  course: Course;
};

const CartButton: FC<CartButton> = ({ course }) => {
  const dispatch = useDispatch();
  const cartData = useTypedSelector((state) => state.cart);
  const user = useTypedSelector((state) => state.user);

  function handleAddToCart(id: number) {
    dispatch(addToCart(id));
  }

  function existedCourseInCart(id: number) {
    return cartData.cart.some((course) => course.id === id);
  }

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
