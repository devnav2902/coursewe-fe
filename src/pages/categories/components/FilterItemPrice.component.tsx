import { Checkbox, Collapse, Skeleton } from "antd";
import { memo, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CategoriesApi, {
  AmountCoursesByTypesPrice,
} from "../../../api/categories.api";
import { getCategorySlug } from "../utils/functions";

const { Panel } = Collapse;

const FilterItemPrice = () => {
  const { slug, sub, topic } = useParams();

  // STATE
  const [dataAmountCoursesByTypesPrice, setDataAmountCoursesByTypesPrice] =
    useState<AmountCoursesByTypesPrice>({
      free: { amount: 0 },
      paid: { amount: 0 },
    });
  const [loaded, setLoaded] = useState(false);

  // EFFECT
  useEffect(() => {
    const params = { slug, sub, topic };
    const categorySlug = getCategorySlug(params);

    if (categorySlug) {
      setLoaded(false);

      CategoriesApi.getAmountCoursesByTypesPrice(categorySlug).then(
        ({ data }) => {
          setDataAmountCoursesByTypesPrice(data.amountCoursesByTypesPrice);
          setLoaded(true);
        }
      );
    }
  }, [slug, sub, topic]);

  const { free, paid } = dataAmountCoursesByTypesPrice;
  const options = [
    { label: `Miễn phí (${free.amount})`, value: "Free" },
    { label: `Trả phí (${paid.amount})`, value: "Paid" },
  ];

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
