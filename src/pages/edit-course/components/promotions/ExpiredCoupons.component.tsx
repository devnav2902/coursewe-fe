import { Spin } from "antd";
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

  return (
    <div className="coupons">
      <p className="font-heading">Hết hạn</p>
      {!expiredCoupons.loaded ? (
        <div className="d-flex align-items-center justify-content-center">
          <Spin />
        </div>
      ) : !expiredCoupons.data.length ? (
        <div className="table-container">
          <div className="content content-coupons">
            <div
              className="content-header__info d-flex"
              style={{ justifyContent: "center" }}
            >
              <span>Không có mã giảm giá nào</span>
            </div>
          </div>
        </div>
      ) : (
        <StyledCouponTable>
          <thead>
            <tr>
              <th>Code</th>
              <th>Giảm giá</th>
              <th>Ngày tạo</th>
              <th>Ngày hết hạn</th>
              <th>Số học viên ghi danh</th>
            </tr>
          </thead>

          <tbody>
            {expiredCoupons.data.map((coupon, index) => {
              const {
                code,
                discount_price,
                expires,
                created_at,
                currently_enrolled,
              } = coupon;
              const datetimeFormat = "DD/MM/YYYY HH:mm A";
              const createdAt = moment(created_at).format(datetimeFormat);
              const expiredAt = moment(expires).format(datetimeFormat);
              const discountPrice = discount_price + " đ";
              const isFreeCoupon =
                parseInt(discount_price) === 0 ? true : false;

              return (
                <tr key={index}>
                  <td>
                    <span>{code}</span>
                  </td>
                  <td>
                    {isFreeCoupon ? (
                      "Miễn phí"
                    ) : (
                      <div className="d-flex flex-column">{discountPrice}</div>
                    )}
                  </td>
                  <td>
                    <span>{createdAt}</span>
                  </td>
                  <td>
                    <span>{expiredAt}</span>
                  </td>
                  <td>
                    <span className="center">{currently_enrolled}</span>
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

export default ExpiredCoupons;
