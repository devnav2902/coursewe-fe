import { Checkbox, Collapse, Skeleton } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import InstructionalLevelApi from "../../../api/instructionalLevel.api";
import { getCategorySlug } from "../utils/functions";

const { Panel } = Collapse;

const FilterItemLevels = () => {
  // console.log(params);
  const { slug, sub, topic } = useParams();

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
    console.log(categorySlug);

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
                <Checkbox key={item.id}>
                  {item.name} <span className="amount">({item.amount})</span>
                </Checkbox>
              ))
            )}
          </Panel>
        </Collapse>
      </div>
    </div>
  );
};

export default FilterItemLevels;
