import { useEffect, useState } from "react";
import CategoriesApi from "../../../api/categories.api";
import Course from "../../../components/Course/Course.component";
import Slider from "react-slick";
import { settings } from "../utils/slick.utils";
import { SkeletonCourses } from "../utils/component.utils";

const FeaturedCourseTab = ({ categoryId }) => {
  const [featuredCourses, setFeaturedCourses] = useState([]);
  const [loadedFeaturedCourses, setLoadedFeaturedCourses] = useState(false);

  useEffect(() => {
    console.log("rendered");
    CategoriesApi.featuredCoursesByCategoryId(categoryId).then((res) => {
      setFeaturedCourses(res.data.courses);
      setLoadedFeaturedCourses(true);
    });
  }, [categoryId]);

  return !loadedFeaturedCourses ? (
    <SkeletonCourses />
  ) : (
    <Slider {...settings}>
      {featuredCourses.map((course) => (
        <Course key={course.id} course={course} />
      ))}
    </Slider>
  );
};

export default FeaturedCourseTab;
