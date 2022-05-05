import { Spin } from "antd";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  useAppDispatch,
  useTypedSelector,
} from "../../../../hooks/redux.hooks";
import { getScheduledCoupons } from "../../../../redux/slices/promotions.slice";
import { StyledCouponTable } from "../../styles/promotions.styles";

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
        <StyledCouponTable>
          <thead>
            <tr>
              <th>Code</th>
              <th>Giảm giá</th>
              <th>Thời gian hiệu lực</th>
              <th>Số lượng</th>
              <th>Số lượng ghi danh</th>
              <th>Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {scheduledCoupons.data.map((coupon, i) => {
              const { code, discount_price, time_remaining, expires } = coupon;
              const {
                currently_enrolled,
                coupon: { enrollment_limit },
                status,
                created_at,
              } = coupon;
              const discountPrice = discount_price + " đ";
              const originalPrice = priceOfCourse?.format_price + " đ";
              const isFreeCoupon =
                parseInt(discount_price) === 0 ? true : false;
              const isUnlimited = enrollment_limit === 0 ? true : false;

              return (
                <tr key={i}>
                  <td>
                    <span>{code}</span>
                  </td>
                  <td style={{ whiteSpace: "nowrap" }}>
                    {isFreeCoupon ? (
                      "Miễn phí"
                    ) : (
                      <div className="d-flex flex-column">
                        <span className="line-through">{originalPrice}</span>{" "}
                        {discountPrice}
                      </div>
                    )}
                  </td>
                  <td>
                    <div>Còn lại: {time_remaining + " ngày"}</div>

                    <div>
                      Ngày bắt đầu:{" "}
                      <span className="d-block">{created_at}</span>
                    </div>
                    <div>
                      Ngày hết hạn: <span className="d-block">{expires}</span>
                    </div>
                  </td>
                  <td>
                    <span>
                      {isUnlimited ? "Không giới hạn" : "0/" + enrollment_limit}
                    </span>
                  </td>
                  <td>
                    <span className="center">{currently_enrolled}</span>
                  </td>
                  <td>
                    <span>{status ? "Kích hoạt" : "Đã tắt"}</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </StyledCouponTable>
      )}
    </div>
  );
};

export default ActiveCoupon;
