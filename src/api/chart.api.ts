import axiosClient from "../utils/axios";

class Chart {
  getRevenue = async (year: number, currentMonth: number) => {
    return axiosClient
      .post("/revenue", { year, currentMonth })
      .then((res) => res)
      .catch((error) => error);
  };
  getEnrollments = async (year: number, currentMonth: number) => {
    return axiosClient
      .post("/enrollments", { year, currentMonth })
      .then((res) => res)
      .catch((error) => error);
  };
  getRating = async (year: number, currentMonth: number) => {
    return axiosClient
      .post("/rating", { year, currentMonth })
      .then((res) => res)
      .catch((error) => error);
  };
  getCourses = async (year: number, currentMonth: number) => {
    return axiosClient
      .post("/courses", { year, currentMonth })
      .then((res) => res)
      .catch((error) => error);
  };
}
const ChartApi = new Chart();
export default ChartApi;
