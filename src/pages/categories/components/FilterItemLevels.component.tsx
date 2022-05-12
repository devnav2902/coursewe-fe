import { Checkbox, Collapse, Space } from "antd";
import { CheckboxValueType } from "antd/lib/checkbox/Group";
import { memo } from "react";
import { useSearchParams } from "react-router-dom";
import { useTypedSelector } from "../../../hooks/redux.hooks";
import { isNumberStringWithCommas } from "../utils/functions";

const { Panel } = Collapse;

const FilterItemLevels = () => {
  const { data } = useTypedSelector(
    ({ categories }) => categories.discoveryUnits
  );
  const [searchParams, setSearchParams] = useSearchParams();

  const levelDefaultValue = (() => {
    const level = searchParams.get("trinh-do") as string;
    const isNumber =
      typeof Number(level) === "number" && !isNaN(parseInt(level));

    return isNumberStringWithCommas(level)
      ? level.split(",").map((level) => parseInt(level))
      : isNumber
      ? [parseInt(level)]
      : undefined;
  })();

  function onChangeLevel(value: CheckboxValueType[]) {
    searchParams.set("trinh-do", value.toString());
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
          <Panel header={<b>Cấp độ</b>} key="1">
            {data?.amountCoursesByInstructionalLevel && (
              <Checkbox.Group
                onChange={onChangeLevel}
                defaultValue={levelDefaultValue}
              >
                <Space direction="vertical">
                  {data.amountCoursesByInstructionalLevel.map((item) => (
                    <Checkbox
                      key={item.id}
                      value={item.id}
                      disabled={!item.amount ? true : false}
                    >
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
