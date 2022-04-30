import axiosClient from "../utils/axios";
import { Price as PriceType } from "../ts/types/course.types";
class Price {
  getPrice = async () => {
    return axiosClient.get<{ price: PriceType[] }>("/get-price");
  };

  updatePrice = async (course_id: number, price_id: number) => {
    return axiosClient.patch("/update-price", { course_id, price_id });
  };
}

const PriceApi = new Price();

export default PriceApi;
