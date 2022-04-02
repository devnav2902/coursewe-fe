import {
  FacebookOutlined,
  GoogleOutlined,
  StarFilled,
  TwitterOutlined,
} from "@ant-design/icons";
import { Collapse } from "antd";
import React, { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import CourseApi from "../../../api/course.api";
import CurriculumItem from "../../detail-course/components/CurriculumItem.component";

const { Panel } = Collapse;

function callback(key) {
  console.log(key);
}
const DraftPage = () => {
  const {
    profile: {
      role: { name },
      fullname,
    },
  } = useSelector((state) => state.user);
  const { id } = useParams();

  const [dataCourse, setDataCourse] = useState(null);
  useEffect(() => {
    CourseApi.getCourseOfAuthorById(id).then((res) => {
      // console.log(res.data);
      const {
        data: { course },
      } = res;
      setDataCourse(course);
    });
  }, []);

  if (!dataCourse) return null;
  const { title, description, section, lecture, section_count, lecture_count } =
    dataCourse;

  const resource_count = lecture.reduce(
    (total, item) => (total += item.resource_count),
    0
  );
  return (
    <>
      <div className="main-lesson">
        <div className="header-content">
          {name === "user" ? (
            <>
              <i className="fas fa-exclamation-triangle"></i>
              <div className="notification">
                <h6>Khóa học này đang trong chế độ xét duyệt.</h6>
                <span className="contact">
                  Để biết thêm thông tin, vui lòng liên hệ
                  {/* <a
                            href="{{ route('instructor', ['slug' => $course->author->slug]) }}">{{ $course->author->fullname }}</a>. */}
                </span>
              </div>
            </>
          ) : (
            ""
            /* <form
            id="approved"
            action="{{ route('course-ratify') }}"
            method="POST"
          >
            {" "}
            @csrf
          </form>
          <form
            id="unapproved"
            action="{{ route('course-ratify') }}"
            method="post"
          >
            {" "}
            @csrf
          </form> */

            /* <div className="actions">
                    <input form="unapproved" type="hidden" value="{{ $course->id }}" name="course_id">
                    <input form="unapproved" type="hidden" value="unapproved" name="option">
                    <input form="approved" type="hidden" value="{{ $course->id }}" name="course_id">
                    <input form="approved" type="hidden" value="approved" name="option">

                    <button form="unapproved" type="submit">Cần chỉnh sửa</button>
                    <button form="approved" type="submit">Chấp thuận</button>
                </div> */
          )}

          {/* @else */}

          {/* @endif */}
        </div>
        <div className="main-content">
          <div className="course-content">
            {/* <!-- Sec Title --> */}
            <div className="title">
              <h1> {title} </h1>
            </div>
            {/* <!-- Rating --> */}
            <div className="rating-content">
              <span>0.0</span>

              <span className="stars">
                <StarFilled />
              </span>
              <span>0 ratings</span>
              <span>0 students</span>
            </div>
            {/* <!-- Video Info Boxed --> */}
            <div className="video-info-boxed">
              <div className="pull-left">
                <h6>Giảng viên</h6>
                <div className="info-author">
                  <div className="authors">{fullname}</div>
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
            {/* <!-- End Video Info Boxed --> */}

            {/* <!-- Course Info Tabs--> */}
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
            {/* <!-- Review Widget --> */}
            <div className="widget-content sticky-top">
              {/* <!-- Video Box --> */}
              <div
                className="intro-video"
                style={{
                  backgroundImage: `url("https://via.placeholder.com/500")`,
                }}
              >
                <div className="intro-video-play">
                  <span className="lightbox-image intro-video-box media-play-symbol">
                    <i className="fas fa-play media-icon"></i>{" "}
                  </span>
                </div>
                <h4>Xem thử</h4>
              </div>
              {/* <!-- End Video Box --> */}
              <div className="price">
                <span className="original-price">
                  {/* ${{ $course->price->price }} */}
                </span>
              </div>

              <div className="infor-course">
                <h4>Khóa học gồm có:</h4>
                {!resource_count ? null : (
                  <li>{resource_count}&nbsp;tài liệu học tập</li>
                )}
                <li>{section_count} chương học</li>
                <li>{lecture_count} bài giảng</li>
              </div>
            </div>
            {/* <!-- End  Widget --> */}
          </div>
          {/* <!-- ALERT --> */}
          <div className="alert-box">
            <div className="box">
              <h1></h1>
              <span></span>
              <button className="view-course" type="button">
                Xem ngay
              </button>
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
            {/* <h4>{{ $course->title }}</h4> */}
            <video
              className="video-js vjs-big-play-centered"
              id="videoPlayer"
              controls
              poster="{{ $course->thumbnail }}"
            >
              {/* <source src="{{ asset('helpers/video.mp4') }}" type="video/mp4"> */}

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
    </>
  );
};
export default DraftPage;
