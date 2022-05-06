import axiosClient from "../utils/axios";

class Purchase {
  purchaseHistory = async () => {
    return axiosClient
      .get("/purchase/history")
      .then((res) => res)
      .catch((error) => error.response);
  };
  purchase = async (courses: any) => {
    return axiosClient
      .post(`/purchase`, { courses })
      .then((res) => res)
      .catch((error) => error.response);
  };
}

const PurchaseApi = new Purchase();
export default PurchaseApi;
