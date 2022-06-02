import axiosClient from "../utils/axios";

class Currency {
  convert = async (from: string, to: string, money: number | string) => {
    return axiosClient.get(`/currency/${from}/${to}/${money}`);
  };
}

const CurrencyApi = new Currency();

export default CurrencyApi;
