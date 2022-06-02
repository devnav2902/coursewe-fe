import { CourseBills } from "../ts/types/course-bill.types";
import axiosClient from "../utils/axios";

type PurchaseHistoryResponse = {
  courseBills: CourseBills;
};
class Purchase {
  purchaseHistory = async () => {
    return axiosClient.get<PurchaseHistoryResponse>("/purchase/history");
  };
  purchase = async (courses: any) => {
    return axiosClient.post(`/purchase`, { courses });
  };
}

const PurchaseApi = new Purchase();
export default PurchaseApi;
