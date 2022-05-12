import { Checkbox, Collapse, Space } from "antd";
import { CheckboxValueType } from "antd/lib/checkbox/Group";
import { memo } from "react";
import { useSearchParams } from "react-router-dom";
import { useTypedSelector } from "../../../hooks/redux.hooks";

const { Panel } = Collapse;

const FilterItemPrice = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const { data } = useTypedSelector(
    ({ categories }) => categories.discoveryUnits
  );

  function onChangeCheckboxGroup(value: CheckboxValueType[]) {
    searchParams.set("gia-ban", value.toString());
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
          <Panel header={<b>Giá bán</b>} key="1">
            <Checkbox.Group onChange={onChangeCheckboxGroup}>
              <Space direction="vertical">
                {data?.amountCoursesByTypesPrice &&
                  Object.entries(data.amountCoursesByTypesPrice).map(
                    ([key, value]) => (
                      <Checkbox
                        key={key}
                        value={value.type}
                        disabled={!value.amount ? true : false}
                      >
                        {value.type === "free" ? "Miễn phí" : "Trả phí"}{" "}
                        <span className="amount">({value.amount})</span>
                      </Checkbox>
                    )
                  )}
              </Space>
            </Checkbox.Group>
          </Panel>
        </Collapse>
      </div>
    </div>
  );
};

export default memo(FilterItemPrice);
