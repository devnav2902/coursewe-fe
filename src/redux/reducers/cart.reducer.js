import cartTypes from "../types/cart.types";

const initialState = {
  cart: [],
  saved_for_later: [],
  wishlist: [],
  // loaded: false,
  loading: false,
  error: null,
};

function cartReducer(state = initialState, action) {
  switch (action.type) {
    case cartTypes.ADD_TO_CART_REQUEST:
    case cartTypes.REMOVE_FROM_CART_REQUEST:
    case cartTypes.MOVE_TO_CART_REQUEST:
    case cartTypes.REMOVE_FROM_SAVE_FOR_LATER_REQUEST:
      return { ...state, loading: true };

    case cartTypes.ADD_TO_CART_SUCCESS:
      return {
        ...state,
        loading: false,
        cart: [...state.cart, action.payload],
      };

    case cartTypes.ADD_TO_CART_FAILURE:
    case cartTypes.REMOVE_FROM_CART_FAILURE:
    case cartTypes.SAVE_FOR_LATER_FAILURE:
    case cartTypes.REMOVE_FROM_SAVE_FOR_LATER_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case cartTypes.REMOVE_FROM_CART_SUCCESS:
      return { ...state, loading: false, cart: action.payload };

    case cartTypes.REMOVE_FROM_SAVE_FOR_LATER_SUCCESS:
      return { ...state, loading: false, saved_for_later: action.payload };

    case cartTypes.SAVE_FOR_LATER_SUCCESS:
    case cartTypes.MOVE_TO_CART_SUCCESS:
      return {
        ...state,
        loading: false,
        cart: action.payload.cart,
        saved_for_later: action.payload.saved_for_later,
      };

    default:
      return state;
  }
}

export default cartReducer;
