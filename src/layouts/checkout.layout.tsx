import { FC } from "react";
import { PaypalProvider, TopNav } from "./components/checkout.component";

const CheckoutLayout: FC = ({ children }) => {
  return (
    <PaypalProvider>
      <TopNav />
      <main className="spacing-top-nav">{children}</main>
    </PaypalProvider>
  );
};

export default CheckoutLayout;
