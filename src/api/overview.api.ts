import axiosClient from "../utils/axios";

class Overview {
  getOverview = async () => {
    return axiosClient
      .get("/instructor/overview")
      .then((res) => res)
      .catch((error) => error.response);
  };
}

const OverviewApi = new Overview();
export default OverviewApi;
