import { Button, Col, Row, Space, Table } from "antd";
import InstructorRevenueApi, {
  InstructorRevenueResponse,
} from "api/instructor-revenue.api";
import Rating from "components/Rating/Rating.component";
import moment from "moment";
import { useEffect, useState } from "react";
import { BiBarChartAlt2 } from "react-icons/bi";
import { BsCurrencyDollar } from "react-icons/bs";
import { GiPieChart } from "react-icons/gi";
import { ImFileExcel } from "react-icons/im";
import styled from "styled-components";
import { roundsTheNumber } from "utils/functions";
import Card from "../components/Card.component";

const StyledTable = styled.div`
  border-radius: 16px;
  padding: 15px;
  overflow: hidden;
  box-shadow: 0 0 2px 0 #ddd6d6, 0 12px 24px -4px #ebe5e5;
  .ant-table-thead {
    tr th {
      color: rgb(99, 115, 129);
      background-color: rgb(231, 234, 236);
    }
  }
`;

const InstructorRevenuePage = () => {
  const [revenueData, setRevenueData] = useState<{
    loaded: boolean;
    data: InstructorRevenueResponse["courses"]["data"];
    totalRevenue: number;
    bestRevenueCourse: number;
    revenueLatestCourse: number | null;
  }>({
    loaded: false,
    data: [],
    totalRevenue: 0,
    bestRevenueCourse: 0,
    revenueLatestCourse: 0,
  });

  useEffect(function getCoursesRevenue() {
    InstructorRevenueApi.get()
      .then(({ data }) => {
        setRevenueData({
          data: data.courses.data,
          loaded: true,
          totalRevenue: data.totalRevenue,
          bestRevenueCourse: data.bestRevenueCourse,
          revenueLatestCourse: data.revenueLatestCourse,
        });
      })
      .catch((_) => {
        setRevenueData((state) => ({
          ...state,
          loaded: true,
        }));
      });
  }, []);

  return (
    <div>
      <Row justify="space-between">
        <h2>Doanh thu khóa học</h2>
        <Button>
          <Space align="center" size={10}>
            <ImFileExcel style={{ fontSize: 18 }} />
            <b>Xuất báo cáo</b>
          </Space>
        </Button>
      </Row>
      <Row gutter={[30, 30]}>
        <Col span={8}>
          <Card
            title="Tổng doanh thu"
            data={[15, 3, 7, 7, 12, 7, 14]}
            color="#82aeff"
            revenue={revenueData.totalRevenue.toLocaleString("vi-VN")}
            icon={<BsCurrencyDollar />}
          />
        </Col>
        <Col span={8}>
          <Card
            title="Khóa học bán nhiều nhất"
            data={[8, 20, 14, 9, 12, 11, 25]}
            color="#e45ba6"
            revenue={
              revenueData.bestRevenueCourse
                ? revenueData.bestRevenueCourse.toLocaleString("vi-VN")
                : "0"
            }
            icon={<GiPieChart />}
          />
        </Col>
        <Col span={8}>
          <Card
            title="Khóa học mới nhất"
            data={[15, 8, 17, 6, 9, 11, 14]}
            color="#f8a04d"
            revenue={
              revenueData.revenueLatestCourse
                ? revenueData.revenueLatestCourse.toLocaleString("vi-VN")
                : "0"
            }
            icon={<BiBarChartAlt2 />}
          />
        </Col>
      </Row>
      <div className="mt-3">
        <StyledTable>
          <Table
            columns={[
              {
                title: "Tên khóa học",
                dataIndex: "title",
                key: "title",
                width: 300,
                ellipsis: { showTitle: true },
              },
              {
                title: "Điểm đánh giá",
                dataIndex: "rating_avg_rating",
                key: "rating_avg_rating",
                render: (value) => {
                  return (
                    <div>
                      {!value ? (
                        "Chưa có"
                      ) : (
                        <Space align="center">
                          <b style={{ color: "#e59819" }}>
                            {roundsTheNumber(value, 1)}
                          </b>
                          <Rating value={value} />
                        </Space>
                      )}
                    </div>
                  );
                },
              },
              {
                title: "Doanh thu",
                dataIndex: "course_bill_sum_purchase",
                key: "course_bill_sum_purchase",
                render: (value) => (
                  <div>
                    {value === 0
                      ? "Chưa có"
                      : value.toLocaleString("vi-VN") + " VNĐ"}
                  </div>
                ),
              },
              {
                title: "Số học viên",
                dataIndex: "course_bill_count",
                key: "course_bill_count",
                render: (value) => (
                  <div>{value < 1 ? "Chưa có" : value + " Học viên"}</div>
                ),
              },
              {
                title: "Ngày tạo",
                dataIndex: "created_at",
                key: "created_at",
                render: (value) => (
                  <div>{moment(value).format("DD/MM/YYYY")}</div>
                ),
              },
            ]}
            bordered={false}
            dataSource={revenueData.data}
            loading={!revenueData.loaded}
          />
        </StyledTable>
      </div>
    </div>
  );
};

export default InstructorRevenuePage;
