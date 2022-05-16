import { Alert, Col, Row, Slider, Spin } from "antd";
import { FC, useMemo } from "react";
import { Controller, UseFormReturn } from "react-hook-form";
import { FormCreateCoupon } from "../../../../api/promotions.api";
import { useTypedSelector } from "../../../../hooks/redux.hooks";
import { CouponType } from "../../../../ts/types/coupon.types";
import { convertToVND } from "../../utils/method";

type Props = {
  selectedCouponType: CouponType;
  formHandler: UseFormReturn<FormCreateCoupon>;
};

const CustomPrice: FC<Props> = ({ selectedCouponType, formHandler }) => {
  // const {
  //   course: { loaded, data: courseData },
  // } = useTypedSelector((state) => state.instructorCourse);
  const {
    priceList: { data: priceList, loaded: loadedPriceList },
    currentPrice: { data: coursePrice, loaded: loadedCoursePrice },
  } = useTypedSelector((state) => state.price);
  const {
    control,
    formState: { errors },
  } = formHandler;

  const customPriceObj = useMemo(
    () =>
      (() => {
        const discountConst = selectedCouponType.discountConst; // giá trị sử dụng để tính giảm giá. vd khoảng giảm giá là [349.000, 549.000]=> khuyến mãi trong khoảng [299.000, 499.000]

        if (discountConst && priceList.length) {
          const sortedPrice = [...priceList].sort(
            (a, b) =>
              parseFloat(a.original_price) - parseFloat(b.original_price)
          );

          const indexPrice = sortedPrice.findIndex(
            (price) => price.id === coursePrice?.id
          );

          const portionArrayPrice = sortedPrice
            .slice(0, indexPrice + 1) // lấy cả giá khóa học hiện tại
            .map((price) => parseFloat(price.original_price))
            .filter((price) => price); // bỏ giá khóa học = 0

          const minPrice = portionArrayPrice.at(0) as number;
          const maxPrice = portionArrayPrice.at(-1) as number;

          // Khoảng giảm giá nằm trong (a,b) với b là giá hiện tại => giảm giá = b - discountConst
          const maxDiscount = maxPrice - discountConst;
          // Nếu giá khóa học là giá trị min thì, giảm giá = a || b - discountConst
          const minDiscount =
            portionArrayPrice.length === 1
              ? maxDiscount - discountConst
              : minPrice;

          return {
            portionArrayPrice,
            maxDiscount,
            minDiscount,
          };
        }
      })(),
    [priceList, coursePrice, selectedCouponType.discountConst]
  );

  return !loadedCoursePrice || !loadedPriceList ? (
    <div className="d-flex align-items-center justify-content-center">
      <Spin />
    </div>
  ) : !customPriceObj ? null : (
    <>
      <b className="mt-2 d-block mb-1">Thiết lập giá bán</b>
      <span className="d-block mb-1">
        Giá gốc của khóa học:{" "}
        <b>{coursePrice && convertToVND(coursePrice?.original_price)}</b>
      </span>
      <span className="d-block mb-3">
        Chọn giá trong khoảng từ{" "}
        <b>
          {convertToVND(customPriceObj.minDiscount)} -{" "}
          {convertToVND(customPriceObj.maxDiscount)}
        </b>
      </span>
      <Row className="mb-2 pd-t-2">
        <Col span={12}>
          <Controller
            rules={{
              required: "Bạn chưa chọn giá khuyến mại!",
            }}
            name="discount_price"
            control={control}
            render={({ field }) => {
              return (
                <Slider
                  onChange={(value) =>
                    field.onChange(convertToVND(value, false))
                  }
                  getTooltipPopupContainer={(e) => e}
                  tooltipVisible
                  min={customPriceObj.minDiscount}
                  max={customPriceObj.maxDiscount}
                  step={10000}
                  tipFormatter={(number) => number && convertToVND(number)}
                />
              );
            }}
          />
        </Col>
        <Col span={24}>
          {errors.discount_price && (
            <Alert message={errors.discount_price.message} banner />
          )}
        </Col>
      </Row>
    </>
  );
};

export default CustomPrice;
