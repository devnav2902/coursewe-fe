import axiosClient from "../utils/axios";

class Purchase {
  purchaseHistory = async () => {
    return axiosClient
      .get("/purchase/history")
      .then((res) => res)
      .catch((error) => error.response);
  };
  purchase = async () => {
    return axiosClient
      .post(`/purchase`)
      .then((res) => res)
      .catch((error) => error.response);
  };
}

const PurchaseApi = new Purchase();
export default PurchaseApi;
