import {
  CaretRightOutlined,
  FacebookOutlined,
  GoogleOutlined,
  TwitterOutlined,
} from "@ant-design/icons";
import { Spin, Tabs, Collapse } from "antd";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import CourseApi from "../../../api/course.api";
import Loading from "../../../components/Loading/Loading.component";
import Rating from "../../../components/Rating/Rating.component";
import { BE_URL, routesWithParams } from "../../../utils/constants";
import { isUrl, roundsTheNumber } from "../../../utils/functions";
import CurriculumItem from "../components/CurriculumItem.component";

const { Panel } = Collapse;

function callback(key) {
  console.log(key);
}

const DetailCoursePage = () => {
  const [course, setCourse] = useState(null);
  const { slug } = useParams();

  useEffect(() => {
    CourseApi.getCourseBySlug(slug).then((res) => {
      setCourse(res.data);
    });
  }, []);

  if (!course)
    return (
      <Loading>
        <Spin size="large" />
      </Loading>
    );

  const {
    title,
    rating_avg_rating,
    rating_count,
    video_demo,
    description,
    thumbnail,
    course_bill_count,
    section_count,
    author,
    lecture_count,
    lecture,
    section,
  } = course;

  const resource_count = lecture.reduce(
    (total, item) => (total += item.resource_count),
    0
  );

  return (
    <div className="detail-course">
      <div className="main-lesson">
        <div className="main-content">
          <div className="course-content">
            <div className="title">
              <h1>{title}</h1>
            </div>

            <div className="rating-content">
              {rating_avg_rating && (
                <span>{roundsTheNumber(rating_avg_rating, 1)}</span>
              )}

              <span className="stars">
                <Rating
                  value={roundsTheNumber(rating_avg_rating, 1)}
                  size="14px"
                />
              </span>
              <span className="rating-count">({rating_count} Đánh giá)</span>
              <span>{course_bill_count} Học viên</span>
            </div>

            <div className="video-info-boxed">
              <div className="pull-left">
                <h6>Giảng viên</h6>
                <div className="info-author">
                  <div className="authors">
                    <Link to={routesWithParams.instructor_bio(author.slug)}>
                      {author.fullname}
                    </Link>
                  </div>
                </div>
              </div>
              <div className="pull-right">
                <ul className="social-box">
                  <li className="share">Chia sẻ khóa học:</li>
                  <li className="facebook">
                    <Link to="/" className="">
                      <FacebookOutlined />
                    </Link>
                  </li>
                  <li className="google">
                    <Link to="/" className="">
                      <GoogleOutlined />
                    </Link>
                  </li>
                  <li className="twitter">
                    <Link to="/" className="">
                      <TwitterOutlined />
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="course-info">
              <div className="course-info__item">
                <p>Thông tin khóa học</p>
                <div dangerouslySetInnerHTML={{ __html: description }} />
              </div>

              <div className="course-info__item">
                <p>Nội dung khóa học</p>
                <Collapse defaultActiveKey={["0"]} onChange={callback}>
                  {section.map((sectionItem, i) => {
                    const { title } = sectionItem;
                    return (
                      <Panel header={<b>{title}</b>} key={i}>
                        {sectionItem.lecture.map((lecture) => {
                          const { title, id } = lecture;
                          return <CurriculumItem title={title} key={id} />;
                        })}
                      </Panel>
                    );
                  })}
                </Collapse>
              </div>
              <div className="course-info__item">
                <p>Đánh giá từ học viên</p>
                <div className="tab active-tab" id="review-box">
                  {/* @include('components.student-review',['course'=>$course]) */}

                  {/* @include('components.review-comment',['course'=>$course]) */}
                </div>
              </div>
            </div>
          </div>
          <div className="main-content__sidebar">
            <div className="widget-content sticky-top">
              <div
                className="intro-video"
                style={{
                  backgroundImage: `url(${
                    isUrl(thumbnail) ? thumbnail : BE_URL + "/" + thumbnail
                  })`,
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
            @elseif (!$isFree && !$isPurchased)
              <div data-coupon="{{ !empty($couponJSON) ? $couponJSON : '' }}" data-course="{{ $course->id }}"
                className='addToCart'>Add to cart</div>
              <button data-course="{{ $course->id }}" className="buy" id="buy">Buy now</button>
            @else
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
                <li>{section_count} chương học</li>
                <li>{lecture_count} bài giảng</li>
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
        </div>
      </div>

      <div className="video-demo hidden">
        <div className="video-container">
          <div className="video">
            <div className="video-top">
              <div className="video-top-left">
                <h5>Course Preview</h5>
              </div>
              <div className="video-top-right">
                <i className="fas fa-times"></i>
              </div>
            </div>
            <h4>title </h4>
            <video
              className="video-js vjs-big-play-centered"
              id="videoPlayer"
              controls
              poster="{{ $course->thumbnail }}"
            >
              <source src="{{ asset($course->video_demo) }}" type="video/mp4" />

              <p className="vjs-no-js">
                To view this video please enable JavaScript, and consider
                upgrading to a web browser that
                <a
                  href="https://videojs.com/html5-video-support/"
                  target="_blank"
                >
                  supports HTML5 video
                </a>
              </p>
            </video>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailCoursePage;
