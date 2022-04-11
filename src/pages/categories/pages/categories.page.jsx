import { Checkbox, Collapse, Pagination, Empty, Row } from "antd";
import { memo, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { routesWithParams } from "../../../utils/constants";

import { Select } from "antd";
import CourseCardLarge from "../components/CourseCardLarge.component";
import CoursesBeginner from "../components/CoursesBeginner.component";
import FeaturedCourses from "../components/FeaturedCourses.component";
import PopularInstructors from "../components/PopularInstructors.component";
import CategoriesApi from "../../../api/categories.api";
import { Skeleton } from "antd";
import FilterItemLevels from "../components/FilterItemLevels.component";
import { getCategorySlug } from "../utils/functions";
import FilterItemTopics from "../components/FilterItemTopics.component";
import FilterItemRating from "../components/FilterItemRating.component";

const { Panel } = Collapse;
const { Option } = Select;

const CategoriesPage = () => {
  const { slug, sub, topic } = useParams();

  // STATE
  const [dataCategory, setDataCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [displaySkeletonCourses, setDisplaySkeletonCourses] = useState(true);
  console.log("categories page render");
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

  const SkeletonCourses = function () {
    return Array.from({ length: 8 }).map((_, i) => <Skeleton key={i} active />);
  };

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
        <div className="sec-title">
          <h1>Khóa học: {dataCategory?.title}</h1>
        </div>

        {/* <CoursesBeginner />
        <FeaturedCourses />
        <PopularInstructors /> */}
      </div>
      <div className="main-categories__content">
        <div className="categories-box">
          <div className="categories-filter">
            <FilterItemRating />
            <FilterItemTopics />
            <FilterItemLevels />
            <div className="filter-item">
              <div className="filter-item__content">
                <Collapse
                  defaultActiveKey={["1"]}
                  expandIconPosition="right"
                  bordered={false}
                >
                  <Panel header={<b>Giá bán</b>} key="1">
                    <Checkbox>
                      Trả phí <span className="amount">(14)</span>
                    </Checkbox>
                    <Checkbox>
                      Miễn phí <span className="amount">(22)</span>
                    </Checkbox>
                  </Panel>
                </Collapse>
              </div>
            </div>
          </div>
        </div>

        <div className="category-page-container">
          {displaySkeletonCourses ? (
            <SkeletonCourses />
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
