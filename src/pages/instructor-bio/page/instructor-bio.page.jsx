import { Row, Col } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import axiosClient from "../../../utils/axios";
import { API_URL, BE_URL } from "../../../utils/constants";
import Course from "../components/Course.component";
import { Pagination } from "antd";
import { isUrl } from "../../../utils/functions";

const InstructorBioPage = () => {
  const { slug } = useParams();
  const [dataInstructor, setDataInstructor] = useState(null);

  useEffect(() => {
    axiosClient.get(API_URL + "/instructor/profile/" + slug).then((res) => {
      setDataInstructor(res.data);
    });
  }, [slug]);

  if (!dataInstructor) return null;
  const {
    author,
    totalCourses,
    totalReviews,
    totalStudents,
    courses: dataCourses,
  } = dataInstructor;

  const isInstructor = dataCourses.data.length && true;
  console.log(dataCourses);

  return isInstructor ? (
    <div className="profile">
      <div className="instructor-profile--left-column">
        <div className="instructor">Giảng viên</div>

        <h1 className="name-author">{author.fullname}</h1>
        {/* <h2 className="headline" style="font-size: 1.4rem">{{ $author->bio->headline }}</h2> */}

        <div className="instructor-profile">
          <div className="total-tag">
            <div className="heading-sm">Số học viên</div>
            <div className="number">{totalStudents}</div>
          </div>
          <div className="review-tag">
            <div className="heading-sm">Reviews</div>
            <div className="number">{totalReviews}</div>
          </div>
        </div>

        <h2 className="info-title">About me</h2>
        <div className="show-more">
          <div className="content markdown">
            {/* {!! $author->bio->bio !!} */}
          </div>

          <div className="my-course">
            <h2 className="course-title">Các khóa học&nbsp;({totalCourses})</h2>

            <Row gutter={[15, 15]} className="list-courses">
              {dataCourses.data.map((course) => {
                return (
                  <Col key={course.id} span={12}>
                    <Course course={course} />
                  </Col>
                );
              })}
            </Row>

            <Pagination
              // current={dataCourses.currentPage}
              total={dataCourses.total}
              // onChange={(page) => console.log(page)}

              // total={85}
              // defaultPageSize={20}
              // defaultCurrent={1}
            />
          </div>
        </div>
      </div>

      <div className="instructor-profile--right-column">
        <div className="img">
          <img
            src={
              isUrl(author.avatar)
                ? author.avatar
                : BE_URL + "/" + author.avatar
            }
            alt=""
            className="avatar"
          />
        </div>
        {/* @if (!empty($author->bio->linkedin))
                <div className="socical-link">
                    <div className="my-link">
                        <a href="{{ $author->bio->linkedin }}"><i
                                className="fab fa-linkedin"></i><span>Linkedin</span></a>
                    </div>
                </div>
            @endif
            @if (!empty($author->bio->twitter))
                <div className="socical-link">
                    <div className="my-link">
                        <a href="{{ $author->bio->twitter }}"><i className="fab fa-twitter"></i><span>Twitter</span></a>
                    </div>
                </div>
            @endif
            @if (!empty($author->bio->facebook))
                <div className="socical-link">
                    <div className="my-link">
                        <a href="{{ $author->bio->facebook }}"><i
                                className="fab fa-facebook"></i><span>Facebook</span></a>
                    </div>
                </div>
            @endif
            @if (!empty($author->bio->youtube))
                <div className="socical-link">
                    <div className="my-link">
                        <a href="{{ $author->bio->youtube }}"><i className="fab fa-youtube"></i><span>Youtube</span></a>
                    </div>
                </div>
            @endif */}
      </div>
    </div>
  ) : (
    <div className="user-profile">
      <div className="header-bar">
        <h1>{author.fullname}</h1>
      </div>
      <div className="user-profile-content d-flex">
        <div className="user-profile__left">
          <img
            src={
              isUrl(author.avatar)
                ? author.avatar
                : BE_URL + "/" + author.avatar
            }
            alt=""
            className="circle-img avatar mb-1"
          />
          {/* <h2>{{ $author->bio->headline }}</h2> */}
          {/* <ul className="social-box d-flex align-items-center justify-content-center ">
                    @if (!empty($author->bio->linkedin))
                        <li className="socical-link">
                            <div className="my-link">
                                <a href="{{ $author->bio->linkedin }}"><i className="fab fa-linkedin"></i></a>
                            </div>
                        </li>
                    @endif
                    @if (!empty($author->bio->twitter))
                        <li className="socical-link">
                            <div className="my-link">
                                <a href="{{ $author->bio->twitter }}"><i className="fab fa-twitter"></i></a>
                            </div>
                        </li>
                    @endif
                    @if (!empty($author->bio->facebook))
                        <li className="socical-link">
                            <div className="my-link">
                                <a href="{{ $author->bio->facebook }}"><i className="fab fa-facebook"></i></a>
                            </div>
                        </li>
                    @endif
                    @if (!empty($author->bio->youtube))
                        <li className="socical-link">
                            <div className="my-link">
                                <a href="{{ $author->bio->youtube }}"><i className="fab fa-youtube"></i></a>
                            </div>
                        </li>
                    @endif
                    {{-- <li className="facebook">
                        <a href="#" className=""><i className=" facebook-icon fab fa-facebook-f"></i></a>
                    </li>
                    <li className="google ml-1">
                        <a href="#" className=""><i className=" google-icon fab fa-google"></i></a>
                    </li>
                    <li className="twitter ml-1">
                        <a href="#" className=""><i className=" twitter-icon fab fa-twitter"></i></a>
                    </li> --}}
                </ul> */}
        </div>
        {/* @if (!empty($author->bio))
                <div className="user-profile__right">
                    <div className="biography">
                        {!! $author->bio->bio !!}
                    </div>
                </div>
            @endif */}
      </div>
    </div>
  );
};

export default InstructorBioPage;
