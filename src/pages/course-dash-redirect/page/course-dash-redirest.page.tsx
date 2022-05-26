import { FC, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import ProgressLogsApi from "../../../api/progress-logs.api";
import { ROUTES } from "../../../utils/constants";

const CourseDashRedirestPage: FC = () => {
  const [searchParams] = useSearchParams();

  const navigate = useNavigate();
  const id = searchParams.get("course_id") as string;
  // window.history.back();
  useEffect(() => {
    ProgressLogsApi.getDataLastWatched(id).then(
      ({ data: { dataLastWatched } }) => {
        const {
          course: { slug },
          lecture_id,
          last_watched_second,
        } = dataLastWatched;

        navigate(
          ROUTES.learning(slug, lecture_id) + "?start=" + last_watched_second
        );
      }
    );
  }, [id, navigate]);

  return null;
};

export default CourseDashRedirestPage;
