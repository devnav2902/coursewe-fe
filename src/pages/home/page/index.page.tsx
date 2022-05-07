import { FC } from "react";
import BestSellingCourses from "../components/BestSellingCourses.component";
import LatestCourses from "../components/LatestCourses.component";
import TopCategories from "../components/TopCategories.component";

const Home: FC = () => {
  return (
    <div className="main-home">
      <div className="main-home__content">
        <div className="banner-content">
          <img
            width="1340"
            height="400"
            src="https://static.skillshare.com/cdn-cgi/image/quality=85,format=auto/assets/images/browse/browse-banner-1.webp"
            alt=""
          />
          <div className="content-box">
            <h1 className="short-title">Khóa học tại Devco</h1>
            <p className="subtitle">
              Tất cả kiến thức tại Devco đều được review bởi đội ngũ chuyên gia
              có kinh nghiệm. Hãy chọn instructor mà bạn tin tưởng & bắt đầu
              trải nghiệm.
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
            <h3 className="header">Become an instructor</h3>
            <p className="content">
              Trở thành giảng viên tại Devco, chia sẻ kiến thức & nhận lại không
              giới hạn giá trị.
            </p>
            <div className="link">
              <a
                href="{{ route('instructor-courses') }}"
                className="btn-style-two"
              >
                Bắt đầu ngay
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
