import { Checkbox, Collapse, Empty, Space } from "antd";
import { CheckboxValueType } from "antd/lib/checkbox/Group";
import { FC, memo } from "react";
import { useSearchParams } from "react-router-dom";
import { useTypedSelector } from "../../../hooks/redux.hooks";
import { isNumberStringWithCommas } from "../utils/functions";

const { Panel } = Collapse;

const FilterItemTopics: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const { data } = useTypedSelector(
    ({ categories }) => categories.discoveryUnits
  );

  const topicDefaultValue = (() => {
    const topic = searchParams.get("chu-de") as string;
    const isNumber =
      typeof Number(topic) === "number" && !isNaN(parseInt(topic));

    return isNumberStringWithCommas(topic)
      ? topic.split(",").map((topic) => parseInt(topic))
      : isNumber
      ? [parseInt(topic)]
      : undefined;
  })();

  function onChangeCheckboxGroup(value: CheckboxValueType[]) {
    searchParams.set("chu-de", value.toString());
    setSearchParams(searchParams);
  }

  return (
    <div className="filter-item">
      <div className="filter-item__content">
        <Collapse
          defaultActiveKey={["1"]}
          expandIconPosition="right"
          bordered={false}
        >
          <Panel header={<b>Chủ đề</b>} key="1">
            {data?.amountCoursesInTopics &&
            !data.amountCoursesInTopics.length ? (
              <Empty description="Chưa có chủ đề" />
            ) : (
              <Checkbox.Group
                defaultValue={topicDefaultValue}
                onChange={onChangeCheckboxGroup}
              >
                <Space direction="vertical">
                  {data?.amountCoursesInTopics.map((item) => (
                    <Checkbox
                      key={item.category_id}
                      value={item.category_id}
                      disabled={!item.amount ? true : false}
                    >
                      {item.title}{" "}
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

export default memo(FilterItemTopics);
