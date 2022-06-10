import { FC } from "react";
import { ROUTES } from "../../../utils/constants";
import BestSellingCourses from "../components/BestSellingCourses.component";
import LatestCourses from "../components/LatestCourses.component";
import TopCategories from "../components/TopCategories.component";
import { StyledWrapper } from "../styles/home.styles";

const Home: FC = () => {
  return (
    <StyledWrapper className="main-home">
      <div className="main-home__content">
        <div className="banner-content">
          <img
            width="1340"
            height="400"
            src="https://static.skillshare.com/cdn-cgi/image/quality=85,format=auto/assets/images/browse/browse-banner-1.webp"
            alt=""
          />
          <div className="content-box">
            <h1 className="short-title">Khóa học tại Coursewe</h1>
            <p className="subtitle mb-0">
              Tất cả kiến thức tại Coursewe đều được review bởi đội ngũ chuyên
              gia có kinh nghiệm. <br /> Hãy chọn giảng viên mà bạn tin tưởng &
              bắt đầu trải nghiệm.
            </p>
          </div>
        </div>

        <div className="page-wrapper">
          <div className="page-wrapper__content">
            <TopCategories />
            <LatestCourses />
            <BestSellingCourses />
          </div>
        </div>
        <div className="content-wrapper d-flex align-items-center">
          <img
            src="https://s.udemycdn.com/home/non-student-cta/instructor-1x-v3.jpg"
            className="image"
            alt=""
            width="400"
            height="400"
          />
          <div className="">
            <h3 className="header">Trở thành giảng viên</h3>
            <p className="content">
              Trở thành giảng viên tại Coursewe, chia sẻ kiến thức & nhận lại
              không giới hạn giá trị.
            </p>
            <div className="link">
              <a href={ROUTES.INSTRUCTOR_COURSES} className="btn-primary btn">
                Bắt đầu ngay
              </a>
            </div>
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
};

export default Home;
