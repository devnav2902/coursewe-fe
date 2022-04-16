import CourseItem from "./CourseItem.component";

const CartContainer = ({ countCart, shoppingCart }) => {
  return (
    <div className="shopping-list">
      <div className="shopping-list__title">
        <span className="count">{countCart}</span> Khóa học trong giỏ hàng
      </div>
      <div className="shopping-list__course" id="cart">
        {shoppingCart.cart.map((courseItem) => (
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
