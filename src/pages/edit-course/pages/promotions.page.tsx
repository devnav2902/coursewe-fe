import React from "react";
import ActiveCoupon from "../components/promotions/ActiveCoupon.component";
import CreateCoupon from "../components/promotions/CreateCoupon.component";
import ExpiredCoupons from "../components/promotions/ExpiredCoupons.component";
import { StyledPromotionsWrapper } from "../styles/promotions.styles";

const PromotionsPage = () => {
  return (
    <div className="inner-column">
      <h6 className="">Khuyến mại</h6>

      <StyledPromotionsWrapper className="promotions">
        <CreateCoupon />
        <ActiveCoupon />
        <ExpiredCoupons />
      </StyledPromotionsWrapper>
    </div>
  );
};

export default PromotionsPage;
