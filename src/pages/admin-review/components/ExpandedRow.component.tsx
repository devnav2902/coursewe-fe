import { Col, Row, Space, Tag } from "antd";
import Paragraph from "antd/lib/typography/Paragraph";
import Text from "antd/lib/typography/Text";
import Title from "antd/lib/typography/Title";
import { ReviewCourseItem } from "api/admin-review.api";
import { FC } from "react";
import ReactApexChart from "react-apexcharts";
import { roundsTheNumber } from "utils/functions";

interface Props {
  record: ReviewCourseItem;
}

const ExpandedRow: FC<Props> = ({ record }) => {
  const series = [
    {
      data: Array.from({ length: 10 }).map((_, i) => {
        const rating = 10 - i;

        const exist = record.ratings.find((value) => value.rating === rating);

        if (exist) return exist.votes;
        else return 0;
      }),
      //record.ratings.map((value) => value.rating),
    },
  ];

  console.log(record);

  return (
    <div>
      <Title level={4}>{record.title}</Title>
      <Row gutter={[15, 15]} className="mb-1">
        <Col sm={24} md={8}>
          <Text strong>
            <b>Giảng viên:</b> {record.author.fullname}
          </Text>
        </Col>
        <Col sm={24} md={8}>
          <Text strong>
            Giá khóa học:{" "}
            {parseFloat(record.price.original_price) === 0
              ? "Miễn phí"
              : record.price.format_price + " VNĐ"}
          </Text>
        </Col>
        <Col sm={24} md={8} style={{ textAlign: "left" }}>
          <Text strong>
            Danh mục:{" "}
            {record.categories.map((item) => (
              <Tag style={{ marginBottom: 5 }}>{item.title}</Tag>
            ))}
          </Text>
        </Col>
      </Row>
      <Row>
        <Space direction="vertical" size="small">
          <Title level={5} style={{ color: "#664700", marginBottom: 0 }}>
            Đánh giá chất lượng khóa học
          </Title>
          <Paragraph>
            {record.rating_quality.length < 1
              ? "Chưa có thành viên nào đánh giá!"
              : `${
                  record.rating_quality.length
                } thành viên đã đánh giá khóa học này, điểm chất lượng hiện tại: ${roundsTheNumber(
                  record.rating_quality_avg_rating as string,
                  1
                )} / 10`}
          </Paragraph>
        </Space>
      </Row>
      <div>
        {record.ratings.length > 0 && (
          <ReactApexChart
            type="bar"
            series={series}
            options={{
              chart: {
                type: "bar",
                height: 600,
                stacked: true,
                width: "100%",
              },
              grid: { show: false },
              plotOptions: {
                bar: { barHeight: "100%", horizontal: true },
              },
              dataLabels: {
                formatter: (val) => {
                  return val.toString();
                },
              },
              stroke: {
                width: 1,
                colors: ["#fff"],
              },
              title: {
                text: undefined,
                style: { fontFamily: "var(--font)" },
              },
              xaxis: {
                categories: Array.from({ length: 10 }).map((_, i) => 10 - i),
              },
              yaxis: {
                title: {
                  text: "Đánh giá",
                  style: { fontFamily: "var(--font)", fontSize: "18px" },
                },
                labels: {
                  style: { fontFamily: "var(--font)", fontSize: "16px" },
                  formatter(val, opts?) {
                    return val.toString();
                  },
                },
              },
              fill: {
                opacity: 1,
                colors: ["#E6B91E"],
              },
              legend: {
                position: "top",
                horizontalAlign: "left",
                offsetX: 40,
              },
              tooltip: { enabled: false },
            }}
            height={350}
          />
        )}
      </div>
    </div>
  );
};

export default ExpandedRow;
