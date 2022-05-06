import { message, Select, Spin } from "antd";
import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useTypedSelector } from "../../../hooks/redux.hooks";
import {
  getCoursePrice,
  getPriceList,
  setCoursePrice,
  updateCoursePrice,
} from "../../../redux/slices/price.slice";
import { Price } from "../../../ts/types/course.types";
import { StyledButtonSave, StyledPrice } from "../styles/edit-course.styles";
import { convertToVND } from "../utils/method";

type PriceProps = {};

const PricePage: FC<PriceProps> = () => {
  const { id: courseId } = useParams() as { id: string };

  const {
    updatePrice: { updating: updatingCoursePrice },
    priceList: { data: priceList, loaded: loadedPriceList },
    currentPrice: { data: currentPrice, loaded: loadedCoursePrice },
  } = useTypedSelector((state) => state.price);
  const dispatch = useAppDispatch();

  const [currentPriceId, setCurrentPriceId] = useState<null | number>(null);

  useEffect(() => {
    dispatch(getPriceList());
    dispatch(getCoursePrice(courseId));
  }, [dispatch, courseId]);

  const formatPrice = useCallback((objPrice: Price) => {
    const { original_price, id } = objPrice;

    return {
      format_price:
        parseInt(original_price) !== 0
          ? convertToVND(original_price)
          : "Miễn phí",
      id: id,
    };
  }, []);

  const formattedListPrice = useMemo(() => {
    return priceList.map((price) => formatPrice(price));
  }, [priceList, formatPrice]);

  useEffect(() => {
    if (currentPrice) {
      setCurrentPriceId(currentPrice.id);
    }
  }, [currentPrice]);

  function savePrice() {
    if (currentPrice && currentPriceId) {
      message.config({
        top: 70,
        maxCount: 3,
      });
      message.loading("Đang lưu...", 0);

      dispatch(
        updateCoursePrice({
          courseId: currentPrice.id,
          priceId: currentPriceId,
        })
      )
        .then((res) => {
          if (typeof res.payload === "object") {
            dispatch(setCoursePrice(res.payload));
            message.success("Đã lưu thành công!", 2.5);
          }
        })
        .catch(() => {
          message.error("Có lỗi xảy ra, vui lòng thử lại!", 2.5);
        });
    }
  }

  function onChangePrice(priceValue: string) {
    const priceId = parseInt(priceValue);
    setCurrentPriceId(priceId);
  }

  return (
    <div className="inner-column">
      <h6 className="">Giá khóa học</h6>
      <p>
        Vui lòng chọn mức giá cho khóa học của bạn bên dưới và nhấp vào 'Lưu
        thay đổi'.
      </p>
      <p>
        Nếu bạn tạo khóa học miễn phí, tổng thời lượng của nội dung video phải
        dưới 2 giờ.
      </p>
      <div>
        <StyledPrice className="price">
          {!loadedCoursePrice ? (
            <Spin size="small" style={{ width: 120 }} />
          ) : (
            <Select
              defaultValue={
                currentPrice && formatPrice(currentPrice).format_price
              }
              onChange={onChangePrice}
              loading={!loadedPriceList}
              placeholder="Chọn giá khóa học"
              options={formattedListPrice}
              fieldNames={{ label: "format_price", value: "id" }}
            />
          )}
          <StyledButtonSave onClick={savePrice}>
            <button
              className="button"
              disabled={
                !loadedCoursePrice ||
                updatingCoursePrice ||
                currentPrice?.id === currentPriceId
                  ? true
                  : false // lỗi chưa get giá đã update
              }
            >
              Lưu thay đổi
            </button>
          </StyledButtonSave>
        </StyledPrice>
      </div>
    </div>
  );
};

export default PricePage;
