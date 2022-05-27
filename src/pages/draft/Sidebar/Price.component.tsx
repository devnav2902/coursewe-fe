import { FC } from "react";
import { Price as PriceType } from "../../../ts/types/course.types";

type PriceProps = {
  price: PriceType;
};

const Price: FC<PriceProps> = ({ price }) => {
  const isFreeCourse = parseInt(price.original_price) === 0;

  return (
    <div className="price">
      <span className="original-price">
        {isFreeCourse ? "Khóa học miễn phí" : price.format_price + " đ"}
      </span>
    </div>
  );
};

export default Price;
