import axios from "axios";
import axiosClient from "../utils/axios";
import { API_URL } from "../utils/constants";
import { User as UserType } from "../ts/types/user.types";

interface paramsLogin {
  email: string;
  password: string | number;
}
export interface ParamsSignUp {
  email: string;
  password: string | number;
  fullname: string;
}

class User {
  login = async (params: paramsLogin) => {
    return axios.post<{ user: UserType; error?: string }>(
      `${API_URL}/user/login`,
      params
    );
  };

  getCurrentUser = async () => {
    return axiosClient
      .get("/user")
      .then((response) => response)
      .catch((error) => error.response);
  };

  logout = async () => {
    // Sanctum sẽ authenticate các request bằng session authentication cookie của Laravel. Nếu không có cookie xuất hiện thì Sanctum sẽ cố gắng xác thực yêu cầu bằng token trong request's Authorization header

    return axiosClient
      .get("/user/logout")
      .then((response) => response)
      .catch((error) => error.response);
  };

  signUp = async (params: ParamsSignUp) => {
    return axiosClient.post<{ user: UserType }>("/user/sign-up", params);
  };
}
const UserApi = new User();

export default UserApi;
