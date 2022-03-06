const CartEmpty = () => {
  return (
    <div className="shopping-list-empty">
      <img
        src="https://s.udemycdn.com/browse_components/flyout/empty-shopping-cart-v2.jpg"
        alt=""
      />
      <p>
        Giỏ hàng của bạn trống, khám phá kiến thức{" "}
        <a href="/" className="keep-shopping-action">
          tại đây
        </a>
        .
      </p>
    </div>
  );
};

export default CartEmpty;
