import { PlayCircleOutlined } from "@ant-design/icons";
import { FC } from "react";
import { secondsToHMS } from "../../../utils/functions";

type CurriculumItemProps = {
  title: string;
  playtime_seconds: string;
};

const CurriculumItem: FC<CurriculumItemProps> = ({
  title,
  playtime_seconds,
}) => {
  return (
    <div className="curriculum-item d-flex align-items-center">
      <div className="pull-left">
        <PlayCircleOutlined style={{ marginRight: "1rem" }} />
        {title}
      </div>
      <div className="pull-right ml-auto">
        <div className="duration">{secondsToHMS(playtime_seconds)}</div>
      </div>
    </div>
  );
};
export default CurriculumItem;
