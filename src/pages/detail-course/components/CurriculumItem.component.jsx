import { PlayCircleOutlined } from "@ant-design/icons";

const CurriculumItem = ({ title }) => {
  return (
    <div className="curriculum-item">
      {/* <a href="#" class="play-media"> */}
      <div className="pull-left">
        <PlayCircleOutlined style={{ marginRight: "1rem" }} />
        {title}
      </div>
      {/* <div class="pull-right">
                  <div class="minutes">35 Minutes</div>
              </div>  */}
      {/* </a> */}
    </div>
  );
};
export default CurriculumItem;
