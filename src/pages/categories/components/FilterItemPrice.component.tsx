import { Checkbox, Collapse, Skeleton } from "antd";
import { memo, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CategoriesApi from "../../../api/categories.api";
import { getCategorySlug } from "../utils/functions";

const { Panel } = Collapse;

const FilterItemPrice = () => {
  const { slug, sub, topic } = useParams();
  console.log(slug, sub, topic);

  // STATE
  const [dataAmountCoursesByTypesPrice, setDataAmountCoursesByTypesPrice] =
    useState({ free: { amount: 0 }, paid: { amount: 0 } });
  const [loaded, setLoaded] = useState(false);

  // EFFECT
  useEffect(() => {
    const params = { slug, sub, topic };
    const categorySlug = getCategorySlug(params);

    setLoaded(false);

    CategoriesApi.getAmountCoursesByTypesPrice(categorySlug).then((res) => {
      // console.log(res.data);
      setDataAmountCoursesByTypesPrice(res.data.amountCoursesByTypesPrice);
      setLoaded(true);
    });
  }, [slug, sub, topic]);

  const { free, paid } = dataAmountCoursesByTypesPrice;
  const options = [
    { label: `Miễn phí (${free.amount})`, value: 0 },
    { label: `Trả phí (${paid.amount})`, value: "Paid" },
  ];

  // function onChange(checkedValues) {
  //   console.log("checked = ", checkedValues);
  //   setgetValueAmountCoursesByTypesPrice(checkedValues);
  // }

  return (
    <div className="filter-item">
      <div className="filter-item__content">
        <Collapse
          defaultActiveKey={["1"]}
          expandIconPosition="right"
          bordered={false}
        >
          <Panel header={<b>Giá bán</b>} key="1">
            {!loaded ? (
              <Skeleton active />
            ) : (
              <Checkbox.Group options={options} />
            )}
          </Panel>
        </Collapse>
      </div>
    </div>
  );
};

export default memo(FilterItemPrice);
