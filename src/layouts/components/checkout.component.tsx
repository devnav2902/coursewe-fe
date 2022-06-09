import {
  PayPalScriptProvider,
  ScriptProviderProps,
} from "@paypal/react-paypal-js";
import { FC } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../utils/constants";

export const TopNav: FC = () => {
  return (
    <nav className="nav-top">
      <div className="nav-content">
        <div className="logo">
          <Link to="/">Coursewe</Link>
        </div>
        <div className="cancel-btn ml-auto">
          <a href={ROUTES.CART} className="fw-bold">
            Trở về
          </a>
        </div>
      </div>
    </nav>
  );
};

export const PaypalProvider: FC = ({ children }) => {
  const initialOptions: ScriptProviderProps["options"] = {
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
};
