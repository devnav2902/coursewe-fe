import { ConfigProvider, Empty, Spin, Table } from "antd";
import moment from "moment";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  useAppDispatch,
  useTypedSelector,
} from "../../../../hooks/redux.hooks";
import { getExpiredCoupons } from "../../../../redux/slices/promotions.slice";
import { StyledCouponTable } from "../../styles/promotions.styles";

const ExpiredCoupons = () => {
  const { id } = useParams() as { id: string };

  const expiredCoupons = useTypedSelector(
    ({ promotion }) => promotion.expiredCoupons
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getExpiredCoupons(parseInt(id)));
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
        const isFreeCoupon = parseInt(discount_price) === 0 ? true : false;

        return isFreeCoupon ? (
          "Miễn phí"
        ) : (
          <p className="d-flex flex-column">
            {isFreeCoupon ? "Miễn phí" : { discountPrice }}
          </p>
        );
      },
    },
    {
      title: "Ngày tạo",
      dataIndex: "created_at",
      key: "created_at",
      render: (created_at: string) => {
        const datetimeFormat = "DD/MM/YYYY HH:mm A";
        const createdAt = moment(created_at).format(datetimeFormat);
        return <span>{createdAt}</span>;
      },
    },
    {
      title: "Ngày hết hạn",
      dataIndex: "expires",
      key: "expires",
      render: (expires: string) => {
        const datetimeFormat = "DD/MM/YYYY HH:mm A";
        const expiredAt = moment(expires).format(datetimeFormat);
        return <span>{expiredAt}</span>;
      },
    },
    {
      title: "Số lượng ghi danh",
      dataIndex: "currently_enrolled",
      key: "currently_enrolled",
      render: (currently_enrolled: number) => <span>{currently_enrolled}</span>,
    },
  ];

  return (
    <div className="coupons">
      <p className="font-heading">Hết hạn</p>
      {!expiredCoupons.loaded ? (
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
              dataSource={expiredCoupons.data}
            />
          </ConfigProvider>
        </StyledCouponTable>
      )}
    </div>
  );
};

export default ExpiredCoupons;
