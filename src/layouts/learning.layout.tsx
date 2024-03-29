import { Dropdown, Menu, Progress, Spin } from "antd";
import { FC, useEffect } from "react";
import { FaAngleDown } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Footer from "../components/Footer/Footer.component";
import { useAppDispatch, useTypedSelector } from "../hooks/redux.hooks";
import {
  getCourse,
  getProgress,
  resetStateLearning,
} from "../redux/slices/learning.slice";
import { ROUTES } from "../utils/constants";

const LearningLayout: FC = ({ children }) => {
  const dispatch = useAppDispatch();
  const { course_slug } = useParams() as { course_slug: string };

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getCourse(course_slug))
      .unwrap()
      .catch(() => navigate(ROUTES.NOT_FOUND));

    return () => {
      dispatch(resetStateLearning());
    };
  }, [course_slug, dispatch, navigate]);

  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export const StyledHeader = styled.div`
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
    dataCourse: { course },
    myProgress,
  } = useTypedSelector((state) => state.learning);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (course) {
      const { id } = course;

      dispatch(getProgress(id));
    }
  }, [course, dispatch]);

  const menu = (
    <Menu>
      <Menu.Item key="1">
        Đã hoàn thành <b>{myProgress.complete}</b>/<b>{myProgress.total}</b> bài
        giảng
      </Menu.Item>
    </Menu>
  );

  const percentProgress = (myProgress.complete / myProgress.total) * 100;

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

        <div className="progress">
          <div className="progress__wrapper d-flex align-items-center">
            {!myProgress.loadedMyProgress ? (
              <Spin />
            ) : (
              <>
                <Progress
                  type="circle"
                  showInfo={false}
                  width={35}
                  trailColor="#494c4e"
                  strokeColor="#CEC0FC"
                  strokeWidth={7}
                  className="pd-r-2"
                  percent={percentProgress}
                />

                <Dropdown
                  className="progress-dropdown"
                  overlay={menu}
                  trigger={["click"]}
                  placement="bottomCenter"
                  // arrow={{ pointAtCenter: true }}
                >
                  <a
                    className="ant-dropdown-link d-flex align-items-center"
                    onClick={(e) => e.preventDefault()}
                  >
                    Quá trình học của bạn{" "}
                    <FaAngleDown className="ml-1" size="18px" />
                  </a>
                </Dropdown>
              </>
            )}
          </div>
        </div>
      </div>
    </StyledHeader>
  );
};
export default LearningLayout;
