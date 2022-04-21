import { PayPalScriptProvider } from "@paypal/react-paypal-js";

function Paypal({ Component, pageProps, children }) {
  const initialOptions = {
    "client-id":
      "ARnOpc5Q0omQOKFfotXJxGsPd71Un_ikaLOTbEbuV_30TQAe25aYrxgIJ8ZWrDzsuWTnrJ87MCJGWr26",
    currency: "USD",
    intent: "capture",
    // "data-client-token": "abc123xyz==",
    locale: "en_VN",
    "buyer-country": "VN",
  };
  return (
    <PayPalScriptProvider options={initialOptions}>
      {children}
    </PayPalScriptProvider>
  );
}
export default Paypal;
