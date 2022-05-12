import { FC, useEffect, useState } from "react";
import Slider from "react-slick";
import CategoriesApi from "../../../api/categories.api";
import Course, {
  ArrayCustomCourses,
} from "../../../components/Course/Course.component";
import SkeletonCourses from "../../../components/Skeleton/Skeleton.component";
import { settings } from "../../../utils/slick.utils";

type FeaturedCourseTabProps = {
  categoryId: number;
};

const FeaturedCourseTab: FC<FeaturedCourseTabProps> = ({ categoryId }) => {
  const [featuredCourses, setFeaturedCourses] = useState<ArrayCustomCourses>(
    []
  );
  const [loadedFeaturedCourses, setLoadedFeaturedCourses] = useState(false);

  useEffect(() => {
    console.log("rendered");
    CategoriesApi.featuredCoursesByCategoryId(categoryId).then((res) => {
      setFeaturedCourses(res.data.courses);
      setLoadedFeaturedCourses(true);
    });
  }, [categoryId]);

  return !loadedFeaturedCourses ? (
    <SkeletonCourses flex={1} amount={5} />
  ) : (
    <Slider {...settings}>
      {featuredCourses.map((course) => (
        <Course key={course.id} course={course} />
      ))}
    </Slider>
  );
};

export default FeaturedCourseTab;
