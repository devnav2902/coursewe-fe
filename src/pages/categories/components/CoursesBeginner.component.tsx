import { FC, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Slider from "react-slick";
import Rating from "../../../components/Rating/Rating.component";
import Skeleton from "../../../components/Skeleton/Skeleton.component";
import { useAppDispatch, useTypedSelector } from "../../../hooks/redux.hooks";
import { getCoursesBeginner } from "../../../redux/slices/categories.slice";
import { routesWithParams } from "../../../utils/constants";
import { linkThumbnail, roundsTheNumber } from "../../../utils/functions";
import { settings } from "../../../utils/slick.utils";
import { StyledCourses } from "../styles/categories.styles";
import { getCategorySlug } from "../utils/functions";

const CoursesBeginner: FC = () => {
  const { slug, sub, topic } = useParams();

  const dispatch = useAppDispatch();

  const { data: coursesBeginnerData, loaded } = useTypedSelector(
    (state) => state.categories.coursesBeginner
  );

  useEffect(() => {
    const params = { slug, sub, topic };
    const slugCategory = getCategorySlug(params);

    slugCategory && dispatch(getCoursesBeginner(slugCategory));
  }, [slug, sub, topic, dispatch]);

  return loaded && !coursesBeginnerData?.total ? null : !loaded ? (
    <Skeleton amount={1} />
  ) : (
    <StyledCourses>
      <>
        <h2>Khóa học cho người mới bắt đầu</h2>
        <Slider {...settings} slidesToShow={1} slidesToScroll={1} fade>
          {coursesBeginnerData?.data.map((course) => {
            const {
              id,
              author,
              lecture_count,
              price,
              thumbnail,
              title,
              subtitle,
              instructional_level,
              rating_count,
              rating_avg_rating,
              slug,
            } = course;

            return (
              <Link key={id} to={routesWithParams.detail_course(slug)}>
                <div className="course-carousel">
                  <div className="image-wrapper">
                    <img src={linkThumbnail(thumbnail)} alt="" />
                  </div>
                  <div className="main-content">
                    <div className="title">{title}</div>
                    <p>{subtitle}</p>
                    <div className="info-row">
                      <span>Giảng viên: {author.fullname}</span>
                    </div>
                    <div className="info-row">
                      <span>{lecture_count} bài giảng</span>
                      <span>{instructional_level.level}</span>
                    </div>
                    <div className="info-row d-flex align-items-center">
                      <span className="mr-1 rating-avg">
                        {roundsTheNumber(rating_avg_rating, 1)}
                      </span>
                      <Rating value={4.7} />
                      <span className="ml-1 rating-count">
                        ({rating_count})
                      </span>
                    </div>
                    <div className="info-row price">
                      <span>{price.format_price} đ</span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </Slider>
      </>
    </StyledCourses>
  );
};

export default CoursesBeginner;
