import { memo, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ProgressLogsApi, {
  LastWatchedResponse,
} from "../../../api/progress-logs.api";
import { useTypedSelector } from "../../../hooks/redux.hooks";
import { ROUTES } from "../../../utils/constants";

import { StyledButtonBox } from "../../detail-course/styles/detail-course.styles";

const ButtonContainer = () => {
  const [dataCourse, setDataCourse] =
    useState<
      Omit<
        LastWatchedResponse,
        "course_id" | "user_id" | "created_at" | "updated_at"
      >
    >();

  const { id } = useParams() as { id: string };

  useEffect(() => {
    ProgressLogsApi.getDataLastWatched(id).then((res) => {
      setDataCourse(res.data);
    });
  }, [id]);

  return (
    <StyledButtonBox className="buttons-box">
      <Link
        to={ROUTES.check_video({
          course_slug: dataCourse?.dataLastWatched.course.slug,
          lectureId: dataCourse?.dataLastWatched.lecture_id,
        })}
        className="theme-btn btn-style-one"
      >
        Xem ngay
      </Link>
    </StyledButtonBox>
  );
};

export default memo(ButtonContainer);
