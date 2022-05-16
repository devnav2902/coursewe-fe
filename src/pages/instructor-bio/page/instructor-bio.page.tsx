import { Col, Pagination, Row } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import InstructorApi, { DataInstructor } from "../../../api/instructor.api";
import Course from "../../../components/Course/Course.component";
import { linkThumbnail } from "../../../utils/functions";
import SocialBox from "../components/SocialBox.component";
import {
  StyledInstructorBioContainer,
  StyledUserProfile,
} from "../styles/instructor-bio.styles";

const InstructorBioPage = () => {
  const { slug } = useParams() as { slug: string };
  const [dataInstructor, setDataInstructor] = useState<DataInstructor | null>(
    null
  );

  useEffect(() => {
    InstructorApi.getDataInstructor(slug).then((res) => {
      setDataInstructor(res.data);
    });
  }, [slug]);

  if (!dataInstructor) return null;

  const { author, totalCourses, totalReviews, totalStudents } = dataInstructor;
  const {
    coursesData: { data: courses, total, current_page, per_page },
  } = dataInstructor;

  const isInstructor = courses.length && true;

  return isInstructor ? (
    <StyledInstructorBioContainer className="profile">
      <div className="instructor-profile--left-column">
        <div className="instructor">Giảng viên</div>

        <h1 className="name-author">{author.fullname}</h1>
        <h2 className="headline" style={{ fontSize: "1.4rem" }}>
          {author?.headline}
        </h2>

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
          <div
            className="content markdown"
            dangerouslySetInnerHTML={{ __html: author?.bio || "" }}
          />

          <div className="my-course">
            <h2 className="course-title">Các khóa học&nbsp;({totalCourses})</h2>

            <Row gutter={[15, 15]}>
              {courses.map((course) => {
                return (
                  <Col key={course.id} span={12}>
                    <Course course={course} />
                  </Col>
                );
              })}
            </Row>

            <Pagination
              current={current_page}
              total={total}
              pageSize={per_page}
              // onChange={(page) => console.log(page)}
            />
          </div>
        </div>
      </div>

      <div className="instructor-profile--right-column">
        <div className="img">
          <img
            src={linkThumbnail(author.avatar)}
            alt={author.fullname}
            className="avatar"
          />
        </div>

        <SocialBox social={author} />
      </div>
    </StyledInstructorBioContainer>
  ) : (
    <StyledUserProfile className="user-profile">
      <div className="header-bar">
        <h1>{author.fullname}</h1>
      </div>
      <div className="user-profile-content d-flex">
        <div className="user-profile__left">
          <img
            src={linkThumbnail(author.avatar)}
            alt={author.fullname}
            className="circle-img avatar mb-1"
          />
          <h2>{author?.headline}</h2>
          <ul className="social-box d-flex align-items-center justify-content-center ">
            <SocialBox social={author} />
          </ul>
        </div>
        {author.bio && (
          <div className="user-profile__right">
            <div
              className="biography"
              dangerouslySetInnerHTML={{ __html: author.bio }}
            />
          </div>
        )}
      </div>
    </StyledUserProfile>
  );
};

export default InstructorBioPage;
