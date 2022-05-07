import { Empty, Pagination, Row } from "antd";
import { memo, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CategoriesApi from "../../../api/categories.api";
import SkeletonCourses from "../../../components/SkeletonCourses/SkeletonCourses.component";
import CourseCardLarge from "../components/CourseCardLarge.component";
import FilterItemLevels from "../components/FilterItemLevels.component";
import FilterItemPrice from "../components/FilterItemPrice.component";
import FilterItemRating from "../components/FilterItemRating.component";
import FilterItemTopics from "../components/FilterItemTopics.component";
import PopularInstructors from "../components/PopularInstructors.component";
import { getCategorySlug } from "../utils/functions";

const CategoriesPage = () => {
  const { slug, sub, topic } = useParams();

  // STATE
  const [dataCategory, setDataCategory] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [displaySkeletonCourses, setDisplaySkeletonCourses] = useState(true);

  // console.log("categories page render");
  // EFFECT
  useEffect(() => {
    const params = { slug, sub, topic };
    setDisplaySkeletonCourses(true);
    const slugCategory = getCategorySlug(params);

    CategoriesApi.getCoursesByCategorySlug(slugCategory).then((res) => {
      setDataCategory(res.data.courses);
      setDisplaySkeletonCourses(false);
      setCurrentPage(1);
    });
  }, [slug, sub, topic]);

  function onChangePage(page) {
    setDisplaySkeletonCourses(true);
    setCurrentPage(page);
    fetch(`${dataCategory.path}?page=${page}`)
      .then((res) => res.json())
      .then((data) => {
        setDisplaySkeletonCourses(false);
        setDataCategory(data.courses);
      });
  }

  return (
    <div className="main-categories">
      <div className="main-categories__header">
        <PopularInstructors />
        <div className="sec-title">
          <h1>Khóa học: {dataCategory?.title}</h1>
        </div>

        {/* <CoursesBeginner /> */}
        {/* <FeaturedCourses /> */}
      </div>
      <div className="main-categories__content">
        <div className="categories-box">
          <div className="categories-filter">
            <FilterItemRating />
            <FilterItemTopics />
            <FilterItemLevels />
            <FilterItemPrice />
          </div>
        </div>

        <div className="category-page-container">
          {displaySkeletonCourses ? (
            <SkeletonCourses amount={8} />
          ) : !dataCategory.total ? (
            <Row justify="center">
              <Empty description="Hiện chưa có khóa học nào!" />
            </Row>
          ) : (
            <div className="all-courses">
              {dataCategory.data.map((course) => (
                <CourseCardLarge key={course.id} course={course} />
              ))}
            </div>
          )}

          {!dataCategory?.total ? null : (
            <Pagination
              className="mt-auto ml-auto"
              pageSize={dataCategory.per_page}
              current={currentPage}
              onChange={onChangePage}
              total={dataCategory.total}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default memo(CategoriesPage);
