import { Row } from "antd";
import Text from "antd/lib/typography/Text";
import Title from "antd/lib/typography/Title";
import { FC, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { BsCurrencyDollar } from "react-icons/bs";
import styled from "styled-components";

const StyledCardWrapper = styled.div`
  border-radius: 16px;
  box-shadow: 0 0 2px 0 #ddd6d6, 0 12px 24px -4px #ebe5e5;
  padding: 15px;

  h5 {
    color: #554949;
  }

  .icon {
    width: 35px;
    height: 35px;
    display: flex;
    border-radius: 50%;
    align-items: center;
    justify-content: center;
    color: rgb(84, 214, 44);
    background-color: rgba(84, 214, 44, 0.16);
  }
`;

interface Props {
  title: string;
  data: number[];
  color: string;
  revenue: string;
  icon: JSX.Element;
}

const Card: FC<Props> = ({ title, data, color, revenue, icon }) => {
  return (
    <StyledCardWrapper>
      <Row justify="space-between">
        <div className="icon">{icon}</div>
        <div style={{ marginTop: -10 }}>
          <ReactApexChart
            type="area"
            series={[{ data }]}
            width={190}
            height={90}
            options={{
              chart: { toolbar: { show: false } },
              tooltip: { enabled: false },
              grid: { show: false },
              xaxis: {
                labels: { show: false },
                axisTicks: {
                  show: false,
                },
              },
              stroke: {
                width: 3,
                colors: [color],
                curve: "smooth",
              },
              title: {
                text: undefined,
              },
              yaxis: {
                show: false,
              },
              dataLabels: { enabled: false },
              legend: {
                show: false,
              },
            }}
          />
        </div>
      </Row>
      <Title level={5} style={{ marginBottom: 0 }}>
        {title}
      </Title>
      <Text style={{ fontSize: 26, fontWeight: "bold" }}>{revenue} VNĐ</Text>
    </StyledCardWrapper>
  );
};

export default Card;
