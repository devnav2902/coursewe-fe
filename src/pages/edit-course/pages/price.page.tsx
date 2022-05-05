import { message, Select } from "antd";
import { FC, useEffect, useState } from "react";
import { CourseResponse } from "../../../api/instructor.api";
import PriceApi from "../../../api/price.api";
import { useTypedSelector } from "../../../hooks/redux.hooks";
import { Course, Price } from "../../../ts/types/course.types";
import { StyledButtonSave, StyledPrice } from "../styles/edit-course.styles";

type PriceProps = {};

const PricePage: FC<PriceProps> = () => {
  const {
    course: { data: courseData },
  } = useTypedSelector((state) => state.instructorCourse) as {
    course: { data: CourseResponse };
  };

  const [priceList, setPriceList] = useState<Omit<Price, "original_price">[]>(
    []
  );
  const [loadedPriceList, setLoadedPriceList] = useState(false);
  const [currentPrice, setCurrentPrice] = useState<number>(courseData.price.id);
  const [saving, setSaving] = useState(false);

  function formatPrice(objPrice: Price) {
    const { format_price, id } = objPrice;

    return {
      format_price: parseInt(format_price) ? format_price + " đ" : "Miễn phí",
      id: id,
    };
  }

  useEffect(() => {
    PriceApi.getPrice().then((res) => {
      const arr = res.data.price.map((price) => formatPrice(price));

      setPriceList(arr);
      setLoadedPriceList(true);
    });
  }, []);

  function savePrice() {
    setSaving(true);

    message.config({
      top: 70,
      maxCount: 3,
    });
    const messagePromise = message.loading("Đang lưu..", 0);

    PriceApi.updatePrice(courseData.id, currentPrice)
      .then(() => {
        messagePromise();
        message.success("Đã lưu thành công!", 2.5);
        setSaving(false);
      })
      .catch((error) => {
        setSaving(false);
        message.error("Có lỗi xảy ra, vui lòng thử lại!", 2.5);
      });
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
          <Select
            loading={!loadedPriceList}
            onChange={(price) => {
              setCurrentPrice(parseInt(price));
            }}
            defaultValue={formatPrice(courseData.price).format_price}
            placeholder="Chọn giá khóa học"
            options={priceList}
            fieldNames={{ label: "format_price", value: "id" }}
          />
          <StyledButtonSave onClick={savePrice}>
            <button
              className="button"
              disabled={
                saving
                  ? true
                  : currentPrice === courseData.price.id
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
