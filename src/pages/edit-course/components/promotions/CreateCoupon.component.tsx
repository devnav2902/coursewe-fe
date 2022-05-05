import { Col, Modal, Radio, RadioChangeEvent, Row, Spin } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  useAppDispatch,
  useTypedSelector,
} from "../../../../hooks/redux.hooks";
import { getListPrice } from "../../../../redux/slices/instructor-course.slice";
import {
  getCouponTypes,
  getInformationCreateCoupon,
  getScheduledCoupons,
  resetSubmitCreatedCoupon,
} from "../../../../redux/slices/promotions.slice";
import { CouponType } from "../../../../ts/types/coupon.types";
import SelectedCouponType from "./SelectedCouponType.component";

const CreateCoupon = () => {
  const { id } = useParams() as { id: string };
  const currentMonth = moment().month() + 1;

  const { success: succeedSubmitCoupon } = useTypedSelector(
    (state) => state.promotion.submitCreatedCoupon
  );
  const couponTypes = useTypedSelector((state) => state.promotion.couponTypes);
  const {
    data: {
      canCreate,
      isFreeCourse,
      maxCouponInAMonth,
      couponsCreationRemaining,
    },
    loaded: loadedInformationCreateCoupon,
  } = useTypedSelector((state) => state.promotion.informationCreateCoupon);
  const dispatch = useAppDispatch();

  const [displayCreateCoupon, setDisplayCreateCoupon] = useState(false);
  const [selectedCouponType, setSelectedCouponType] =
    useState<CouponType | null>(null);

  useEffect(() => {
    dispatch(getCouponTypes());
    dispatch(getInformationCreateCoupon(parseInt(id)));
    dispatch(getListPrice());
  }, [dispatch, id]);

  useEffect(() => {
    if (succeedSubmitCoupon) {
      const courseId = parseInt(id);

      setDisplayCreateCoupon(false);
      dispatch(getInformationCreateCoupon(courseId));
      dispatch(getScheduledCoupons(courseId));
      dispatch(resetSubmitCreatedCoupon());
    }
  }, [succeedSubmitCoupon, dispatch]);

  console.log("re-render create coupon");

  function showModalCreateCoupon() {
    setDisplayCreateCoupon(true);
  }

  function onChangeCouponType(e: RadioChangeEvent) {
    setSelectedCouponType(e.target.value);
  }

  function hideModalCreateCoupon() {
    setDisplayCreateCoupon(false);
  }

  return (
    <div className="coupons">
      <Modal
        width={625}
        getContainer={false}
        title={
          <div>
            <b style={{ fontSize: 19 }} className="mb-1 d-block">
              Tạo mã giảm giá mới
            </b>
            <span style={{ fontSize: 14 }} className="d-block">
              Bạn có thể tạo thêm {couponsCreationRemaining} mã giảm giá cho đến
              cuối tháng {currentMonth}
            </span>
          </div>
        }
        visible={displayCreateCoupon}
        onCancel={hideModalCreateCoupon}
        footer={false}
      >
        <div className="data-coupon">
          <div className="data-coupon__type">
            <div className="radio">
              <b style={{ fontSize: 18 }} className="mb-1 d-block">
                Chọn một kiểu mã giảm giá cho khóa học:
              </b>
              <div className="radio-grid">
                <Radio.Group
                  onChange={onChangeCouponType}
                  value={selectedCouponType}
                >
                  <Row gutter={[12, 12]}>
                    {couponTypes.data.map((type, i) => {
                      return (
                        <Col key={i} span={12}>
                          <div className="col-coupon">
                            <Radio value={type}>
                              <b className="d-block" style={{ fontSize: 16 }}>
                                {type.label}
                              </b>
                              <div style={{ fontSize: 14 }}>
                                <span className="d-block">
                                  {type.description}
                                </span>
                                <span className="d-block">
                                  {type.expiration}
                                </span>
                              </div>
                            </Radio>
                          </div>
                        </Col>
                      );
                    })}
                  </Row>
                </Radio.Group>
              </div>
            </div>

            {selectedCouponType && (
              <SelectedCouponType selectedCouponType={selectedCouponType} />
            )}
          </div>
        </div>
      </Modal>
      <p className="font-heading">Mã giảm giá</p>
      <div className="table-container">
        <p className="month-coupons">Mã giảm giá tháng {currentMonth}</p>
        {!loadedInformationCreateCoupon ? (
          <div className="d-flex align-items-center justify-content-center">
            <Spin />
          </div>
        ) : (
          <div className="content content-coupons">
            <div className="content-header__info d-flex justify-content-center">
              {canCreate ? (
                <>
                  {couponsCreationRemaining < maxCouponInAMonth ? (
                    <span>
                      Bạn có thể tạo thêm{" "}
                      <b>{couponsCreationRemaining} mã giảm giá</b> trong tháng
                      này
                    </span>
                  ) : (
                    <span>
                      Bạn có thể tạo tối đa{" "}
                      <b>{maxCouponInAMonth} mã giảm giá</b> mỗi tháng
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={showModalCreateCoupon}
                    className="create-coupon"
                  >
                    Tạo mã giảm giá mới
                  </button>
                </>
              ) : isFreeCourse ? (
                <p>Bạn không thể tạo mã giảm giá cho khóa học miễn phí.</p>
              ) : (
                <span className="notification">
                  Bạn đã tạo tối đa {maxCouponInAMonth} mã giảm giá trong tháng
                  này
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateCoupon;
