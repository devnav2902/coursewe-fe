import userActions from "../types/user.types";

const initialState = {
  loading: false,
  data: [],
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case userActions.USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case userActions.USER_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    case userActions.USER_FAILURE:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
}
