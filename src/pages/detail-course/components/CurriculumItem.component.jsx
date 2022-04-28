import { PlayCircleOutlined } from "@ant-design/icons";
import { secondsToHMS } from "../../../utils/functions";

const CurriculumItem = ({ title, playtime_seconds }) => {
  return (
    <div className="curriculum-item d-flex align-items-center">
      {/* <a href="#" class="play-media"> */}
      <div className="pull-left">
        <PlayCircleOutlined style={{ marginRight: "1rem" }} />
        {title}
      </div>
      <div class="pull-right ml-auto">
        <div class="duration">{secondsToHMS(playtime_seconds)}</div>
      </div>
      {/* </a> */}
    </div>
  );
};
export default CurriculumItem;
