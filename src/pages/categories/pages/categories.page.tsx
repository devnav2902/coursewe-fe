import { LoadingOutlined } from "@ant-design/icons";
import { MdFilterList } from "react-icons/md";
import { Empty, Pagination, Row, Spin } from "antd";
import { memo, useEffect, useMemo, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useAppDispatch, useTypedSelector } from "../../../hooks/redux.hooks";
import {
  getCourses,
  getDiscoveryUnits,
  resetState,
} from "../../../redux/slices/categories.slice";
import BreadcrumbItem from "../components/Breadcrumb.component";
import CategoryTitle from "../components/CategoryTitle.component";
import CourseCardLarge from "../components/CourseCardLarge.component";
import CoursesBeginner from "../components/CoursesBeginner.component";
import FilterItemLevels from "../components/FilterItemLevels.component";
import FilterItemPrice from "../components/FilterItemPrice.component";
import FilterItemRating from "../components/FilterItemRating.component";
import FilterItemTopics from "../components/FilterItemTopics.component";
import LoadingOverlay from "../components/LoadingOverlay.component";
import PopularInstructors from "../components/PopularInstructors.component";
import {
  getCategorySlug,
  isNumberStringWithCommas,
  isStringWithCommas,
} from "../utils/functions";
import { StyledFilter } from "../styles/categories.styles";

const CategoriesPage = () => {
  const { slug, sub, topic } = useParams();
  const {
    courses: { loaded: loadedCourses, data: coursesData },
    discoveryUnits: { loaded: loadedDiscoveryUnits, data: discoveryUnitsData },
  } = useTypedSelector(({ categories }) => categories);
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  // console.log(Object.fromEntries([...searchParams]));

  // STATE
  const [currentPage, setCurrentPage] = useState(1);
  const [filterLoading, setFilterLoading] = useState(false); // Sử dụng khi click filter

  // EFFECT
  useEffect(() => {
    const params = { slug, sub, topic };
    const slugCategory = getCategorySlug(params);
    const search = Object.fromEntries([...searchParams]);

    if (slugCategory) {
      dispatch(
        getCourses({
          slug: slugCategory,
          params: {
            ...search,
            page: currentPage,
          },
        })
      );

      dispatch(getDiscoveryUnits({ slug: slugCategory, params: search }));
    }
  }, [slug, sub, topic, searchParams, currentPage, dispatch]);

  // Xử lí khi click filter
  useEffect(() => {
    if (coursesData?.data && discoveryUnitsData) {
      if (!loadedCourses && !loadedDiscoveryUnits) setFilterLoading(true);
      else if (loadedCourses && loadedDiscoveryUnits) {
        setFilterLoading(false);
      }
    }

    return () => {
      dispatch(resetState());
    };
  }, [
    loadedCourses,
    loadedDiscoveryUnits,
    coursesData?.data,
    discoveryUnitsData,
    dispatch,
  ]);

  function onChangePage(page: number) {
    setCurrentPage(page);
  }

  const filterCount = (() => {
    let count = 0;
    for (const [key, value] of searchParams.entries()) {
      console.log(key, isNumberStringWithCommas(value));
      if ((key === "chu-de" || "trinh-do") && isNumberStringWithCommas(value))
        count++;
      else if (key === "danh-gia" && parseInt(value)) count++;
      else if (key === "gia-ban" && isStringWithCommas(value)) count++;
    }

    return count;
  })();

  function clearFilters() {
    for (const [key] of [...searchParams.entries()]) {
      searchParams.delete(key);
    }

    setSearchParams(searchParams);
  }

  return (
    <div className="main-categories">
      <div className="main-categories__header">
        <BreadcrumbItem />
        <CategoryTitle />
        <CoursesBeginner />
        <PopularInstructors />
        {/* <FeaturedCourses /> */}
      </div>

      {/* first loading */}
      {!coursesData?.data && !discoveryUnitsData && !filterLoading ? (
        <div className="pd-2 d-flex justify-content-center">
          <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} />} />
        </div>
      ) : (
        <div className="main-categories__content">
          <StyledFilter
            className={`categories-filter__header d-flex align-items-center${
              filterLoading ? " loading-pulse" : ""
            }`}
          >
            <div className="count">
              <MdFilterList />
              {filterCount > 0 ? ` Đã chọn (${filterCount})` : " Bộ lọc"}
            </div>

            {filterCount > 0 && (
              <div className="ml-1 clear-filters" onClick={clearFilters}>
                Xóa bộ lọc
              </div>
            )}
            <div className="ml-auto results">{coursesData?.total} khóa học</div>
          </StyledFilter>
          <div className="main-categories__main">
            <div
              className={`categories-box${
                filterLoading ? " loading-pulse" : ""
              }`}
            >
              <div className="categories-filter">
                <FilterItemRating />
                <FilterItemTopics />
                <FilterItemLevels />
                <FilterItemPrice />
              </div>
            </div>

            <div className="category-page-container">
              {filterLoading && <LoadingOverlay />}
              <div
                className={`d-flex flex-column inner${
                  filterLoading ? " loading-pulse" : ""
                }`}
              >
                {!coursesData?.total ? (
                  <Row justify="center">
                    <Empty description="Hiện chưa có khóa học nào!" />
                  </Row>
                ) : (
                  <div className="courses">
                    {coursesData?.data.map((course) => (
                      <CourseCardLarge key={course.id} course={course} />
                    ))}
                  </div>
                )}

                {coursesData && coursesData.total > 0 && (
                  <Pagination
                    className="mt-auto ml-auto"
                    pageSize={coursesData.per_page}
                    current={currentPage}
                    onChange={onChangePage}
                    total={coursesData.total}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default memo(CategoriesPage);
