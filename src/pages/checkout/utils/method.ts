export const localeWithCurrency = (value: number, currency: string) => {
  return value.toLocaleString("en-US", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 2,
  });
};
