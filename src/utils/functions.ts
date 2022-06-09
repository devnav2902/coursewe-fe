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

const isUrl = (link: string | null) =>
  link && link.indexOf("http") > -1 ? true : false;

const linkThumbnail = (link: string) =>
  isUrl(link) ? link : BE_URL + "/" + link;

const openNotification = (type: "success" | "error", description?: string) => {
  if (type === "success" || type === "error") {
    notification[type]({
      message: "Thông báo",
      description: description ? description : "Lưu thành công!",
      top: 75,
      duration: 3,
    });
  }
};

export const secondsToHMS = (d: number | string) => {
  d = Number(d);
  const h = Math.floor(d / 3600);
  const m = Math.floor((d % 3600) / 60);
  const s = Math.floor((d % 3600) % 60);

  const hDisplay = h > 0 ? h + " tiếng " : "";
  const mDisplay = m > 0 ? m + " phút " : "";
  const sDisplay = s > 0 ? s + " giây " : "";
  return hDisplay + mDisplay + sDisplay;
};

export {
  openNotification,
  getAccessToken,
  getDataFromLocalStorage,
  roundsTheNumber,
  isUrl,
  linkThumbnail,
};
