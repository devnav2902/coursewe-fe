import { Checkbox, Col, Collapse, Skeleton, Space } from "antd";
import { memo, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import InstructionalLevelApi, {
  ArrayAmountCoursesByLevel,
} from "../../../api/instructionalLevel.api";
import { getCategorySlug } from "../utils/functions";

const { Panel } = Collapse;

const FilterItemLevels = () => {
  const { slug, sub, topic } = useParams();

  // STATE
  const [
    amountCoursesByInstructionalLevel,
    setAmountCoursesByInstructionalLevel,
  ] = useState<ArrayAmountCoursesByLevel>([]);
  const [loaded, setLoaded] = useState(false);

  // EFFECT
  useEffect(() => {
    const params = { slug, sub, topic };
    const categorySlug = getCategorySlug(params);

    if (categorySlug) {
      setLoaded(false);
      InstructionalLevelApi.amountCoursesByInstructionalLevel(
        categorySlug
      ).then(({ data }) => {
        setAmountCoursesByInstructionalLevel(
          data.amountCoursesByInstructionalLevel
        );
        setLoaded(true);
      });
    }
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
              <Checkbox.Group>
                <Space direction="vertical">
                  {amountCoursesByInstructionalLevel.map((item) => (
                    <Checkbox key={item.id} value={item.id}>
                      {item.name}{" "}
                      <span className="amount">({item.amount})</span>
                    </Checkbox>
                  ))}
                </Space>
              </Checkbox.Group>
            )}
          </Panel>
        </Collapse>
      </div>
    </div>
  );
};

export default memo(FilterItemLevels);
