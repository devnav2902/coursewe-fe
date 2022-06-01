import axiosClient from "../utils/axios";

export type Enroll = {
  course_id: string | number;
  coupon?: string;
  code?: string;
};

class FreeEnroll {
  enroll = async (data: Enroll) => {
    return axiosClient.post("/free-enroll/", data);
  };
}
const FreeEnrollApi = new FreeEnroll();
export default FreeEnrollApi;
