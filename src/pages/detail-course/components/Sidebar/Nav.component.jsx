import { StarFilled } from "@ant-design/icons";
import { Row } from "antd";
import { roundsTheNumber } from "../../../../utils/functions";

const Nav = ({ dataCheckPurchase, navProps, offset }) => {
  const { title, rating_avg_rating, course_bill_count, rating_count } =
    navProps;

  return (
    <nav
      className={`nav-top${
        offset >= 400 && !dataCheckPurchase.hasPurchased ? " nav-top-fixed" : ""
      }`}
    >
      <Row align="middle" className="h-100">
        <div className="info-course">
          <div className="title">{title}</div>

          <div className="rating-content d-flex align-items-center">
            {rating_avg_rating && (
              <span>{roundsTheNumber(rating_avg_rating, 1)}</span>
            )}

            <StarFilled />

            <span className="rating-count">({rating_count} Đánh giá)</span>
            <span>{course_bill_count} Học viên</span>
          </div>
        </div>
      </Row>
    </nav>
  );
};

export default Nav;
