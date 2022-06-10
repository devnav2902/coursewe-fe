import { FC, useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Footer from "../components/Footer/Footer.component";
import { CheckVideoContext } from "../pages/check-video/hooks/leaning.hooks";
import { ROUTES } from "../utils/constants";

const ReviewCourseLayout: FC = ({ children }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
};

const StyledHeader = styled.div`
  height: 56px;
  color: #fff;
  padding: 0 20px;
  background-color: #1c1d1f;
  border-bottom: 1px solid #726f6f;
  .header-container {
    height: 100%;
  }
  .logo {
    a {
      color: #fff;
      font-weight: 700;
      font-size: 28px;
    }
  }
  h1 {
    font-size: 16px;
    margin-bottom: 0;
    a {
      color: #fff;
      &:hover {
        color: #c9bebe;
      }
    }
  }
  .vertical-divider {
    margin: 0 20px;
    height: 40%;
    border-left: 1px solid #3e4143;
  }
  .progress {
    margin-left: auto;

    .progress-dropdown {
      color: #fff;
    }

    &__wrapper {
      cursor: pointer;
      &:hover {
        color: #d8d8d8;
        button {
          color: #d8d8d8;
        }
      }
    }
  }
`;

const Header = () => {
  const {
    dataCourse: { data: course, loaded },
  } = useContext(CheckVideoContext);

  return (
    <StyledHeader>
      <div className="header-container d-flex align-items-center">
        <div className="logo">
          <Link to="/">Coursewe</Link>
        </div>
        <div className="vertical-divider"></div>

        <h1 className="course-title">
          <Link to={!course?.slug ? "" : ROUTES.detail_course(course.slug)}>
            {course?.title}
          </Link>
        </h1>
      </div>
    </StyledHeader>
  );
};
export default ReviewCourseLayout;
