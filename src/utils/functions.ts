const getAccessToken = (): string | null => {
  return localStorage.getItem("access_token");
};

const getDataFromLocalStorage = (key: string) => {
  const data = localStorage.getItem(key);
  if (data) return JSON.parse(data);
  return null;
};

export { getAccessToken, getDataFromLocalStorage };
