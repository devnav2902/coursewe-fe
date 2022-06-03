import { Spin } from "antd";
import axios from "axios";
import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import FreeEnrollApi, { Enroll } from "../../api/free-enroll.api";
import { useTypedSelector } from "../../hooks/redux.hooks";
import { ROUTES } from "../../utils/constants";
import { openNotification } from "../../utils/functions";

type EnrollButtonProps = {
  className?: string;
  coupons?: string[];
  course_id: number[];
  course_slug?: string;
};

// USE FOR FREE COURSE
const EnrollButton: FC<EnrollButtonProps> = ({
  className,
  coupons,
  course_id,
  course_slug,
}) => {
  const { profile, loaded } = useTypedSelector((state) => state.user);

  const navigate = useNavigate();

  const [enrollLoading, setEnrollLoading] = useState(false);

  function enroll() {
    if (!profile) return navigate(ROUTES.SIGN_IN);

    const data: Enroll = {
      course_id,
    };

    if (coupons?.length) {
      data.code = coupons;
    }

    FreeEnrollApi.enroll(data)
      .then(() => {
        openNotification("success", "Đăng kí tham gia khóa học thành công!");
        setEnrollLoading(false);

        setTimeout(() => {
          if (course_slug)
            window.location.href = ROUTES.learning({ course_slug });
          window.location.href = ROUTES.MY_LEARNING;
        }, 2000);
      })
      .catch((error) => {
        setEnrollLoading(false);

        if (axios.isAxiosError(error)) {
          openNotification(
            "error",
            error.response?.data?.message ??
              "Đăng kí tham gia khóa học không thành công!"
          );
        } else {
          openNotification(
            "error",
            "Lỗi trong quá trình đăng kí tham giá khóa học!"
          );
        }
      });
  }

  return (
    <button
      onClick={enroll}
      className={`btn-primary ${className ? className : ""}`}
    >
      {!enrollLoading || !loaded ? (
        "Ghi danh khóa học"
      ) : (
        <div className="align-items-center d-flex justify-content-center">
          <Spin />
        </div>
      )}
    </button>
  );
};

export default EnrollButton;
