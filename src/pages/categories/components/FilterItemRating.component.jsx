import { Checkbox, Col, Collapse, Empty, Radio, Row, Skeleton } from "antd";
import { memo, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CategoriesApi from "../../../api/categories.api";
import RatingApi from "../../../api/rating.api";
import Rating from "../../../components/Rating/Rating.component";
import { getCategorySlug } from "../utils/functions";

const { Panel } = Collapse;

const FilterItemRating = () => {
  const { slug, sub, topic } = useParams();
  console.log(slug, sub, topic);

  // STATE
  const [filterRating, setFilterRating] = useState([]);
  const [loaded, setLoaded] = useState(false);

  // EFFECT
  useEffect(() => {
    const params = { slug, sub, topic };
    const categorySlug = getCategorySlug(params);

    setLoaded(false);
    RatingApi.filterRatingByCategorySlug(categorySlug).then((res) => {
      console.log(res);
      setFilterRating(res.data.filterRating);
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
          <Panel header={<b>Đánh giá</b>} key="1">
            {!loaded ? (
              <Skeleton active />
            ) : (
              Object.keys(filterRating).map((rating) => (
                <Row key={rating} align="middle" className="mb-1">
                  <Radio name="rating">
                    <Rating value={parseFloat(rating)} size={"12px"} />
                    <span className="ml-1">{rating} trở lên</span>
                    <span className="amount ml-1">
                      ({filterRating[rating].amount})
                    </span>
                  </Radio>
                </Row>
              ))
            )}
          </Panel>
        </Collapse>
      </div>
    </div>
  );
};

export default memo(FilterItemRating);
