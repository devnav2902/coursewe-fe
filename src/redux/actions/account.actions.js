import { notification } from "antd";
import UserApi from "../../api/user.api";
import accountTypes from "../types/account.types";

const logout = () => async (dispatch) => {
  dispatch({ type: accountTypes.LOGOUT_REQUEST });

  const { data, status } = await UserApi.logout();

  if (status === 200) {
    dispatch({ type: accountTypes.LOGOUT_SUCCESS });
  }
};

const signUp = (params) => async (dispatch) => {
  dispatch({ type: accountTypes.SIGN_UP_REQUEST });
  const { data, status } = await UserApi.signUp(params);

  if (status === 200) {
    dispatch({ type: accountTypes.SIGN_UP_SUCCESS, payload: data.user });
  }
};

const getCurrentUser = () => async (dispatch) => {
  dispatch({ type: accountTypes.GET_CURRENT_USER_REQUEST });

  try {
    const { data, status } = await UserApi.getCurrentUser();

    status === 200 &&
      dispatch({
        type: accountTypes.GET_CURRENT_USER_SUCCESS,
        payload: data.user,
      });
  } catch (error) {
    dispatch({
      type: accountTypes.GET_CURRENT_USER_FAILURE,
      payload: error,
    });
  }
};

const login = (params) => async (dispatch) => {
  dispatch({ type: accountTypes.LOGIN_REQUEST });
  const { password, email } = params;

  try {
    const { data, status } = await UserApi.login({ password, email });

    switch (status) {
      case 200:
        dispatch({ type: accountTypes.LOGIN_SUCCESS, payload: data.user });
        break;
      case 401: {
        dispatch({ type: accountTypes.LOGIN_FAILURE, payload: data.error });

        notification["error"]({
          message: "Lỗi đăng nhập!",
          description: data.error,
          placement: "topRight",
          style: {
            width: 340,
            top: 80,
          },
        });
        break;
      }
      case 419:
        dispatch({ type: accountTypes.LOGIN_FAILURE, payload: data.message });
    }
  } catch (error) {
    dispatch({ type: accountTypes.LOGIN_FAILURE, payload: error });
  }
};

export { login, logout, signUp, getCurrentUser };
