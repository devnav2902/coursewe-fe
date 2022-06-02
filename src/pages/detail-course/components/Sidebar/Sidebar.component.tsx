import { DesktopOutlined, VideoCameraOutlined } from "@ant-design/icons";
import { Skeleton } from "antd";
import { FC, useEffect, useRef, useState } from "react";
import { BiInfinite } from "react-icons/bi";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import CouponApi from "../../../../api/coupon.api";
import CourseApi, { CustomCourse } from "../../../../api/course.api";
import { Coupon } from "../../../../ts/types/coupon.types";
import { ROUTES } from "../../../../utils/constants";
import { openNotification } from "../../../../utils/functions";
import { StyledGoToCourseBtn } from "../../styles/detail-course.styles";
import ButtonContainer from "./ButtonContainer.component";
import CouponAndGift, { CouponProps } from "./CouponAndGift.component";
import Nav from "./Nav.component";
import Price from "./Price.component";
import Video from "./Video.component";

type SidebarProps = {
  course: CustomCourse;
};

export type DataCoupon = {
  message: string | undefined;
  coupon: Coupon | null;
  checkingInput: boolean;
  checkingParams: boolean;
  saleOff: number;
  isFreeCoupon: boolean;
  discount: string;
};

const Sidebar: FC<SidebarProps> = ({ course }) => {
  const { id, title, lecture, rating_avg_rating, price, thumbnail, slug } =
    course;
  const { rating_count, section_count, lecture_count, course_bill_count } =
    course;
  const { video_demo } = course;

  const [dataCheckPurchase, setDataCheckPurchase] = useState({
    loaded: false,
    hasPurchased: false,
  });
  const [dataCoupon, setDataCoupon] = useState<DataCoupon>({
    message: "",
    coupon: null,
    checkingInput: false,
    checkingParams: false,
    saleOff: 0,
    isFreeCoupon: false,
    discount: "",
  });
  const refInput = useRef({ value: "" });
  const [searchParams, setSearchParams] = useSearchParams();
  const couponCode = searchParams.get("couponCode");

  // Kiểm tra trạng thái thanh toán
  useEffect(() => {
    CourseApi.userHasPurchased(id).then((res) => {
      const {
        data: { hasPurchased },
      } = res;

      setDataCheckPurchase((state) => ({
        ...state,
        loaded: true,
        hasPurchased,
      }));
    });
  }, [id]);

  // Kiểm tra mã giảm giá
  useEffect(() => {
    // Chưa thanh toán, nếu có coupon param sẽ check coupon
    const hasPurchased =
      dataCheckPurchase.loaded && !dataCheckPurchase.hasPurchased;

    if (couponCode && hasPurchased) {
      setDataCoupon((state) => ({ ...state, checkingParams: true }));

      CouponApi.applyCoupon(couponCode, id).then((res) => {
        const { data } = res;

        if (data.message) {
          setSearchParams("");
        } else if (data.coupon) {
          setDataCoupon((state) => ({
            ...state,
            message: "",
            isFreeCoupon: data.isFreeCoupon,
            coupon: data.coupon,
            saleOff: data.saleOff,
            checkingParams: false,
            discount: data.discount,
          }));
        }
      });
    }
  }, [couponCode, dataCheckPurchase, id, setSearchParams]);

  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const onScroll = () => setOffset(window.pageYOffset);
    // clean up code
    window.removeEventListener("scroll", onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const resource_count = lecture.reduce(
    (total, item) => (total += item.resource_count),
    0
  );

  function applyCoupon() {
    if (refInput.current.value) {
      setDataCoupon((state) => ({ ...state, checkingInput: true }));
      CouponApi.applyCoupon(refInput.current.value, course.id)
        .then((res) => {
          const { data } = res;

          if (data.message)
            setDataCoupon((state) => ({
              ...state,
              message: data.message,
              checkingInput: false,
            }));
          else if (data.coupon) {
            setDataCoupon((state) => ({
              ...state,
              message: "",
              isFreeCoupon: data.isFreeCoupon,
              coupon: data.coupon,
              saleOff: data.saleOff,
              checkingInput: false,
            }));
            refInput.current.value = "";
            setSearchParams({ couponCode: data.coupon.code });
          }
        })
        .catch((error) => {
          setDataCoupon((state) => ({
            ...state,
            checkingInput: false,
            message: "Lỗi trong quá trình kiểm tra mã giảm giá",
          }));
        });
    }
  }

  const couponProps: CouponProps = {
    dataCoupon,
    applyCoupon,
    setDataCoupon,
    refInput,
    setSearchParams,
  };

  const navProps = {
    rating_avg_rating,
    rating_count,
    course_bill_count,
    title,
  };

  return (
    <>
      <Nav
        dataCheckPurchase={dataCheckPurchase}
        navProps={navProps}
        offset={offset}
      />
      <div
        className={`head-sidebar${
          offset >= 400 && !dataCheckPurchase.hasPurchased ? " fixed" : ""
        }`}
      >
        <div className="widget-content">
          <Video thumbnail={thumbnail} title={title} video_demo={video_demo} />

          {!dataCheckPurchase.loaded ? (
            <Skeleton active className="pd-2" />
          ) : dataCheckPurchase.hasPurchased ? (
            <StyledGoToCourseBtn className="pd-2">
              <Link
                to={ROUTES.learning({ course_slug: slug })}
                className="btn w-100"
              >
                Đi đến khóa học
              </Link>
            </StyledGoToCourseBtn>
          ) : (
            <>
              {dataCoupon.checkingParams ? (
                <Skeleton className="pd-2" active />
              ) : (
                <Price dataCoupon={dataCoupon} price={price} />
              )}

              <ButtonContainer course={course} dataCoupon={dataCoupon} />

              <div className="infor-course">
                <h4>Khóa học này bao gồm:</h4>
                {!resource_count ? null : (
                  <li className="d-flex align-items-center">
                    {resource_count} tài liệu học tập
                  </li>
                )}
                <li className="d-flex align-items-center">
                  <VideoCameraOutlined className="mr-1" /> {section_count}{" "}
                  chương học
                </li>
                <li className="d-flex align-items-center">
                  <DesktopOutlined className="mr-1" /> {lecture_count} bài giảng
                </li>
                <li className="d-flex align-items-center">
                  <BiInfinite className="mr-1" /> Học online trọn đời
                </li>
              </div>

              <CouponAndGift couponProps={couponProps} course={course} />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
