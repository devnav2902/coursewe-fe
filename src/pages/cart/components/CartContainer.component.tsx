import { FC } from "react";
import { useTypedSelector } from "../../../hooks/redux.hooks";
import CourseItem from "./CourseItem.component";

const CartContainer: FC = () => {
  const { cart } = useTypedSelector((state) => state.cart);
  const countCart = cart.courses.length;

  return (
    <div className="shopping-list">
      <div className="shopping-list__title">
        <span className="count">{countCart}</span> Khóa học trong giỏ hàng
      </div>
      <div className="shopping-list__course" id="cart">
        {cart.courses.map((courseItem) => (
          <CourseItem
            key={courseItem.id}
            course={courseItem}
            actionType="cart"
          />
        ))}
      </div>
    </div>
  );
};

export default CartContainer;
