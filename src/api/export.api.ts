import axiosClient from "../utils/axios";
import { Params } from "./performance.api";

class Export {
  revenueExport = async (params: Params) => {
    return axiosClient
      .get("/export/revenue", { params, responseType: "blob" })
      .then(({ data, headers }) => {
        const url = window.URL.createObjectURL(new Blob([data]));
        const link = document.createElement("a");

        link.href = url;

        // const contentDisposition = data.headers["content-disposition"];
        // const filename = contentDisposition.match(/filename=(.+\.xlsx)/)?.[1];

        link.setAttribute("download", "DOANH_THU.xlsx");
        document.body.appendChild(link);
        link.click();
      });
  };
}

const ExportApi = new Export();

export default ExportApi;
