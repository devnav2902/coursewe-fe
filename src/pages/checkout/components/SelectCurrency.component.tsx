import { usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { ChangeEvent, useState } from "react";

const SelectCurrency = () => {
  const [{ options }, dispatch] = usePayPalScriptReducer();
  const [currency, setCurrency] = useState(options.currency);

  function onCurrencyChange({
    target: { value },
  }: ChangeEvent<HTMLSelectElement>) {
    setCurrency(value);

    dispatch({
      type: "resetOptions",
      value: {
        ...options,
        currency: value,
      },
    });
  }

  return (
    <>
      <label htmlFor="billingAddressCountry">Chọn loại tiền tệ</label>
      <div className="address-select">
        <select
          autoComplete="off"
          id="billingAddressCountry"
          className="form-control"
          value={currency}
          onChange={onCurrencyChange}
        >
          <option value="USD">United States dollar</option>
          <option value="EUR">Euro</option>
        </select>
      </div>
    </>
  );
};

export default SelectCurrency;
