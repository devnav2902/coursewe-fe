import { FC } from "react";

type EnrollButtonProps = {
  className?: string;
};

// USE FOR FREE COURSE
const EnrollButton: FC<EnrollButtonProps> = ({ className }) => {
  return (
    <button className={`btn-primary ${className ? className : ""}`}>
      Tham gia khóa học
    </button>
  );
};

export default EnrollButton;
