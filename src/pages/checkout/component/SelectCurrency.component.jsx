import { usePayPalScriptReducer } from "@paypal/react-paypal-js";
import React, { useState } from "react";

const SelectCurrency = () => {
  const [{ options }, dispatch] = usePayPalScriptReducer();
  const [currency, setCurrency] = useState(options.currency);
  function onCurrencyChange({ target: { value } }) {
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
      <label for="">Billing Address</label>
      <div className="address-select">
        <select
          data-purpose="billing-address-country"
          autocomplete="off"
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
