import { Collapse, Radio, Skeleton, Space } from "antd";
import { memo, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RatingApi, {
  ArrayFilterRating,
  FilterRatingByCategorySlug,
} from "../../../api/rating.api";
import Rating from "../../../components/Rating/Rating.component";
import { getCategorySlug } from "../utils/functions";

const { Panel } = Collapse;

const FilterItemRating = () => {
  const { slug, sub, topic } = useParams();

  // STATE
  const [filterRating, setFilterRating] = useState<ArrayFilterRating>([]);
  const [loaded, setLoaded] = useState(false);

  // EFFECT
  useEffect(() => {
    const params = { slug, sub, topic };
    const categorySlug = getCategorySlug(params);

    if (categorySlug) {
      setLoaded(false);
      RatingApi.filterRatingByCategorySlug(categorySlug).then(({ data }) => {
        setFilterRating(data.filterRating);
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
          <Panel header={<b>Đánh giá</b>} key="1">
            {!loaded ? (
              <Skeleton active />
            ) : (
              <Radio.Group>
                <Space direction="vertical">
                  {Object.keys(filterRating).map((rating: string, i) => (
                    <Radio value={rating} key={i}>
                      <Rating value={parseFloat(rating)} size={"14px"} />
                      <span className="ml-1">{rating} trở lên</span>
                      <span className="amount ml-1">
                        ({filterRating[rating as any].amount})
                      </span>
                    </Radio>
                  ))}
                </Space>
              </Radio.Group>
            )}
          </Panel>
        </Collapse>
      </div>
    </div>
  );
};

export default memo(FilterItemRating);
