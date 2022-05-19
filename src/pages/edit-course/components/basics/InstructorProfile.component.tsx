import ErrorBanner from "../../../../components/ErrorBanner/ErrorBanner.component";
import { Link } from "react-router-dom";
import { ROUTES } from "../../../../utils/constants";
import { useEffect, useState } from "react";
import ProfileApi, { MissingRequirements } from "../../../../api/profile.api";
import { Alert } from "antd";

const InstructorProfile = () => {
  const [missingRequirements, setMissingRequirements] =
    useState<MissingRequirements | null>(null);

  useEffect(() => {
    ProfileApi.checkInstructorProfileBeforePublishCourse().then(({ data }) => {
      setMissingRequirements(data.missingRequirements);
    });
  }, []);

  if (!missingRequirements) return null;

  return Object.keys(missingRequirements).length < 1 ? (
    <Alert
      showIcon
      message="Bạn đã hoàn tất thông tin giảng viên!"
      type="success"
    />
  ) : (
    <>
      <ErrorBanner
        error={
          "Tất cả các thông tin của giảng viên phải được điền đầy đủ trước khi khóa học được mở bán công khai.\nBao gồm tên, hình ảnh, và giới thiệu ngắn tối thiểu 15 từ."
        }
      />
      <div className="instructor-profile">
        <div className="instructor-profile__info">
          {Object.keys(missingRequirements).map((key) => {
            return (
              <li
                style={{
                  listStyleType: "disc",
                  listStylePosition: "inside",
                }}
                key={key}
              >
                {missingRequirements[key].at(-1)}
              </li>
            );
          })}
          <Link to={ROUTES.PROFILE}>Cập nhật profile.</Link>
        </div>
      </div>
    </>
  );
};

export default InstructorProfile;
