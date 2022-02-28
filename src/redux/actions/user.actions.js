import axios from "axios";
import userTypes from "../types/user.types";

const userRequest = { type: userTypes.USER_REQUEST };
const userSuccess = (res) => ({ type: userTypes.USER_SUCCESS, payload: res });
const userFailure = (error) => ({
  type: userTypes.USER_FAILURE,
  payload: error,
});

const getUsers = (url) => {
  return (dispatch) => {
    dispatch(userRequest);

    axios
      .get(url)
      .then((data) => {
        dispatch(userSuccess(data.data.results));
      })
      .catch((e) => dispatch(userFailure(e)));
  };
};
export { getUsers, userFailure, userRequest, userSuccess };
