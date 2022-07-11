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
  get = async () => {
    return axiosClient.get<LocationAndLanguageResponse>("/students/analytics");
  };
}

const AnalyticsApi = new Analytics();

export default AnalyticsApi;
