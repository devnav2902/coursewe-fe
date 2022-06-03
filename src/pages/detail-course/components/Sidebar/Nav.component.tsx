import { StarFilled } from "@ant-design/icons";
import { Row } from "antd";
import { FC } from "react";
import { roundsTheNumber } from "../../../../utils/functions";

export type NavPropsItems = {
  rating_avg_rating: string;
  rating_count: number;
  course_bill_count: number;
  title: string;
};

type NavProps = {
  hasPurchased: boolean;
  navProps: NavPropsItems;
  offset: number;
};

const Nav: FC<NavProps> = ({ hasPurchased, navProps, offset }) => {
  const { title, rating_avg_rating, course_bill_count, rating_count } =
    navProps;

  return (
    <nav
      className={`nav-top${
        offset >= 400 && !hasPurchased ? " nav-top-fixed" : ""
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
