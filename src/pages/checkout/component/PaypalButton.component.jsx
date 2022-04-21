import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { useState } from "react";

function PaypalButtonContainer({ handleSucceeded }) {
  const [{ options }, dispatch] = usePayPalScriptReducer();
  const [currency, setCurrency] = useState(options.currency);

  return (
    <PayPalButtons
      createOrder={(data, actions) => {
        return actions.order.create({
          purchase_units: [
            {
              amount: {
                value: "4000",
              },
            },
          ],
        });
      }}
      onApprove={(data, actions) => {
        return actions.order.capture().then((details) => {
          handleSucceeded(details);
        });
      }}
    />
  );
}
export default PaypalButtonContainer;
