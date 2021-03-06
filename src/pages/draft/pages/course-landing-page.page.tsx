import { Alert, Col, Collapse, Row } from "antd";
import { useEffect, useState } from "react";
import { BiCheck } from "react-icons/bi";
import { GoPrimitiveDot } from "react-icons/go";
import { Link, Navigate, useParams } from "react-router-dom";
import CourseApi, { CustomCourse } from "../../../api/course.api";
import Loading from "../../../components/Loading/Loading.component";
import Rating from "../../../components/Rating/Rating.component";
import { useTypedSelector } from "../../../hooks/redux.hooks";
import { Role } from "../../../ts/types/user.types";
import { ROUTES } from "../../../utils/constants";
import CurriculumItem from "../../detail-course/components/CurriculumItem.component";
import {
  StyledCourseContent,
  StyledDetailCourseMain,
  StyledDetailCourseWrapper,
  StyledInfoBoxed,
  StyledMainContent,
} from "../../detail-course/styles/detail-course.styles";
import Sidebar from "../components/course-landing-page/Sidebar.component";

const { Panel } = Collapse;

const DraftPage = () => {
  const { profile } = useTypedSelector((state) => state.user);

  const { id } = useParams() as { id: string };

  const [dataCourse, setDataCourse] = useState<{
    loaded: boolean;
    course: null | CustomCourse;
  }>({ course: null, loaded: false });

  useEffect(() => {
    CourseApi.draftCoursePreview(parseInt(id)).then(({ data }) => {
      const { course } = data;

      setDataCourse((state) => ({ ...state, course: course, loaded: true }));
    });
  }, [id]);

  if (!dataCourse.loaded) return <Loading />;
  if (!dataCourse.course) return Navigate({ to: ROUTES.NOT_FOUND });

  const {
    title,
    description,
    section,
    subtitle,
    course_requirements,
    course_outcome,
  } = dataCourse.course;

  const role = profile?.role.name as Role;

  return (
    <>
      <nav className="nav-top">
        <div className="nav-content">
          <div className="logo">
            <Link
              to={role === "admin" ? ROUTES.home("admin") : ROUTES.home("user")}
            >
              Coursewe
            </Link>
          </div>
          <div className="cancel-btn ml-auto">
            <a
              href={
                role === "admin" ? ROUTES.ADMIN_REVIEW : ROUTES.home("user")
              }
              className="fw-bold"
            >
              Tr??? v???
            </a>
          </div>
        </div>
      </nav>
      <StyledDetailCourseWrapper className="spacing-top-nav">
        <StyledDetailCourseMain>
          <div className="linear-gradient head-wrapper">
            <div className="head d-flex">
              <div className="head-content">
                <div className="title">
                  <h1>{title}</h1>
                </div>

                <div className="subtitle">{subtitle}</div>

                <div className="rating-content d-flex align-items-center">
                  <span>0.0</span>

                  <Rating count={1} value={1} size="14px" />

                  <span className="rating-count">(0 ????nh gi??)</span>
                  <span>0 H???c vi??n</span>
                </div>

                <StyledInfoBoxed>
                  <div className="pull-left">
                    <h6>Gi???ng vi??n</h6>
                    <div className="info-author">
                      <div className="authors">
                        {dataCourse.course && (
                          <Link
                            to={ROUTES.instructor_bio(
                              dataCourse.course.author.slug
                            )}
                          >
                            {dataCourse.course.author.fullname}
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </StyledInfoBoxed>

                <Row>
                  <Col span={24}>
                    <Alert
                      message={
                        <>
                          <h6>Kh??a h???c n??y ??ang trong ch??? ????? x??t duy???t.</h6>
                          <span className="contact">
                            ????? bi???t th??m th??ng tin, vui l??ng li??n h???&nbsp;
                            <Link
                              to={ROUTES.instructor_bio(
                                dataCourse.course.author.slug
                              )}
                            >
                              {dataCourse.course.author.fullname}
                            </Link>
                          </span>
                        </>
                      }
                      type="warning"
                      showIcon
                    />
                  </Col>
                </Row>
              </div>

              <Sidebar course={dataCourse.course} />
            </div>
          </div>

          <StyledMainContent>
            <StyledCourseContent>
              <div className="course-info">
                {!course_outcome.length ? null : (
                  <div className="course-info__item pd-2 border">
                    <p>B???n s??? nh???n ???????c</p>
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
                  <p>N???i dung kh??a h???c</p>
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
                    <p>Y??u c???u c???a kh??a h???c</p>
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
                  <p>Th??ng tin kh??a h???c</p>
                  <div dangerouslySetInnerHTML={{ __html: description }} />
                </div>

                <div className="course-info__item">
                  <p>????nh gi?? t??? h???c vi??n</p>
                  <div className="tab active-tab" id="review-box">
                    Kh??a h???c n??y ch??a c?? b???t k?? ????nh gi?? n??o!
                  </div>
                </div>
              </div>
            </StyledCourseContent>
          </StyledMainContent>
        </StyledDetailCourseMain>
      </StyledDetailCourseWrapper>
    </>
  );
};
export default DraftPage;
