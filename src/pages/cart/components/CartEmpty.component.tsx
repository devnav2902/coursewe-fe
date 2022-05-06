import { FC } from "react";
import { Link } from "react-router-dom";

const CartEmpty: FC = () => {
  return (
    <div className="shopping-list-empty">
      <img
        src="https://s.udemycdn.com/browse_components/flyout/empty-shopping-cart-v2.jpg"
        alt=""
      />
      <p>
        Giỏ hàng của bạn trống, khám phá kiến thức{" "}
        <Link to="/" className="keep-shopping-action">
          tại đây
        </Link>
        .
      </p>
    </div>
  );
};

export default CartEmpty;
