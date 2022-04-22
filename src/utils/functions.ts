import { notification } from "antd";
import { BE_URL } from "./constants";

const getAccessToken = (): string | null => {
  return localStorage.getItem("access_token");
};

const getDataFromLocalStorage = (key: string) => {
  const data = localStorage.getItem(key);
  if (data) return JSON.parse(data);
  return null;
};

const roundsTheNumber = (value: string | number, fractionDigits: number) => {
  return typeof value === "string"
    ? parseFloat(value).toFixed(fractionDigits)
    : value.toFixed(fractionDigits);
};

const isUrl = (link: string) => (link.indexOf("http") > -1 ? true : false);

const linkThumbnail = (link: string) =>
  isUrl(link) ? link : BE_URL + "/" + link;

const openNotification = (type: "success" | "error", description?: string) => {
  if (type === "success" || type === "error") {
    notification[type]({
      message: "Thông báo",
      description: description ? description : "Lưu thành công!",
      top: 70,
      duration: 3,
    });
  }
};

export {
  openNotification,
  getAccessToken,
  getDataFromLocalStorage,
  roundsTheNumber,
  isUrl,
  linkThumbnail,
};
