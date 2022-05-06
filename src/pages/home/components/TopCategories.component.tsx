import { Tabs } from "antd";
import { FC, useEffect, useState } from "react";
import Slider from "react-slick";
import styled from "styled-components";
import CategoriesApi from "../../../api/categories.api";
import Course, {
  ArrayCustomCourses,
} from "../../../components/Course/Course.component";
import { SkeletonCourses } from "../../../components/SkeletonCourses/SkeletonCourses.component";
import { FeaturedCategories } from "../../../ts/types/categories.types";
import { settings } from "../utils/slick.utils";
import FeaturedCourseTab from "./FeaturedCourseTab.component";

const StyledTabs = styled.div`
  .ant-tabs {
    overflow: visible;
  }
`;

const { TabPane } = Tabs;

const TopCategories: FC = () => {
  const [featuredCategories, setFeaturedCategories] =
    useState<FeaturedCategories>([]);
  const [loadedFeaturedCategories, setLoadedFeaturedCategories] =
    useState(false);
  const [featuredCourses, setFeaturedCourses] = useState<ArrayCustomCourses>(
    []
  ); // all: ;
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

  function onChangeTab(key: string) {}

  return (
    <div className="list-courses mb-3">
      <h2 className="fw-bold">Khóa học nổi bật</h2>

      {!loadedFeaturedCategories ? (
        <SkeletonCourses amount={5} />
      ) : (
        <StyledTabs>
          <Tabs defaultActiveKey="all" onChange={onChangeTab}>
            <TabPane tab="Tất cả" key="all">
              {!loadedFeaturedCourses ? (
                <SkeletonCourses amount={5} />
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
