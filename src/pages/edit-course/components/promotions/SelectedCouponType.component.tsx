import {
  Col,
  DatePicker,
  Input,
  InputNumber,
  Row,
  Slider,
  TimePicker,
} from "antd";
import locale from "antd/es/date-picker/locale/vi_VN";
import moment from "moment";
import { FC, useEffect, useState } from "react";
import { CouponType } from "../../../../ts/types/coupon.types";
import { nanoid } from "nanoid";
import "moment/locale/vi";
import { CouponTypesEnum } from "../../../../ts/enum/coupon.enums";

type Props = {
  selectedCouponType: CouponType;
};

const SelectedCouponType: FC<Props> = ({ selectedCouponType }) => {
  const { limited_time } = selectedCouponType;
  const dateFormat = "DD/MM/YYYY";
  const timeFormat = "HH:mm";
  const [startDate, setStartDate] = useState({
    date: momentValue(dateFormat),
    time: momentValue(timeFormat),
  });

  function momentValue(format: string) {
    return moment(new Date(), format);
  }

  function onChangeStartDate(value: moment.Moment | null) {
    if (value?.creationData().format === dateFormat) {
      setStartDate((state) => ({ ...state, date: value }));
    } else if (value?.creationData().format === timeFormat) {
      setStartDate((state) => ({ ...state, time: value }));
    }
  }

  useEffect(() => {
    setStartDate({
      date: momentValue(dateFormat),
      time: momentValue(timeFormat),
    });
  }, [selectedCouponType]);

  const endDate = (function () {
    const dateFormatted = startDate.date.format(dateFormat);
    const timeFormatted = startDate.time.format(timeFormat);
    const formatDateTime = `${dateFormatted} ${timeFormatted}`;

    return moment(formatDateTime, "DD/MM/YYYY HH:mm")
      .add(limited_time, "days")
      .format("DD/MM/YYYY HH:mm A")
      .toString();
  })();
  console.log(startDate.date);

  const disabledHours = Array.from({ length: 23 })
    .map((_, i) => i < new Date().getHours() && i)
    .filter((h) => (typeof h === "number" ? true : false)) as number[];

  const disabledMinutes = Array.from({ length: 59 })
    .map((_, i) => i <= new Date().getMinutes() && i)
    .filter((h) => (typeof h === "number" ? true : false)) as number[];

  return (
    <>
      <b className="mt-2 d-block mb-1">Ngày tạo</b>
      <DatePicker
        size="large"
        allowClear={false}
        value={startDate.date}
        format={dateFormat}
        onChange={onChangeStartDate}
        locale={locale}
        className="mr-1"
        disabledDate={(current) => {
          const currentDayOfMonth = moment();
          const endOfMonth = moment().endOf("month");

          return (
            current && (current < currentDayOfMonth || current > endOfMonth)
          );
        }}
      />
      <TimePicker
        onChange={onChangeStartDate}
        size="large"
        allowClear={false}
        value={startDate.time}
        format={timeFormat}
        disabledHours={() => disabledHours}
        disabledMinutes={() => disabledMinutes}
      />
      <b className="mt-2 d-block mb-1">Ngày hết hạn</b>
      <p>{endDate}</p>

      {selectedCouponType.type === CouponTypesEnum.CUSTOM_PRICE && (
        <Row>
          <Col span={12}>
            <Slider
              min={1}
              max={20}
              // onChange={this.onChange}
              // value={typeof inputValue === "number" ? inputValue : 0}
            />
          </Col>
          <Col span={4}>
            <InputNumber
              min={1}
              max={20}
              style={{ margin: "0 16px" }}
              // value={inputValue}
              // onChange={this.onChange}
            />
          </Col>
        </Row>
      )}

      <b className="d-block mb-1">
        Chỉnh sửa mã code <span className="optional">tùy chọn</span>
      </b>
      <span style={{ fontSize: 14 }} className="coupon-code__description">
        Mã giảm giá phải có 6 - 20 ký tự, Bao gồm: Chữ cái viết hoa (A-Z), Số
        (0-9) và những ký tự có thể sử dụng: Dấu chấm (.), gạch ngang (-), và
        gạch dưới (_). Những mã giảm giá chứa ký tự viết thường và các ký tự đặc
        biệt khác sẽ không được chấp nhận.
      </span>

      <div className="d-flex mt-2">
        <Input
          showCount
          maxLength={20}
          defaultValue={nanoid(20).toUpperCase()}
        />

        <button
          // onClick={showModalCreateCoupon}
          type="button"
          className="flex-shrink-0 button-create-coupon ml-3"
        >
          Tạo mã giảm giá
        </button>
      </div>
    </>
  );
};

export default SelectedCouponType;
