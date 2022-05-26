import Loading from "../../../components/Loading/Loading.component";
import { useTypedSelector } from "../../../hooks/redux.hooks";
import CartContainer from "../components/CartContainer.component";
import CartEmpty from "../components/CartEmpty.component";
import CheckoutPane from "../components/CheckoutPane.component";
import SavedForLaterContainer from "../components/SavedForLaterContainer.component";

const CartPage = () => {
  const { cart, saved_for_later, loadedCart } = useTypedSelector(
    (state) => state.cart
  );

  const countCart = cart.courses.length;
  const countSavedForLater = saved_for_later.courses.length;

  return (
    <div className="shopping-cart-section">
      <div className="header-bar">
        <h1 className="shopping-cart-title">Giỏ hàng</h1>
      </div>

      {!loadedCart ? (
        <Loading />
      ) : !countCart ? (
        <>
          <CartEmpty />
          {countSavedForLater > 0 && <SavedForLaterContainer />}
        </>
      ) : (
        <div className="shopping-container">
          <div className="shopping-container__left">
            <CartContainer />

            {countSavedForLater > 0 && <SavedForLaterContainer />}
          </div>
          <div className="shopping-container__right">
            <CheckoutPane />
          </div>
        </div>
      )}
    </div>
  );
};
export default CartPage;
