import { FC } from "react";
import BestSellingCourses from "../components/BestSellingCourses.component";
import LatestCourses from "../components/LatestCourses.component";
import TopCategories from "../components/TopCategories.component";

const Home: FC = () => {
  const arrCourses = [
    {
      title: "Microsoft SQL from A to Z",
      slug: "Microsoft SQL from A to Z",
      thumbnail: "https://img-c.udemycdn.com/course/240x135/1439004_c492_3.jpg",
      rating_avg_rating: "4.0",
      rating_count: 123,
    },
    {
      title: "Microsoft SQL from A to Z",
      slug: "Microsoft SQL from A to Z",
      thumbnail: "https://img-c.udemycdn.com/course/240x135/1439004_c492_3.jpg",
      rating_avg_rating: "4.0",
      rating_count: 123,
    },
    {
      title: "Microsoft SQL from A to Z",
      slug: "Microsoft SQL from A to Z",
      thumbnail: "https://img-c.udemycdn.com/course/240x135/1439004_c492_3.jpg",
      rating_avg_rating: "4.0",
      rating_count: 123,
    },
    {
      title: "Microsoft SQL from A to Z",
      slug: "Microsoft SQL from A to Z",
      thumbnail: "https://img-c.udemycdn.com/course/240x135/1439004_c492_3.jpg",
      rating_avg_rating: "4.0",
      rating_count: 123,
    },
    {
      title: "Microsoft SQL from A to Z",
      slug: "Microsoft SQL from A to Z",
      thumbnail: "https://img-c.udemycdn.com/course/240x135/1439004_c492_3.jpg",
      rating_avg_rating: "4.0",
      rating_count: 123,
    },
    {
      title: "Microsoft SQL from A to Z",
      slug: "Microsoft SQL from A to Z",
      thumbnail: "https://img-c.udemycdn.com/course/240x135/1439004_c492_3.jpg",
      rating_avg_rating: "4.0",
      rating_count: 123,
    },
    {
      title: "Microsoft SQL from A to Z",
      slug: "Microsoft SQL from A to Z",
      thumbnail: "https://img-c.udemycdn.com/course/240x135/1439004_c492_3.jpg",
      rating_avg_rating: "4.0",
      rating_count: 123,
    },
  ];

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

            {/* <div className="featured_course list-items">
              <h2 className="title">Khóa học nổi bật</h2>
              <div className="container_wrap">
                <div className="box-courses">
                  <div className="nav">
                    <i className="fas btn fa-chevron-left btnLeft"></i>
                    <i className="fas btn fa-chevron-right btnRight"></i>
                  </div>
                  <div className="list-courses"></div>
                </div>
              </div>
            </div>
            <div className="bestseller_course list-items">
              <h2 className="title">Khóa học bán chạy</h2>
              <div className="container_wrap">
                <div className="box-courses">
                  <div className="nav">
                    <i className="fas btn fa-chevron-left btnLeft"></i>
                    <i className="fas btn fa-chevron-right btnRight"></i>
                  </div>
                  <div className="list-courses"></div>
                </div>
              </div>
            </div>
            <div className="authors list-items">
              <h2 className="title">Giảng viên tiêu biểu</h2>
              <div className="container_wrap">
                <div className="nav">
                  <i className="fas btn fa-chevron-left btnLeft"></i>
                  <i className="fas btn fa-chevron-right btnRight"></i>
                </div>
                <div className="author-box">
                  @foreach ($instructors as $author)
                  <a
                    className="inner-box"
                    href="{{ route('instructor', ['slug' => $author->slug]) }}"
                  >
                    <div className="image">
                      <img src="{{ asset($author->avatar) }}" alt="" />
                    </div>
                    <div className="name">$authorfullname</div>

                    <div className="author-box__footer">
                      <div className="num_students">
                        <span className="num fw-bold">
                          $authorcount_students
                        </span>
                        $authorcount_students 1 ? 'students' : 'student'
                      </div>
                      <div className="num_courses">
                        <span className="num fw-bold">$authorcourse_count</span>
                        $authorcourse_count 1 ? 'courses' : 'course'
                      </div>
                    </div>
                  </a>
                  @endforeach
                </div>
              </div>
            </div> */}
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
    // <Row gutter={[15, 15]} classNameName="list-courses">
    //   {arrCourses.map((course, i) => {
    //     return (
    //       <Col span={6}>
    //         <Course course={course} />
    //       </Col>
    //     );
    //   })}
    // </Row>
  );
};

export default Home;
