import { FC, memo, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Slider from "react-slick";
import Rating from "../../../components/Rating/Rating.component";
import { useAppDispatch, useTypedSelector } from "../../../hooks/redux.hooks";
import { getPopularInstructors } from "../../../redux/slices/categories.slice";
import { routesWithParams } from "../../../utils/constants";
import { linkThumbnail } from "../../../utils/functions";
import { settings } from "../../../utils/slick.utils";
import { StyledInstructor } from "../styles/categories.styles";
import { getCategorySlug } from "../utils/functions";

const PopularInstructors: FC = () => {
  const { slug, sub, topic } = useParams();

  const { data: popularInstructors } = useTypedSelector(
    ({ categories }) => categories.popularInstructors
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    const params = { slug, sub, topic };
    const slugCategory = getCategorySlug(params);

    if (slugCategory) dispatch(getPopularInstructors(slugCategory));
  }, [slug, sub, topic, dispatch]);

  return (
    <div>
      {popularInstructors.length <= 4 ? null : (
        <StyledInstructor>
          <h2 className="title">Giảng viên tiêu biểu</h2>
          <div className="container_wrap">
            <div className="author-box">
              <Slider {...settings}>
                {popularInstructors.map((author) => {
                  const {
                    id,
                    slug,
                    avatar,
                    numberOfCourses,
                    roundedAvgCourses,
                    fullname,
                    totalStudents,
                  } = author;
                  return (
                    <Link
                      key={id}
                      className="inner-box"
                      to={routesWithParams.instructor_bio(slug)}
                    >
                      <div className="image">
                        <img src={linkThumbnail(avatar)} alt="" />
                      </div>
                      <div className="name">{fullname}</div>

                      <div className="author-box__footer">
                        <div className="num_students d-flex align-items-center">
                          <span className="mr-1">Học viên đánh giá:</span>
                          <span className="num d-flex align-items-center fw-bold">
                            {roundedAvgCourses.toFixed(1)}&nbsp;
                            <Rating count={1} value={1} />
                          </span>
                        </div>
                      </div>
                      <div className="author-box__footer">
                        <div className="num_students">
                          <span className="num fw-bold">
                            {totalStudents} học viên
                          </span>
                        </div>
                        <div className="num_courses">
                          <span className="num fw-bold">
                            {numberOfCourses} khóa học
                          </span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </Slider>
            </div>
          </div>
        </StyledInstructor>
      )}
    </div>
  );
};

export default memo(PopularInstructors);
