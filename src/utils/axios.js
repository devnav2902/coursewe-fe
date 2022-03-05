import axios from "axios";
import { API_URL } from "./constants";
// import { getAccessToken } from "./functions";
const axiosClient = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

axiosClient.interceptors.request.use(
  (config) => {
    // const token = getAccessToken();

    // Laravel check session nếu có sẽ accept request, nếu không sẽ check bearer token
    // SPA nên dùng SPA authentication
    // if (token) {
    //   config.headers = {
    //     Authorization: `Bearer ${token}`, // API TOKENS
    //   };
    // }

    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

export default axiosClient;
