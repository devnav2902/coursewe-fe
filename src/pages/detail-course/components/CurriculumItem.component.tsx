import { PlayCircleOutlined } from "@ant-design/icons";
import { Row } from "antd";
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
    <Row align="middle" justify="space-between">
      <div className="pull-left pd-r-2">
        <PlayCircleOutlined style={{ marginRight: "1rem" }} />
        {title}
      </div>
      <div className="pull-right">
        <div className="duration">{secondsToHMS(playtime_seconds)}</div>
      </div>
    </Row>
  );
};
export default CurriculumItem;
