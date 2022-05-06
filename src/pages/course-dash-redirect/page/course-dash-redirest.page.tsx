import { Skeleton } from "antd";
import { FC, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import CourseApi from "../../../api/course.api";
import ProgressLogsApi from "../../../api/progress-logs.api";
import { ROUTES, routesWithParams } from "../../../utils/constants";

const CourseDashRedirestPage: FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const id = searchParams.get("course_id") as string;

  useEffect(() => {
    ProgressLogsApi.getDataLastWatched(id).then(
      ({ data: { dataLastWatched } }) => {
        if (!dataLastWatched) {
          navigate(ROUTES.NOT_FOUND);
        } else {
          const {
            course: { slug },
            lecture_id,
            last_watched_second,
          } = dataLastWatched;
          navigate(
            routesWithParams.learning(slug, lecture_id) +
              "?start=" +
              last_watched_second
          );
        }
      }
    );
  }, [id]);

  return null;
};

export default CourseDashRedirestPage;
