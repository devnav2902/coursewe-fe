import { FC } from "react";
import { Price as PriceType } from "../../../../ts/types/course.types";
import { DataCoupon } from "./Sidebar.component";

type PriceProps = {
  price: PriceType;
  dataCoupon: DataCoupon;
};

const Price: FC<PriceProps> = ({ price, dataCoupon }) => {
  const isFreeCourse = parseInt(price.original_price) === 0;

  return (
    <div className="price">
      {!dataCoupon.coupon ? (
        <span className="original-price">
          {isFreeCourse ? "Khóa học miễn phí" : price.format_price + " đ"}
        </span>
      ) : (
        <>
          <span className="discount-price">
            {dataCoupon.isFreeCoupon
              ? "Miễn phí"
              : dataCoupon.coupon.discount_price + " đ"}
          </span>
          <span className="original-price sale-off">
            {price.format_price} đ
          </span>
          <span className="discount">Giảm {dataCoupon.saleOff}%</span>
        </>
      )}
    </div>
  );
};

export default Price;
