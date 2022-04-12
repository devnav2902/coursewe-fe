import {
  CaretRightOutlined,
  CloseOutlined,
  DesktopOutlined,
  StarFilled,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Row } from "antd";
import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player/lazy";
import { useDispatch, useSelector } from "react-redux";
import CartButton from "../../../components/CartButton/CartButton.component";
import WishlistButton from "../../../components/WishlistButton/WishlistButton.component";
import { addToCart, removeFromCart } from "../../../redux/actions/cart.actions";
import { linkThumbnail, roundsTheNumber } from "../../../utils/functions";

const Sidebar = ({ course }) => {
  const {
    title,
    thumbnail,
    section_count,
    lecture_count,
    lecture,
    rating_avg_rating,
    rating_count,
    course_bill_count,
  } = course;

  const dispatch = useDispatch();
  const cartData = useSelector((state) => state.cart);

  const [handleVideo, setHandleVideo] = useState({
    displayVideo: false,
    playingVideo: false,
  });
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

  function handleAddToCart(id) {
    dispatch(addToCart(id));
  }

  function handleRemoveFromCart(id) {
    dispatch(removeFromCart(id));
  }

  function existedCourseInCart(id) {
    cartData.cart.some((course) => course.id === id);
  }

  function hideVideoDemo() {
    setHandleVideo((state) => ({ ...state, displayVideo: false }));
  }

  function displayVideoDemo() {
    setHandleVideo((state) => ({ ...state, displayVideo: true }));
  }

  function playVideo() {
    setHandleVideo((state) => ({ ...state, playingVideo: true }));
  }

  return (
    <>
      <nav className={`nav-top${offset >= 400 ? " nav-top-fixed" : ""}`}>
        <Row align="middle" className="h-100">
          <div className="info-course">
            <div className="title">{title}</div>

            <div className="rating-content d-flex align-items-center">
              {rating_avg_rating && (
                <span>{roundsTheNumber(rating_avg_rating, 1)}</span>
              )}

              <StarFilled />

              <span className="rating-count">({rating_count} Đánh giá)</span>
              <span>{course_bill_count} Học viên</span>
            </div>
          </div>
        </Row>
      </nav>
      <div className={`head-sidebar${offset >= 400 ? " fixed" : ""}`}>
        <div className="widget-content">
          <div
            onClick={displayVideoDemo}
            className="intro-video"
            style={{
              backgroundImage: `url(${linkThumbnail(thumbnail)})`,
            }}
          >
            <div className="intro-video-play">
              <span className="lightbox-image intro-video-box media-play-symbol">
                <CaretRightOutlined />
              </span>
            </div>
            <h4>Xem thử</h4>
          </div>

          <div className="price">
            <span className="original-price">150.000 đ</span>
            {/* @if (empty($coupon))
              <span className="original-price">
                @if ($course->price->price == 0.0)
                  Free
                @else
                  ${{ $course->price->price }}
                @endif
              </span>
            @else
              @if ($coupon->discount_price <= $course->price->price)
                <span className="original-price">
                  @if (!empty($isFree))
                    Free
                  @else
                    ${{ $coupon->discount_price }}
                  @endif
                </span>
                <span className="original-price sale-off">
                  ${{ $course->price->price }}
                </span>
                <span className="discount">{{ $saleOff }}% off</span>
              @endif
            @endif */}
          </div>

          <div className="buttons-box">
            {/* @if (Auth::check() && ($globalUser->role->name === 'admin' || $globalUser->id === $course->author_id))
              <a href='{{ route('learning', ['url' => $course->slug]) }}' className='theme-btn btn-style-one'>
                <span className='txt'>Xem</span>
              </a>
            @elseif (!$isFree && !$isPurchased) */}
            <div className="d-flex align-items-center btn-wrapper">
              <CartButton course={course} />
              <WishlistButton course={course} />
            </div>

            <button data-course="{{ $course->id }}" className="buy" id="buy">
              Mua ngay
            </button>
            {/* @else
              @if ($isPurchased)
                <a href='{{ route('learning', ['url' => $course->slug]) }}' className="enroll">
                  Vào học
                </a>
              @else
                @if (!empty($isFreeCoupon) || $isFree)
                  <form action="{{ route('free-enroll') }}" method="post">
                    @csrf
                    @if (!empty($isFreeCoupon))
                      <input type="hidden" name="coupon" value="{{ $coupon->coupon_id }}">
                      <input type="hidden" name="code" value="{{ $coupon->code }}">
                    @endif

                    <input type="hidden" name="course_id" value="{{ $course->id }}">
                    <button className="enroll" id="enroll">Tham gia khóa học</button>
                  </form>
                @endif
              @endif
            @endif */}
          </div>

          <div className="infor-course">
            <h4>Khóa học gồm có:</h4>
            {!resource_count ? null : (
              <li>{resource_count}&nbsp;tài liệu học tập</li>
            )}
            <li>
              <VideoCameraOutlined className="mr-1" /> {section_count} chương
              học
            </li>
            <li>
              <DesktopOutlined className="mr-1" /> {lecture_count} bài giảng
            </li>
          </div>

          {/* @if ($course->price->price !== 0.0)
            <form action="" id="coupon-form" method="POST" className="coupon">
              @csrf

              @if (empty($globalUser))
                <div className="coupon-wrapper">
                  <input name="coupon-input" placeholder="Enter Coupon" type="text">
                  <button id="apply" type="submit">Apply</button>
                </div>
              @else
                @if (!$isPurchased && $globalUser->id !== $course->author_id)
                  <div className="coupon-wrapper">
                    <input name="coupon-input" placeholder="Enter Coupon" type="text">
                    <button id="apply" type="submit">Apply</button>
                  </div>
                @endif
              @endif

              @if (Request::method() == 'POST')
                @if (empty($coupon))
                  <p className="warning">Mã code vừa nhập không chính xác, vui lòng thử lại.
                  </p>
                @else
                  <div className="coupon-code d-flex">
                    <button id="remove" type="button" onclick="location.href = location.href">
                      <i className="fas fa-times"></i>
                    </button>
                    <p><b>{{ $coupon->code }}</b> đã được áp dụng</p>
                  </div>
                @endif
              @endif
            </form>
          @endif */}
        </div>
      </div>
      {handleVideo.displayVideo && (
        <div className="video-demo">
          <div className="video-container">
            <div className="video">
              <div className="video-top">
                <div className="video-top-left">
                  <h5>Giới thiệu khóa học</h5>
                </div>
                <div className="video-top-right">
                  <CloseOutlined onClick={hideVideoDemo} />
                </div>
              </div>
              <h4>Khóa học: {title}</h4>

              {/* <ReactPlayer width="100%" url={BE_URL + "/" + video_demo} /> */}
              <div className="react-player">
                <ReactPlayer
                  light={linkThumbnail(thumbnail)}
                  width="100%"
                  height="100%"
                  playing={handleVideo.playingVideo}
                  onClickPreview={playVideo}
                  controls={handleVideo.playingVideo ? true : false}
                  url={
                    "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                  }
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
