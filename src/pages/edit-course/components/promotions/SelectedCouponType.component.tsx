import { Alert, Button, DatePicker, Input, message, TimePicker } from "antd";
import locale from "antd/es/date-picker/locale/vi_VN";
import moment from "moment";
import "moment/locale/vi";
import { nanoid } from "nanoid";
import { FC, useCallback, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { FormCreateCoupon } from "../../../../api/promotions.api";
import {
  useAppDispatch,
  useTypedSelector,
} from "../../../../hooks/redux.hooks";
import {
  clearErrorSubmitCreatedCoupon,
  submitCreatedCoupon,
} from "../../../../redux/slices/promotions.slice";
import { CouponTypesEnum } from "../../../../ts/enum/coupon.enums";
import { CouponType } from "../../../../ts/types/coupon.types";
import CustomPrice from "./CustomPrice.component";

type Props = {
  selectedCouponType: CouponType;
};

type StartDateState = {
  date: moment.Moment;
  time: moment.Moment;
};

const SelectedCouponType: FC<Props> = ({ selectedCouponType }) => {
  const { limited_time, id } = selectedCouponType;

  const dispatch = useAppDispatch();
  const { loading: loadingSubmitCoupon, error: errorSubmitCoupon } =
    useTypedSelector((state) => state.promotion.submitCreatedCoupon);
  const { data: courseData } = useTypedSelector(
    ({ instructorCourse }) => instructorCourse.course
  );

  const dateFormat = "DD/MM/YYYY";
  const timeFormat = "HH:mm";
  const datetimeFormat = "DD/MM/YYYY HH:mm A";
  const [startDate, setStartDate] = useState<StartDateState>({
    date: momentValue(dateFormat),
    time: momentValue(timeFormat),
  });

  const formHandler = useForm<FormCreateCoupon>({
    defaultValues: {
      course_id: courseData?.id,
      discount_price: null,
      coupon_type: id,
      code: nanoid(20).toUpperCase(),
      "start-date": "",
      "end-date": "",
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = formHandler;

  useEffect(() => {
    console.log(errorSubmitCoupon);
    if (errorSubmitCoupon) {
      message
        .error({
          content: errorSubmitCoupon,
          style: { marginTop: 80 },
          duration: 3,
        })
        .then(() => {
          dispatch(clearErrorSubmitCreatedCoupon());
        });
    }
  }, [errorSubmitCoupon, dispatch]);

  const handleSubmitCreatedCoupon = handleSubmit((data) => {
    console.log(data);

    dispatch(submitCreatedCoupon(data));
  });

  function momentValue(format: string, momentData?: moment.Moment) {
    if (!momentData) return moment(new Date(), format);
    return moment(momentData, format);
  }

  function onChangeStartDate(
    value: moment.Moment | null,
    type: "time" | "date"
  ) {
    if (value) {
      if (value.creationData().format === dateFormat) {
        return setStartDate((state) => ({ ...state, date: value }));
      }

      if (value.creationData().format === timeFormat) {
        return setStartDate((state) => ({ ...state, time: value }));
      }

      setStartDate((state) => ({
        ...state,
        [type]:
          type === "date"
            ? momentValue(dateFormat, value)
            : momentValue(timeFormat, value),
      }));
    }
  }

  useEffect(() => {
    setStartDate({
      date: momentValue(dateFormat),
      time: momentValue(timeFormat),
    });
  }, [selectedCouponType]);

  const getStartDateValue = useCallback(function (startDate: StartDateState) {
    const dateFormatted = startDate.date.format(dateFormat);
    const timeFormatted = startDate.time.format(timeFormat);
    const formatted = `${dateFormatted} ${timeFormatted}`;

    return moment(formatted, datetimeFormat);
  }, []);

  const getEndDateValue = useCallback(
    function getEndDateValue(startDate: StartDateState) {
      const formatDateTime = getStartDateValue(startDate);

      return moment(formatDateTime, datetimeFormat).add(limited_time, "days");
    },
    [getStartDateValue, limited_time]
  );

  useEffect(() => {
    setValue("start-date", getStartDateValue(startDate).toString());
    setValue("end-date", getEndDateValue(startDate).toString());
  }, [startDate, setValue, getEndDateValue, getStartDateValue]);

  const isSameDate = startDate.date.isSame(moment(new Date()), "day");

  const disabledHours = !isSameDate
    ? []
    : (Array.from({ length: 23 })
        .map((_, i) => i < new Date().getHours() && i)
        .filter((h) => (typeof h === "number" ? true : false)) as number[]);

  const disabledMinutes = !isSameDate
    ? []
    : (Array.from({ length: 59 })
        .map((_, i) => i <= new Date().getMinutes() && i)
        .filter((h) => (typeof h === "number" ? true : false)) as number[]);

  return (
    <form onSubmit={handleSubmitCreatedCoupon}>
      <b className="mt-2 d-block mb-1">Ng??y b???t ?????u</b>

      <DatePicker
        size="large"
        getPopupContainer={(e) => e}
        allowClear={false}
        value={startDate.date}
        format={dateFormat}
        onChange={(value) => onChangeStartDate(value, "date")}
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
        getPopupContainer={(e) => e}
        onChange={(value) => onChangeStartDate(value, "time")}
        size="large"
        allowClear={false}
        value={startDate.time}
        format={timeFormat}
        disabledHours={() => disabledHours}
        disabledMinutes={() => disabledMinutes}
      />

      <b className="mt-2 d-block mb-1">Ng??y h???t h???n</b>
      <p>{getEndDateValue(startDate).format(datetimeFormat)}</p>

      {selectedCouponType.type === CouponTypesEnum.CUSTOM_PRICE && (
        <CustomPrice
          selectedCouponType={selectedCouponType}
          formHandler={formHandler}
        />
      )}

      <b className="d-block mb-1">
        Ch???nh s???a m?? code <span className="optional">t??y ch???n</span>
      </b>
      <span style={{ fontSize: 14 }} className="coupon-code__description">
        M?? gi???m gi?? ph???i c?? 6 - 20 k?? t???, Bao g???m: Ch??? c??i vi???t hoa (A-Z), S???
        (0-9) v?? nh???ng k?? t??? c?? th??? s??? d???ng: D???u ch???m (.), g???ch ngang (-), v??
        g???ch d?????i (_). Nh???ng m?? gi???m gi?? ch???a k?? t??? vi???t th?????ng v?? c??c k?? t??? ?????c
        bi???t kh??c s??? kh??ng ???????c ch???p nh???n.
      </span>

      <div className="d-flex mt-2">
        <Controller
          rules={{
            required: { message: "Vui l??ng nh???p m?? gi???m gi??!", value: true },
            minLength: {
              value: 6,
              message: "M?? code ph???i t???i thi???u 6 k?? t???!",
            },
            maxLength: 20,
            pattern: {
              value: /^[A-Z\d-_.]+$/g,
              message: "M?? code c???a b???n kh??ng h???p l???!",
            },
          }}
          name="code"
          control={control}
          render={({ field: { onChange, ...restFields } }) => {
            return (
              <Input
                {...restFields}
                onChange={(e) => onChange(e.target.value.toUpperCase())}
                showCount
                maxLength={20}
              />
            );
          }}
        />

        <Button
          htmlType="submit"
          style={{ height: "auto" }}
          className="flex-shrink-0 button-create-coupon ml-3"
          loading={loadingSubmitCoupon}
        >
          T???o m?? gi???m gi??
        </Button>
      </div>
      {errors.code && <Alert message={errors.code.message} banner />}
    </form>
  );
};

export default SelectedCouponType;
