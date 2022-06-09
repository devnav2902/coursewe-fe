import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { CustomCourse } from "../../../api/course.api";
import CurrencyApi from "../../../api/currency.api";
import { useAppDispatch, useTypedSelector } from "../../../hooks/redux.hooks";
import { DataCoupon } from "../../detail-course/components/Sidebar/Sidebar.component";
import { AmountData, CouponState, CourseData } from "../page/checkout.page";

type PaypalButtonProps = {
  handleSucceeded: (details: any) => void;
  setAmountData: Dispatch<SetStateAction<AmountData>>;
  amountData: AmountData;
  courseData: CourseData;
  couponState: CouponState["state"];
};

const PaypalButtonContainer: FC<PaypalButtonProps> = ({
  handleSucceeded,
  setAmountData,
  courseData,
  couponState,
  amountData,
}) => {
  const [searchParams] = useSearchParams();

  const [
    {
      isPending,
      options: { currency },
    },
  ] = usePayPalScriptReducer();

  const { cart, loadedCart } = useTypedSelector((state) => state.cart);

  useEffect(() => {
    if (currency) {
      setAmountData((state) => ({ ...state, loaded: false }));

      if (loadedCart && !courseData.data) {
        CurrencyApi.convert("VND", currency, cart.current_price).then((res) => {
          setAmountData(() => ({ loaded: true, value: res.data }));
        });
      } else if (courseData.data) {
        let price = "0";

        if (couponState?.coupon) price = couponState.coupon?.discount_price;
        else price = courseData.data.price.format_price;

        CurrencyApi.convert("VND", currency, price).then((res) => {
          setAmountData(() => ({ loaded: true, value: res.data }));
        });
      }
    }
  }, [
    loadedCart,
    currency,
    cart.current_price,
    couponState?.coupon,
    courseData.data,
    setAmountData,
  ]);

  return (
    <PayPalButtons
      forceReRender={[amountData.value]}
      disabled={isPending || !amountData.loaded}
      createOrder={(_, actions) => {
        return actions.order.create({
          purchase_units: [
            {
              amount: {
                value: amountData.value.toString(),
              },
            },
          ],
        });
      }}
      onApprove={function (_, actions) {
        const order = actions.order as any;
        return order.capture().then(function (details: any) {
          handleSucceeded(details);
        });
      }}
    />
  );
};

export default PaypalButtonContainer;
