import CourseApi from "../../api/course.api";
import cartTypes from "../types/cart.types";
import _ from "lodash";

const addToCart = (id) => async (dispatch) => {
  dispatch({ type: cartTypes.ADD_TO_CART_REQUEST });

  const { data, status } = await CourseApi.getCourseById(id);

  if (status === 200) {
    const {
      id,
      title,
      author: { fullname },
      thumbnail,
      slug,
      rating_avg_rating,
      price,

      // current_discount:{}
    } = data;

    const courses = {
      id,
      title,
      author: { fullname },
      current_discount: null,
      thumbnail,
      slug,
      rating_avg_rating,
      price,
    };

    dispatch({ type: cartTypes.ADD_TO_CART_SUCCESS, payload: courses });
  }
};

const removeFromCart = (id) => async (dispatch, getState) => {
  dispatch({ type: cartTypes.REMOVE_FROM_CART_REQUEST });

  const cartReducer = getState().cart;
  const cartItems = cartReducer.cart.filter((course) => course.id !== id);

  dispatch({ type: cartTypes.REMOVE_FROM_CART_SUCCESS, payload: cartItems });
};

const removeFromSavedForLater = (id) => async (dispatch, getState) => {
  dispatch({ type: cartTypes.REMOVE_FROM_SAVE_FOR_LATER_REQUEST });

  const cartReducer = getState().cart;
  const cartItems = cartReducer.saved_for_later.filter(
    (course) => course.id !== id
  );

  dispatch({
    type: cartTypes.REMOVE_FROM_SAVE_FOR_LATER_SUCCESS,
    payload: cartItems,
  });
};

const moveToSavedForLater = (id) => async (dispatch, getState) => {
  dispatch({ type: cartTypes.SAVE_FOR_LATER_REQUEST });

  const cartReducer = getState().cart;
  const cartItems = cartReducer.cart.filter((course) => course.id !== id);

  const course = cartReducer.cart.find((course) => course.id === id);
  const savedForLaterItems = _.cloneDeep(cartReducer.saved_for_later);
  course && savedForLaterItems.push(course);

  const payload = { saved_for_later: savedForLaterItems, cart: cartItems };
  dispatch({ type: cartTypes.SAVE_FOR_LATER_SUCCESS, payload });
};

const moveToCart = (id) => async (dispatch, getState) => {
  dispatch({ type: cartTypes.MOVE_TO_CART_REQUEST });

  const cartReducer = getState().cart;
  const savedForLaterItems = cartReducer.saved_for_later.filter(
    (course) => course.id !== id
  );

  const course = cartReducer.saved_for_later.find((course) => course.id === id);
  const cartItems = _.cloneDeep(cartReducer.cart);
  course && cartItems.push(course);

  const payload = { saved_for_later: savedForLaterItems, cart: cartItems };
  dispatch({ type: cartTypes.MOVE_TO_CART_SUCCESS, payload });
};

export {
  addToCart,
  removeFromCart,
  removeFromSavedForLater,
  moveToSavedForLater,
  moveToCart,
};
