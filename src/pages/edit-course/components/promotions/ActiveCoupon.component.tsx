import { Spin } from "antd";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  useAppDispatch,
  useTypedSelector,
} from "../../../../hooks/redux.hooks";
import { getScheduledCoupons } from "../../../../redux/slices/promotions.slice";

const ActiveCoupon = () => {
  const { id } = useParams() as { id: string };

  const scheduledCoupons = useTypedSelector(
    (state) => state.promotion.scheduledCoupons
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getScheduledCoupons(parseInt(id)));
  }, [dispatch, id]);

  return (
    <div className="coupons">
      <p className="font-heading">Còn hiệu lực</p>
      {!scheduledCoupons.loaded ? (
        <div className="d-flex align-items-center justify-content-center">
          <Spin />
        </div>
      ) : !scheduledCoupons.data.length ? (
        <div className="table-container">
          <div className="content content-coupons">
            <div
              className="content-header__info d-flex"
              style={{ justifyContent: "center" }}
            >
              <span>Chưa có mã giảm giá nào được kích hoạt</span>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <table>
            <thead>
              <tr>
                <th>Code</th>
                <th>Giảm giá</th>
                <th>Thời gian hiệu lực</th>
                <th>Số lượng</th>
                <th>Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {scheduledCoupons.data.map((coupon, i) => {
                const { code, discount_price, time_remaining, expires } =
                  coupon;
                const {
                  coupon: { enrollment_limit },
                  status,
                  created_at,
                } = coupon;
                const discountPrice = parseInt(discount_price);
                const isFreeCoupon = discountPrice === 0 ? true : false;
                const isUnlimited = enrollment_limit === 0 ? true : false;

                return (
                  <tr key={i}>
                    <td>
                      <span>{code}</span>
                    </td>
                    <td>
                      <span>
                        {isFreeCoupon
                          ? "Miễn phí"
                          : discountPrice.toLocaleString("vi-VN")}
                      </span>
                    </td>
                    <td>
                      <div>Còn lại: {time_remaining + " ngày"}</div>

                      <div>Ngày tạo: {created_at}</div>
                      <div>Ngày hết hạn: {expires}</div>
                    </td>
                    <td>
                      <span>
                        {isUnlimited
                          ? "Không giới hạn"
                          : "0/" + enrollment_limit}
                      </span>
                    </td>
                    <td>
                      <span>{status ? "Kích hoạt" : "Đã tắt"}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ActiveCoupon;
