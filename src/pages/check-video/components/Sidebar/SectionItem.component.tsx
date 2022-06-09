import { Collapse } from "antd";
import { FC } from "react";
import { useTypedSelector } from "../../../../hooks/redux.hooks";
import { Section } from "../../../../ts/types/course.types";
import LectureItem from "./LectureItem.component";

const { Panel } = Collapse;

type SectionProps = {
  section: Section;
};

const SectionItem: FC<SectionProps> = ({ section }) => {
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
                    </span>
                    {/* |<span className="duration">40min</span> */}
                  </div>
                </div>
              }
              key="1"
            >
              <LectureItem key={lecture.id} lecture={lecture} />
            </Panel>
          ))}
        </Collapse>
      </div>
    </div>
  );
};

export default SectionItem;
