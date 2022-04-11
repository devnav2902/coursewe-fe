import { Checkbox, Col, Collapse, Empty, Skeleton } from "antd";
import { memo, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CategoriesApi from "../../../api/categories.api";
import { getCategorySlug } from "../utils/functions";

const { Panel } = Collapse;

const FilterItemTopics = () => {
  const { slug, sub, topic } = useParams();
  console.log(slug, sub, topic);

  // STATE
  const [amountCoursesInTopics, setAmountCoursesInTopics] = useState([]);
  const [loaded, setLoaded] = useState(false);

  // EFFECT
  useEffect(() => {
    const params = { slug, sub, topic };
    const categorySlug = getCategorySlug(params);

    setLoaded(false);
    CategoriesApi.amountCoursesInTopics(categorySlug).then((res) => {
      setAmountCoursesInTopics(res.data.topicsWithCourses);
      setLoaded(true);
    });
  }, [slug, sub, topic]);

  return (
    <div className="filter-item">
      <div className="filter-item__content">
        <Collapse
          defaultActiveKey={["1"]}
          expandIconPosition="right"
          bordered={false}
        >
          <Panel header={<b>Chủ đề</b>} key="1">
            {!loaded ? (
              <Skeleton active />
            ) : !amountCoursesInTopics.length ? (
              <Empty description="Chưa có chủ đề" />
            ) : (
              amountCoursesInTopics.map((item) => (
                <Col key={item.category_id} className="mb-1">
                  <Checkbox>
                    {item.title} <span className="amount">({item.amount})</span>
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

export default memo(FilterItemTopics);
