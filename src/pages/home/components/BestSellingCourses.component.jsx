import { useEffect, useState } from "react";
import Course from "../../../components/Course/Course.component";
import Slider from "react-slick";
import { settings } from "../utils/slick.utils";
import { Skeleton } from "antd";
import CourseApi from "../../../api/course.api";

const BestSellingCourses = () => {
  const [courses, setCourses] = useState([]);
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
          <Skeleton active />
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
