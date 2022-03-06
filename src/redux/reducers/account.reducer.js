import accountTypes from "../types/account.types";

const initialState = {
  loaded: false,
  profile: null,
  error: null,
};

function accountReducer(state = initialState, action) {
  switch (action.type) {
    case accountTypes.LOGIN_FAILURE:
      return { ...state, loaded: true, error: action.payload };
    case accountTypes.LOGIN_REQUEST:
      return { ...state, loaded: false };
    case accountTypes.LOGIN_SUCCESS:
      return { ...state, loaded: true, profile: action.payload };

    case accountTypes.LOGOUT_REQUEST:
      return { ...state, loaded: false };
    case accountTypes.LOGOUT_SUCCESS:
      return { ...state, loaded: true, profile: null };

    case accountTypes.SIGN_UP_REQUEST:
      return { ...state, loaded: false };
    case accountTypes.SIGN_UP_SUCCESS:
      return { ...state, loaded: true, profile: action.payload };
    case accountTypes.SIGN_UP_FAILURE:
      return { ...state, loaded: true, error: action.payload };

    case accountTypes.GET_CURRENT_USER_SUCCESS:
      return { ...state, loaded: true, profile: action.payload };
    case accountTypes.GET_CURRENT_USER_REQUEST:
      return { ...state, loaded: false };
    case accountTypes.GET_CURRENT_USER_FAILURE:
      return { ...state, loaded: true, error: action.payload };

    default:
      return state;
  }
}

export default accountReducer;
