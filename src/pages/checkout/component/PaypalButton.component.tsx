import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { FC, useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { CustomCourse } from "../../../api/course.api";
import CurrencyApi from "../../../api/currency.api";
import { useAppDispatch, useTypedSelector } from "../../../hooks/redux.hooks";
import { DataCoupon } from "../../detail-course/components/Sidebar/Sidebar.component";
import { CouponState, CourseData } from "../page/checkout.page";

type PaypalButtonProps = {
  handleSucceeded: () => void;
  courseData: CourseData;
  couponState: CouponState["state"];
};

const PaypalButtonContainer: FC<PaypalButtonProps> = ({
  handleSucceeded,
  courseData,
  couponState,
}) => {
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const [
    {
      isPending,
      options: { currency },
    },
  ] = usePayPalScriptReducer();
  const { cart, loadedCart } = useTypedSelector((state) => state.cart);
  const { state } = useLocation() as unknown as { state: null | DataCoupon };

  const [amountData, setAmountData] = useState({ value: "1", loaded: false });

  useEffect(() => {
    if (currency) {
      if (loadedCart && !courseData.data) {
        CurrencyApi.convert("VND", currency, cart.current_price).then((res) => {
          setAmountData(() => ({ loaded: true, value: res.data }));
        });
      } else if (courseData.data && couponState?.coupon) {
        CurrencyApi.convert(
          "VND",
          currency,
          couponState.coupon?.discount_price
        ).then((res) => {
          setAmountData(() => ({ loaded: true, value: res.data }));
        });
      }
    }
  }, [loadedCart, currency]);

  return (
    <PayPalButtons
      disabled={isPending || !amountData.loaded}
      createOrder={(data, actions) => {
        return actions.order.create({
          purchase_units: [
            {
              amount: {
                value: amountData.value,
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
};

export default PaypalButtonContainer;
