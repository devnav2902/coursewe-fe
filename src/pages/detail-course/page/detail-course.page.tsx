import {
  FacebookOutlined,
  GoogleOutlined,
  TwitterOutlined,
} from "@ant-design/icons";
import { Col, Collapse, Row, Spin } from "antd";
import { useEffect, useState } from "react";
import { BiCheck } from "react-icons/bi";
import { GoPrimitiveDot } from "react-icons/go";
import { Link, useParams } from "react-router-dom";
import CourseApi from "../../../api/course.api";
import Loading from "../../../components/Loading/Loading.component";
import Rating from "../../../components/Rating/Rating.component";
import {
  Course,
  CourseOutcome,
  CourseRequirements,
  Lecture,
  LectureItems,
  Price,
  Ratings,
  SectionItems,
} from "../../../ts/types/course.types";
import { User } from "../../../ts/types/user.types";
import { routesWithParams } from "../../../utils/constants";
import { roundsTheNumber } from "../../../utils/functions";
import CurriculumItem from "../components/CurriculumItem.component";
import RatingGraph from "../components/RatingGraph.component";
import Review from "../components/Review.component";
import Sidebar from "../components/Sidebar/Sidebar.component";

const { Panel } = Collapse;

type CustomLecture = Omit<Lecture, "resource_count"> & {
  resource_count: number;
};

export type CustomCourse = Omit<Course, "lecture"> & {
  course_outcome: CourseOutcome[];
  course_requirements: CourseRequirements[];
  course_bill_count: number;
  rating_avg_rating: string;
  section: SectionItems;
  description: string;
  author: User;
  price: Price;
  video_demo: string;
  section_count: number;
  lecture_count: number;
  lecture: CustomLecture[];
  rating: Ratings;
  rating_count: number;
  subtitle: string;
};

const DetailCoursePage = () => {
  const [course, setCourse] = useState<CustomCourse | null>(null);
  const [graph, setGraph] = useState(null);

  const { slug } = useParams() as { slug: string };

  useEffect(() => {
    CourseApi.getCourseBySlug(slug).then((res) => {
      const { data } = res;

      setCourse(data.course);
      setGraph(data.graph);
    });
  }, [slug]);

  if (!course)
    return (
      <Loading>
        <Spin size="large" />
      </Loading>
    );

  const { title, description, author, subtitle, section } = course;
  const { course_requirements, course_outcome } = course;
  const { rating_count, course_bill_count, rating_avg_rating, rating } = course;

  return (
    <div className="detail-course">
      <div className="main-lesson">
        <div className="main-lesson__content">
          <div className="main-lesson__head d-flex">
            <div className="head-content">
              <div className="title">
                <h1>{title}</h1>
              </div>

              <div className="subtitle">{subtitle}</div>

              <div className="rating-content d-flex align-items-center">
                {rating_avg_rating && (
                  <span>{roundsTheNumber(rating_avg_rating, 1)}</span>
                )}

                <Rating
                  value={roundsTheNumber(rating_avg_rating, 1)}
                  size="14px"
                />

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
                    <li>
                      <Link to="/" className="">
                        <FacebookOutlined />
                      </Link>
                    </li>
                    <li>
                      <Link to="/" className="">
                        <GoogleOutlined />
                      </Link>
                    </li>
                    <li>
                      <Link to="/" className="">
                        <TwitterOutlined />
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <Sidebar course={course} />
          </div>
        </div>

        <div className="main-content">
          <div className="course-content">
            <div className="course-info">
              {!course_outcome.length ? null : (
                <div className="course-info__item pd-2 border">
                  <p>Bạn sẽ nhận được</p>
                  <Row gutter={[20, 14]}>
                    {course_outcome
                      .sort((a, b) => a.order - b.order)
                      .map((item, i) => (
                        <Col
                          key={i}
                          span={12}
                          className="align-items-center d-flex"
                        >
                          <BiCheck className="mr-1" fontSize={18} />
                          {item.description}
                        </Col>
                      ))}
                  </Row>
                </div>
              )}

              <div className="course-info__item">
                <p>Nội dung khóa học</p>
                <Collapse defaultActiveKey={["0"]}>
                  {section.map((sectionItem, i) => {
                    const { title } = sectionItem;
                    return (
                      <Panel header={<b>{title}</b>} key={i}>
                        {sectionItem.lecture.map((lecture) => {
                          const { title, id, playtime_seconds } = lecture;
                          return (
                            <CurriculumItem
                              title={title}
                              playtime_seconds={playtime_seconds}
                              key={id}
                            />
                          );
                        })}
                      </Panel>
                    );
                  })}
                </Collapse>
              </div>

              {!course_requirements.length ? null : (
                <div className="course-info__item">
                  <p>Yêu cầu của khóa học</p>
                  <Row gutter={[20, 10]}>
                    {course_requirements
                      .sort((a, b) => a.order - b.order)
                      .map((item, i) => (
                        <Col
                          key={i}
                          span={24}
                          className="align-items-center d-flex"
                        >
                          <GoPrimitiveDot className="mr-1" fontSize={14} />
                          {item.description}
                        </Col>
                      ))}
                  </Row>
                </div>
              )}

              <div className="course-info__item">
                <p>Thông tin khóa học</p>
                <div dangerouslySetInnerHTML={{ __html: description }} />
              </div>

              <div className="course-info__item">
                <p>Đánh giá từ học viên</p>
                <div className="tab active-tab" id="review-box">
                  {!graph ? null : (
                    <RatingGraph
                      rating_avg_rating={rating_avg_rating}
                      graph={graph}
                    />
                  )}

                  <Review reviews={rating} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailCoursePage;