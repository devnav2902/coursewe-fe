import { ConfigProvider, Empty, Spin, Table } from "antd";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  useAppDispatch,
  useTypedSelector,
} from "../../../../hooks/redux.hooks";
import { getScheduledCoupons } from "../../../../redux/slices/promotions.slice";
import { StyledCouponTable } from "../../styles/promotions.styles";
import { ScheduledCoupon } from "../../../../api/promotions.api";

const ActiveCoupon = () => {
  const { id } = useParams() as { id: string };

  const scheduledCoupons = useTypedSelector(
    (state) => state.promotion.scheduledCoupons
  );
  const priceOfCourse = useTypedSelector(
    ({ instructorCourse: { course } }) => course.data?.price
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getScheduledCoupons(parseInt(id)));
  }, [dispatch, id]);

  const columns = [
    {
      title: "Code",
      dataIndex: "code",
      key: "code",
      render: (code: string) => <span>{code}</span>,
    },
    {
      title: "Giảm giá",
      dataIndex: "discount_price",
      key: "discount_price",
      render: (discount_price: string) => {
        const discountPrice = discount_price + " đ";
        const originalPrice = priceOfCourse?.format_price + " đ";
        const isFreeCoupon = parseInt(discount_price) === 0 ? true : false;

        return isFreeCoupon ? (
          "Miễn phí"
        ) : (
          <p className="d-flex flex-column">
            <span className="line-through">{originalPrice}</span>{" "}
            {discountPrice}
          </p>
        );
      },
    },
    {
      title: "Thời gian hiệu lực",
      dataIndex: "time_remaining",
      key: "time_remaining",
      render: (_: any, record: ScheduledCoupon) => {
        const { created_at, time_remaining, expires } = record;
        return (
          <>
            <p>Còn lại: {time_remaining + " ngày"}</p>

            <p>
              Ngày bắt đầu: <span className="d-block">{created_at}</span>
            </p>
            <p>
              Ngày hết hạn: <span className="d-block">{expires}</span>
            </p>
          </>
        );
      },
    },
    {
      title: "Số lượng",
      dataIndex: ["coupon", "enrollment_limit"],
      key: "enrollment_limit",
      render: (enrollment_limit: number) => {
        const isUnlimited = enrollment_limit === 0 ? true : false;

        return (
          <span>
            {isUnlimited ? "Không giới hạn" : "0/" + enrollment_limit}
          </span>
        );
      },
    },
    {
      title: "Số lượng ghi danh",
      dataIndex: "currently_enrolled",
      key: "currently_enrolled",
      render: (currently_enrolled: number) => <span>{currently_enrolled}</span>,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status: boolean) => (
        <span>{status ? "Kích hoạt" : "Đã tắt"}</span>
      ),
    },
  ];

  return (
    <div className="coupons">
      <p className="font-heading">Còn hiệu lực</p>

      {!scheduledCoupons.loaded ? (
        <div className="d-flex align-items-center justify-content-center">
          <Spin />
        </div>
      ) : (
        <StyledCouponTable>
          <ConfigProvider
            renderEmpty={() => (
              <Empty description="Chưa có mã giảm giá nào được kích hoạt" />
            )}
          >
            <Table
              bordered
              rowKey={(record) => record.created_at}
              columns={columns}
              dataSource={scheduledCoupons.data}
            />
          </ConfigProvider>
        </StyledCouponTable>
      )}
    </div>
  );
};

export default ActiveCoupon;
