import { useEffect, useState } from "react";
import Slider from "react-slick";
import CourseApi from "../../../api/course.api";
import Course from "../../../components/Course/Course.component";
import { SkeletonCourses } from "../../../components/SkeletonCourses/SkeletonCourses.component";
import { settings } from "../utils/slick.utils";

const LatestCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    CourseApi.getLatestCourses().then((res) => {
      setCourses(res.data.latestCourses);
      setLoaded(true);
    });
  }, []);

  return (
    <div className="list-courses mb-3">
      <h2 className="fw-bold">Mới ra mắt</h2>

      <div className="data">
        {!loaded ? (
          <SkeletonCourses amount={5} />
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

export default LatestCourses;
