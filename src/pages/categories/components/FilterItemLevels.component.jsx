import { Checkbox, Col, Collapse, Skeleton } from "antd";
import { memo, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import InstructionalLevelApi from "../../../api/instructionalLevel.api";
import { getCategorySlug } from "../utils/functions";

const { Panel } = Collapse;

const FilterItemLevels = () => {
  const { slug, sub, topic } = useParams();
  console.log(slug, sub, topic);

  // STATE
  const [
    amountCoursesByInstructionalLevel,
    setAmountCoursesByInstructionalLevel,
  ] = useState([]);
  const [loaded, setLoaded] = useState(false);

  // EFFECT
  useEffect(() => {
    const params = { slug, sub, topic };
    const categorySlug = getCategorySlug(params);

    setLoaded(false);
    InstructionalLevelApi.amountCoursesByInstructionalLevel(categorySlug).then(
      (res) => {
        setAmountCoursesByInstructionalLevel(res.data);
        setLoaded(true);
      }
    );
  }, [slug, sub, topic]);

  return (
    <div className="filter-item">
      <div className="filter-item__content">
        <Collapse
          defaultActiveKey={["1"]}
          expandIconPosition="right"
          bordered={false}
        >
          <Panel header={<b>Cấp độ</b>} key="1">
            {!loaded ? (
              <Skeleton active />
            ) : (
              amountCoursesByInstructionalLevel.map((item) => (
                <Col key={item.id} className="mb-1">
                  <Checkbox>
                    {item.name} <span className="amount">({item.amount})</span>
                  </Checkbox>
                </Col>
              ))
            )}
          </Panel>
        </Collapse>
      </div>
    </div>
  );
};

export default memo(FilterItemLevels);
