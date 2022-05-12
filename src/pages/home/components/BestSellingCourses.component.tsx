import { FC, useEffect, useState } from "react";
import Slider from "react-slick";
import CourseApi from "../../../api/course.api";
import Course, {
  ArrayCustomCourses,
} from "../../../components/Course/Course.component";
import SkeletonCourses from "../../../components/Skeleton/Skeleton.component";
import { settings } from "../../../utils/slick.utils";

const BestSellingCourses: FC = () => {
  const [courses, setCourses] = useState<ArrayCustomCourses>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    CourseApi.bestSellingCourses().then((res) => {
      setCourses(res.data.courses);
      setLoaded(true);
    });
  }, []);

  return (
    <div className="list-courses">
      <h2 className="fw-bold">Bán chạy nhất</h2>

      <div className="data">
        {!loaded ? (
          <SkeletonCourses flex={1} amount={5} />
        ) : (
          <Slider {...settings}>
            {courses.map((course) => (
              <Course key={course.id} course={course} />
            ))}
          </Slider>
        )}
      </div>
    </div>
  );
};

export default BestSellingCourses;
