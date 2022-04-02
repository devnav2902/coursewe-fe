import axiosClient from "../utils/axios";

class Price {
  getPrice = async () => {
    return axiosClient
      .get("/get-price")
      .then((res) => res)
      .catch((error) => error.response);
  };
}

const PriceApi = new Price();

export default PriceApi;
