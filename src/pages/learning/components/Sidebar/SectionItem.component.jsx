import { Collapse } from "antd";
import { Link } from "react-router-dom";
import { routesWithParams } from "../../../../utils/constants";
import LectureItem from "./LectureItem.component";

const { Panel } = Collapse;

const SectionItem = ({ section, dataCourse }) => {
  return (
    <div className="section">
      <div className="accordion-panel {{ $section->order == 1 ? '' : 'd-none' }}">
        <Collapse
          bordered={false}
          defaultActiveKey={["1"]}
          // onChange={callback}
          expandIconPosition="right"
        >
          {section.lecture.map((lecture) => (
            <Panel
              header={
                <div className="container">
                  <div className="title-section">
                    Chương {section.order}:&nbsp;
                    {section.title}
                  </div>
                  <div className="bottom">
                    <span>
                      <span className="count">
                        {section.progress_in_lectures_count}
                      </span>
                      /{section.lecture_count}
                    </span>
                    {/* |<span className="duration">40min</span> */}
                  </div>
                </div>
              }
              key="1"
            >
              <Link
                to={routesWithParams.learning(
                  dataCourse.course.slug,
                  lecture.id
                )}
              >
                <LectureItem key={lecture.id} lecture={lecture} />
              </Link>
            </Panel>
          ))}
        </Collapse>
      </div>
    </div>
  );
};

export default SectionItem;
