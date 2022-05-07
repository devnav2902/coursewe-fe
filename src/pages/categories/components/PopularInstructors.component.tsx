import { memo, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Slider from "react-slick";
import CategoriesApi, {
  ArrayPopularInstructors,
} from "../../../api/categories.api";
import Rating from "../../../components/Rating/Rating.component";
import SkeletonInstructors from "../../../components/Skeleton/Skeleton.component";
import { routesWithParams } from "../../../utils/constants";
import { linkThumbnail } from "../../../utils/functions";
import { settings } from "../../../utils/slick.utils";
import { StyledInstructor } from "../styles/categories.styles";
import { getCategorySlug } from "../utils/functions";

const PopularInstructors = () => {
  const { slug, sub, topic } = useParams();

  const [dataPopularInstructors, setDataPopularInstructors] =
    useState<ArrayPopularInstructors>([]);
  const [loadedInstructors, setLoadedInstructors] = useState(false);

  useEffect(() => {
    const params = { slug, sub, topic };
    const slugCategory = getCategorySlug(params);

    if (slugCategory) {
      CategoriesApi.getPopularInstructors(slugCategory).then(({ data }) => {
        setDataPopularInstructors(data.popularInstructors);
        setLoadedInstructors(true);
      });
    }
  }, [slug, sub, topic]);

  return (
    <div>
      <StyledInstructor>
        <h2 className="title">Giảng viên tiêu biểu</h2>
        <div className="container_wrap">
          <div className="author-box">
            {!loadedInstructors ? (
              <SkeletonInstructors amount={5} flex={1} />
            ) : (
              <Slider {...settings}>
                {dataPopularInstructors.map((author) => {
                  const {
                    infoAuthor: { id, slug, avatar, fullname },
                    avgRating,
                    amountSudents,
                    totalCourses,
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
                        <div className="num_students">
                          <span className="num fw-bold">
                            {avgRating} <Rating count={1} value={1} />
                          </span>
                        </div>
                      </div>
                      <div className="author-box__footer">
                        <div className="num_students">
                          <span className="num fw-bold">
                            {amountSudents} học viên
                          </span>
                        </div>
                        <div className="num_courses">
                          <span className="num fw-bold">
                            {totalCourses} khóa học
                          </span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </Slider>
            )}
          </div>
        </div>
      </StyledInstructor>
    </div>
  );
};

export default memo(PopularInstructors);
