import { Skeleton } from "antd";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import Course from "../../../components/Course/Course.component";
import styled from "styled-components";
import { Tabs } from "antd";
import CategoriesApi from "../../../api/categories.api";
import FeaturedCourseTab from "./FeaturedCourseTab.component";
import { settings } from "../utils/slick.utils";
import { SkeletonCourses } from "../utils/component.utils";

const StyledTabs = styled.div`
  .ant-tabs {
    overflow: visible;
  }
`;

const { TabPane } = Tabs;

const TopCategories = () => {
  const [featuredCategories, setFeaturedCategories] = useState([]);
  const [loadedFeaturedCategories, setLoadedFeaturedCategories] =
    useState(false);
  const [featuredCourses, setFeaturedCourses] = useState([]); // all
  const [loadedFeaturedCourses, setLoadedFeaturedCourses] = useState(false); // all

  useEffect(() => {
    CategoriesApi.featuredCategories(5).then((res) => {
      setFeaturedCategories(res.data.topLevelCategories);
      setLoadedFeaturedCategories(true);
    });

    CategoriesApi.featuredCourses(10).then((res) => {
      setFeaturedCourses(res.data.courses);
      setLoadedFeaturedCourses(true);
    });
  }, []);

  // const arrCourses = [
  //   {
  //     title: "Microsoft SQL from A to Z",
  //     slug: "Microsoft SQL from A to Z",
  //     thumbnail: "https://img-c.udemycdn.com/course/240x135/1439004_c492_3.jpg",
  //     rating_avg_rating: "4.0",
  //     rating_count: 123,
  //   },
  //   {
  //     title: "Microsoft SQL from A to Z",
  //     slug: "Microsoft SQL from A to Z",
  //     thumbnail: "https://img-c.udemycdn.com/course/240x135/1439004_c492_3.jpg",
  //     rating_avg_rating: "4.0",
  //     rating_count: 123,
  //   },
  //   {
  //     title: "Microsoft SQL from A to Z",
  //     slug: "Microsoft SQL from A to Z",
  //     thumbnail: "https://img-c.udemycdn.com/course/240x135/1439004_c492_3.jpg",
  //     rating_avg_rating: "4.0",
  //     rating_count: 123,
  //   },
  //   {
  //     title: "Microsoft SQL from A to Z",
  //     slug: "Microsoft SQL from A to Z",
  //     thumbnail: "https://img-c.udemycdn.com/course/240x135/1439004_c492_3.jpg",
  //     rating_avg_rating: "4.0",
  //     rating_count: 123,
  //   },
  //   {
  //     title: "Microsoft SQL from A to Z",
  //     slug: "Microsoft SQL from A to Z",
  //     thumbnail: "https://img-c.udemycdn.com/course/240x135/1439004_c492_3.jpg",
  //     rating_avg_rating: "4.0",
  //     rating_count: 123,
  //   },
  //   {
  //     title: "Microsoft SQL from A to Z",
  //     slug: "Microsoft SQL from A to Z",
  //     thumbnail: "https://img-c.udemycdn.com/course/240x135/1439004_c492_3.jpg",
  //     rating_avg_rating: "4.0",
  //     rating_count: 123,
  //   },
  //   {
  //     title: "Microsoft SQL from A to Z",
  //     slug: "Microsoft SQL from A to Z",
  //     thumbnail: "https://img-c.udemycdn.com/course/240x135/1439004_c492_3.jpg",
  //     rating_avg_rating: "4.0",
  //     rating_count: 123,
  //   },
  // ];

  function onChangeTab(key) {}

  return (
    <div className="list-courses mb-3">
      <h2 className="fw-bold">Khóa học nổi bật</h2>

      {!loadedFeaturedCategories ? (
        <Skeleton active />
      ) : (
        <StyledTabs>
          <Tabs defaultActiveKey="all" onChange={onChangeTab}>
            <TabPane tab="Tất cả" key="all">
              {!loadedFeaturedCourses ? (
                <SkeletonCourses />
              ) : (
                <Slider {...settings}>
                  {featuredCourses.map((course) => (
                    <Course key={course.id} course={course} />
                  ))}
                </Slider>
              )}
            </TabPane>
            {featuredCategories.map((category) => (
              <TabPane tab={category.name} key={category.top_level_id}>
                <FeaturedCourseTab categoryId={category.top_level_id} />
              </TabPane>
            ))}
          </Tabs>
        </StyledTabs>
      )}
    </div>
  );
};

export default TopCategories;
