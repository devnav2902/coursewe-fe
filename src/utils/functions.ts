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

export { getAccessToken, getDataFromLocalStorage, roundsTheNumber, isUrl };
