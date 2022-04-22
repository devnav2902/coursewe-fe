import axiosClient from "../utils/axios";

class Price {
  getPrice = async () => {
    return axiosClient
      .get("/get-price")
      .then((res) => res)
      .catch((error) => error.response);
  };

  updatePrice = async (course_id: number, price_id: number) => {
    return axiosClient
      .patch("/update-price", { course_id, price_id })
      .then((res) => res)
      .catch((error) => error.response);
  };
}

const PriceApi = new Price();

export default PriceApi;
