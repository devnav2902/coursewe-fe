import { Radio, Row, Checkbox, Collapse, Pagination, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Rating from "../../../components/Rating/Rating.component";
import { routesWithParams } from "../../../utils/constants";

import { Select } from "antd";
import CourseCardLarge from "../components/CourseCardLarge.component";
import CoursesBeginner from "../components/CoursesBeginner.component";
import FeaturedCourses from "../components/FeaturedCourses.component";
import PopularInstructors from "../components/PopularInstructors.component";
import CategoriesApi from "../../../api/categories.api";
import Loading from "../../../components/Loading/Loading.component";
import { Skeleton } from "antd";

const { Panel } = Collapse;
const { Option } = Select;

const CategoriesPage = () => {
  const params = useParams();

  // STATE
  const [dataCategory, setDataCategory] = useState(null);
  const [dataAmountCoursesByTypesPrice, setDataAmountCoursesByTypesPrice] =
    useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [displaySkeletonCourses, setDisplaySkeletonCourses] = useState(true);
  const [
    getValueAmountCoursesByTypesPrice,
    setgetValueAmountCoursesByTypesPrice,
  ] = useState(null);
  // console.log(dataCategory);
  // EFFECT
  useEffect(() => {
    const keys = Object.keys(params);

    const categorySlug = params[keys.at(-1)];

    CategoriesApi.getCoursesByCategorySlug(categorySlug).then((res) => {
      setDataCategory(res.data.courses);
      setDisplaySkeletonCourses(false);
    });
    CategoriesApi.getAmountCoursesByTypesPrice(categorySlug).then((res) => {
      console.log(res.data);
      setDataAmountCoursesByTypesPrice(res.data.amountCoursesByTypesPrice);
    });
  }, [params]);
  // console.log(params);
  if (!dataAmountCoursesByTypesPrice) return null;
  const { free, paid } = dataAmountCoursesByTypesPrice;
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
  // console.log(dataCategory);
  function onChange(checkedValues) {
    console.log("checked = ", checkedValues);
    setgetValueAmountCoursesByTypesPrice(checkedValues);
  }
  const options = [
    { label: "Miễn phí" + " (" + free.amount + ")", value: 0 },
    { label: "Trả phí" + " (" + paid.amount + ")", value: "Paid" },
  ];
  console.log(options);

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
            <div className="filter-item">
              <div className="filter-item__content">
                <Collapse
                  defaultActiveKey={["1"]}
                  expandIconPosition="right"
                  bordered={false}
                >
                  <Panel header={<b>Đánh giá</b>} key="1">
                    <Radio value={1}>
                      <Rating value={4.5} size={"13px"} />
                      4.5 trở lên
                      <span className="amount">(446)</span>
                    </Radio>
                    <Radio value={1}>
                      <Rating value={4} size={"13px"} />
                      4.0 trở lên
                      <span className="amount">(446)</span>
                    </Radio>
                    <Radio value={1}>
                      <Rating value={3.5} size={"13px"} />
                      3.5 trở lên
                      <span className="amount">(446)</span>
                    </Radio>
                    <Radio value={1}>
                      <Rating value={3} size={"13px"} />
                      3.0 trở lên
                      <span className="amount">(446)</span>
                    </Radio>
                  </Panel>
                </Collapse>
              </div>
            </div>
            <div className="filter-item">
              <div className="filter-item__content">
                <Collapse
                  defaultActiveKey={["1"]}
                  expandIconPosition="right"
                  bordered={false}
                >
                  <Panel header={<b>Chủ đề</b>} key="1">
                    <Checkbox>
                      Javascript <span className="amount">(223)</span>
                    </Checkbox>
                    <Checkbox>
                      HTML/CSS <span className="amount">(23)</span>
                    </Checkbox>
                    <Checkbox>
                      REACTJS <span className="amount">(14)</span>
                    </Checkbox>
                    <Checkbox>
                      LARAVEL <span className="amount">(22)</span>
                    </Checkbox>
                  </Panel>
                </Collapse>
              </div>
            </div>
            <div className="filter-item">
              <div className="filter-item__content">
                <Collapse
                  defaultActiveKey={["1"]}
                  expandIconPosition="right"
                  bordered={false}
                >
                  <Panel header={<b>Danh mục</b>} key="1">
                    <Checkbox>
                      Lập trình web <span className="amount">(223)</span>
                    </Checkbox>
                    <Checkbox>
                      Data science <span className="amount">(23)</span>
                    </Checkbox>
                    <Checkbox>
                      Game development <span className="amount">(14)</span>
                    </Checkbox>
                    <Checkbox>
                      Software engineering <span className="amount">(22)</span>
                    </Checkbox>
                  </Panel>
                </Collapse>
              </div>
            </div>
            <div className="filter-item">
              <div className="filter-item__content">
                <Collapse
                  defaultActiveKey={["1"]}
                  expandIconPosition="right"
                  bordered={false}
                >
                  <Panel header={<b>Cấp độ</b>} key="1">
                    <Checkbox>
                      Tất cả cấp độ <span className="amount">(223)</span>
                    </Checkbox>
                    <Checkbox>
                      Beginner <span className="amount">(23)</span>
                    </Checkbox>
                    <Checkbox>
                      Intermediate <span className="amount">(14)</span>
                    </Checkbox>
                    <Checkbox>
                      Expert <span className="amount">(22)</span>
                    </Checkbox>
                  </Panel>
                </Collapse>
              </div>
            </div>
            <div className="filter-item">
              <div className="filter-item__content">
                <Collapse
                  defaultActiveKey={["1"]}
                  expandIconPosition="right"
                  bordered={false}
                >
                  <Panel header={<b>Giá bán</b>} key="1">
                    <Checkbox.Group
                      options={options}
                      defaultValue={["Apple"]}
                      onChange={onChange}
                    />

                    {/* <Checkbox>
                      Trả phí <span className="amount">{free}</span>
                    </Checkbox>
                    <Checkbox>
                      Miễn phí <span className="amount">{paid}</span>
                    </Checkbox> */}
                  </Panel>
                </Collapse>
              </div>
            </div>
          </div>
        </div>

        <div className="category-page-container">
          <div className="all-courses">
            {displaySkeletonCourses ? (
              <SkeletonCourses />
            ) : (
              dataCategory.data.map((course) => (
                <CourseCardLarge key={course.id} course={course} />
              ))
            )}
          </div>

          {dataCategory && (
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

export default CategoriesPage;
