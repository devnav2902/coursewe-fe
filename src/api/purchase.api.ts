import { CourseBills } from "../ts/types/course-bill.types";
import axiosClient from "../utils/axios";

type PurchaseHistoryResponse = {
  courseBills: CourseBills;
};

export type PurchaseData = {
  course_id: (string | number)[];
  coupon_code?: string[];
};
class Purchase {
  purchaseHistory = async () => {
    return axiosClient.get<PurchaseHistoryResponse>("/purchase/history");
  };

  purchase = async (data: PurchaseData) => {
    return axiosClient.post(`/purchase`, data);
  };
}

const PurchaseApi = new Purchase();
export default PurchaseApi;
