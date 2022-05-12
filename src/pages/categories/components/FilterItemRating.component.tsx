import { Collapse, Radio, RadioChangeEvent, Space } from "antd";
import { memo } from "react";
import { useSearchParams } from "react-router-dom";
import Rating from "../../../components/Rating/Rating.component";
import { useTypedSelector } from "../../../hooks/redux.hooks";

const { Panel } = Collapse;

const FilterItemRating = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const ratingDefaultValue = searchParams.get("danh-gia")
    ? searchParams.get("danh-gia")
    : null;

  const { data } = useTypedSelector(
    ({ categories }) => categories.discoveryUnits
  );

  function onChangeRadioGroup(e: RadioChangeEvent) {
    searchParams.set("danh-gia", e.target.value);
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
          <Panel header={<b>Đánh giá</b>} key="1">
            <Radio.Group
              onChange={onChangeRadioGroup}
              defaultValue={ratingDefaultValue}
            >
              <Space direction="vertical">
                {data?.filterRating &&
                  Object.entries(data.filterRating).map(([key, value]) => (
                    <Radio
                      value={key}
                      key={key}
                      disabled={!value.amount ? true : false}
                    >
                      <Rating value={parseFloat(key)} size={"17px"} />
                      <span className="ml-1">{key} trở lên</span>
                      <span className="amount ml-1">({value.amount})</span>
                    </Radio>
                  ))}
              </Space>
            </Radio.Group>
          </Panel>
        </Collapse>
      </div>
    </div>
  );
};

export default memo(FilterItemRating);
