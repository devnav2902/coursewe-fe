import axiosClient from "../utils/axios";
import { Price as PriceType } from "../ts/types/course.types";
class Price {
  getPriceList = async () => {
    return axiosClient.get<{ priceList: PriceType[] }>("/get-price-list");
  };

  getPriceByCourseId = async (courseId: number | string) => {
    return axiosClient.get<{ price: PriceType }>(`/get-price/${courseId}`);
  };

  updatePrice = async (course_id: number | string, price_id: number) => {
    return axiosClient.patch<{ price: PriceType }>("/update-price", {
      course_id,
      price_id,
    });
  };
}

const PriceApi = new Price();

export default PriceApi;
