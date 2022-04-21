import styled from "styled-components";
import { addToCart } from "../../redux/actions/cart.actions";
import { useDispatch, useSelector } from "react-redux";
import { Spin } from "antd";
import { Link } from "react-router-dom";
import { ROUTES } from "../../utils/constants";
import { LoadingOutlined } from "@ant-design/icons";

const StyledCartButton = styled.div`
  width: 100%;
  font-size: 1.6rem;
`;

const CartButton = ({ course }) => {
  const dispatch = useDispatch();
  const cartData = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);

  function handleAddToCart(id) {
    dispatch(addToCart(id));
  }

  function existedCourseInCart(id) {
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
