import CourseApi from "../../api/course.api";
import cartTypes from "../types/cart.types";
import _ from "lodash";
import CartApi from "../../api/cart.api";

// utils
const getItemsByCartType = (type, arr) => {
  const cartItems = arr
    .map((cart) => (cart.cartType.type === type ? cart.data : null))
    .filter((val) => val)
    .at(0);

  return cartItems;
};

const addToCart = (id) => async (dispatch, getState) => {
  dispatch({ type: cartTypes.ADD_TO_CART_REQUEST });

  // Giỏ hàng database
  const user = getState().user;
  if (user.profile) {
    const { id: user_id } = user.profile;
    const { status, data } = await CartApi.addToCart({
      course_id: id,
      user_id,
    });

    if (status === 200) {
      dispatch({ type: cartTypes.ADD_TO_CART_SUCCESS, payload: data.course });
    }
  } else {
    const { data, status } = await CourseApi.getCourseById(id);
    // Giỏ hàng localstorage, Lưu để giữ thông tin cần thiết thay vì lấy data từ dtb
    if (status === 200) {
      const {
        id,
        title,
        // author: { fullname },
        // thumbnail,
        // slug,
        // rating_avg_rating,
      } = data;

      const course = {
        id,
        title,
        // author: { fullname },
        // thumbnail,
        // slug,
        // rating_avg_rating,
      };

      dispatch({ type: cartTypes.ADD_TO_CART_SUCCESS, payload: course });
    }
  }
};

const removeFromCart = (id) => async (dispatch, getState) => {
  dispatch({ type: cartTypes.REMOVE_FROM_CART_REQUEST });

  const cartReducer = getState().cart;
  const userReducer = getState().user;

  if (!userReducer.profile) {
    const cartItems = cartReducer.cart.filter((course) => course.id !== id);
    dispatch({ type: cartTypes.REMOVE_FROM_CART_SUCCESS, payload: cartItems });
  } else {
    const { status, data } = await CartApi.delete(id);

    if (status === 200) {
      const cartItems = getItemsByCartType("cart", data.shoppingCart);

      dispatch({
        type: cartTypes.REMOVE_FROM_CART_SUCCESS,
        payload: cartItems,
      });
    }
  }
};

const removeFromSavedForLater = (id) => async (dispatch, getState) => {
  dispatch({ type: cartTypes.REMOVE_FROM_SAVE_FOR_LATER_REQUEST });

  const userReducer = getState().user;
  const cartReducer = getState().cart;

  if (!userReducer.profile) {
    const cartItems = cartReducer.saved_for_later.filter(
      (course) => course.id !== id
    );

    dispatch({
      type: cartTypes.REMOVE_FROM_SAVE_FOR_LATER_SUCCESS,
      payload: cartItems,
    });
  } else {
    const { data, status } = await CartApi.delete(id);

    if (status === 200) {
      const cartItems = getItemsByCartType(
        "saved_for_later",
        data.shoppingCart
      );

      dispatch({
        type: cartTypes.REMOVE_FROM_SAVE_FOR_LATER_SUCCESS,
        payload: cartItems,
      });
    }
  }
};

const moveToSavedForLater = (id) => async (dispatch, getState) => {
  dispatch({ type: cartTypes.SAVE_FOR_LATER_REQUEST });

  const cartReducer = getState().cart;
  const userReducer = getState().user;

  if (!userReducer.profile) {
    const cartItems = cartReducer.cart.filter((course) => course.id !== id);

    const course = cartReducer.cart.find((course) => course.id === id);
    const savedForLaterItems = _.cloneDeep(cartReducer.saved_for_later);
    course && savedForLaterItems.push(course);

    const payload = { saved_for_later: savedForLaterItems, cart: cartItems };
    dispatch({ type: cartTypes.SAVE_FOR_LATER_SUCCESS, payload });
  } else {
    const { data, status } = await CartApi.savedForLater(id);

    if (status === 200) {
      const cartItems = getItemsByCartType("cart", data.shoppingCart);
      const savedForLaterItems = getItemsByCartType(
        "saved_for_later",
        data.shoppingCart
      );

      const payload = { saved_for_later: savedForLaterItems, cart: cartItems };
      dispatch({ type: cartTypes.SAVE_FOR_LATER_SUCCESS, payload });
    }
  }
};

const moveToCart = (id) => async (dispatch, getState) => {
  dispatch({ type: cartTypes.MOVE_TO_CART_REQUEST });

  const cartReducer = getState().cart;
  const userReducer = getState().user;

  if (!userReducer.profile) {
    const savedForLaterItems = cartReducer.saved_for_later.filter(
      (course) => course.id !== id
    );

    const course = cartReducer.saved_for_later.find(
      (course) => course.id === id
    );
    const cartItems = _.cloneDeep(cartReducer.cart);
    course && cartItems.push(course);

    const payload = { saved_for_later: savedForLaterItems, cart: cartItems };
    dispatch({ type: cartTypes.MOVE_TO_CART_SUCCESS, payload });
  } else {
    const { status, data } = await CartApi.addToCart({
      course_id: id,
    });

    if (status === 200) {
      const cartItems = getItemsByCartType("cart", data.shoppingCart);
      const savedForLaterItems = getItemsByCartType(
        "saved_for_later",
        data.shoppingCart
      );

      const payload = { saved_for_later: savedForLaterItems, cart: cartItems };
      dispatch({ type: cartTypes.MOVE_TO_CART_SUCCESS, payload });
    }
  }
};

// UPDATE COUPON TRONG GIỎ HÀNG
const applyCouponCourses = (id, coupon) => async (dispatch, getState) => {
  dispatch({ type: cartTypes.APPLY_COUPON_REQUEST });

  const cartReducer = getState().cart;

  const existInCart = cartReducer.cart.find((course) => course.id === id);

  if (existInCart) {
    const updatedItem = { ...existInCart, coupon };
    const newCart = cartReducer.cart.filter((course) => course.id !== id);
    newCart.push(updatedItem);

    dispatch({ type: cartTypes.APPLY_COUPON_SUCCESS, payload: newCart });
  } else {
    const existInSavedForLater = cartReducer.saved_for_later.find(
      (course) => course.id === id
    );

    if (existInSavedForLater) {
      const updatedItem = { ...existInSavedForLater, coupon };

      const currentCart = cartReducer.cart;
      currentCart.push(updatedItem);

      removeFromSavedForLater(id);

      console.log(currentCart);

      dispatch({ type: cartTypes.APPLY_COUPON_SUCCESS, payload: currentCart });
    }
  }
};

// GET CART TỪ DATABASE
const getCartFromDTB = () => async (dispatch) => {
  // User phải đăng nhập trước
  dispatch({ type: cartTypes.GET_CART_FROM_DATABASE_REQUEST });

  try {
    const res = await CartApi.get();

    const cartType = res.data.shoppingCart.reduce((result, item) => {
      const { cartType, user_id, data } = item;
      const type = cartType.type;

      return { ...result, [type]: data, user_id };
    }, {});

    dispatch({
      type: cartTypes.GET_CART_FROM_DATABASE_SUCCESS,
      payload: cartType,
    });
  } catch (error) {
    console.log(error);
  }
};

export {
  addToCart,
  removeFromCart,
  removeFromSavedForLater,
  moveToSavedForLater,
  moveToCart,
  applyCouponCourses,
  getCartFromDTB,
};
