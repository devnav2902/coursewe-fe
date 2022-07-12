import axiosClient from "../utils/axios";

export interface LocationAndLanguageResponse {
  locationData: {
    total: number;
    country: string;
    country_code: string;
    language: string;
  }[];
  languageData: {
    total: number;
    language: string;
  }[];
}

class Analytics {
  getByInstructor = async () => {
    return axiosClient.get<LocationAndLanguageResponse>("/students/analytics");
  };

  getByAdmin = async () => {
    return axiosClient.get<LocationAndLanguageResponse>("/admin/analytics");
  };
}

const AnalyticsApi = new Analytics();

export default AnalyticsApi;
