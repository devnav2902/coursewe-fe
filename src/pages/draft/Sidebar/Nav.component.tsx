import { StarFilled } from "@ant-design/icons";
import { Row } from "antd";
import { FC } from "react";

type NavProps = {
  navProps: {
    title: string;
  };
  offset: number;
};

const Nav: FC<NavProps> = ({ navProps, offset }) => {
  const { title } = navProps;

  return (
    <nav className={`nav-top${offset >= 400 ? " nav-top-fixed" : ""}`}>
      <Row align="middle" className="h-100">
        <div className="info-course">
          <div className="title">{title}</div>

          <div className="rating-content d-flex align-items-center">
            <span>0.0</span>

            <StarFilled />

            <span className="rating-count">(0 Đánh giá)</span>
            <span>0 Học viên</span>
          </div>
        </div>
      </Row>
    </nav>
  );
};

export default Nav;
