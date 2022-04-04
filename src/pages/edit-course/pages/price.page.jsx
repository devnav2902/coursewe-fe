import { Select } from "antd";
import { useEffect, useState } from "react";
import PriceApi from "../../../api/price.api";

const PricePage = ({ course }) => {
  const [price, setPrice] = useState(course.price_id);
  const [priceList, setPriceList] = useState([]);

  useEffect(() => {
    PriceApi.getPrice().then((res) => {
      const arr = res.data.price.map((price) => {
        const { format_price, id } = price;

        return {
          format_price: parseInt(format_price)
            ? format_price + " đ"
            : "Miễn phí",
          id: id,
        };
      });

      setPriceList(arr);
    });
  }, []);

  return (
    <div className="inner-column">
      <h6 className="">Giá khóa học</h6>

      <p>
        Vui lòng chọn mức giá cho khóa học của bạn bên dưới và nhấp vào 'Save'.
      </p>

      <p>
        Nếu bạn tạo khóa học miễn phí, tổng thời lượng của nội dung video phải
        dưới 2 giờ.
      </p>

      <div className="">
        <div className="price">
          <div className="select">
            <Select
              onChange={(price) => {
                setPrice(price);
              }}
              placeholder="Chọn giá bán"
              defaultValue={price}
              style={{ width: "100%" }}
              options={priceList}
              fieldNames={{ label: "format_price", value: "id" }}
            />
          </div>
          <button className="button">Save</button>
        </div>
      </div>
    </div>
  );
};

export default PricePage;
