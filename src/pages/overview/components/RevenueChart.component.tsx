import { Select } from "antd";
import { ChartOptions } from "chart.js";
import moment from "moment";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { AiTwotoneCalendar } from "react-icons/ai";
import { ImFileExcel } from "react-icons/im";
import PerformanceApi, { RevenueArray } from "../../../api/performance.api";
import ChartDataLabels from "chartjs-plugin-datalabels";

const { Option } = Select;

export type Period = 7 | 30 | 12 | "all";

const RevenueChart = () => {
  const currentMonth = new Date().getMonth() + 1;

  const [selectedPeriod, setSelectedPeriod] = useState<Period>(7);
  const [revenueData, setRevenueData] = useState<{
    loaded: boolean;
    data: RevenueArray;
  }>({ loaded: false, data: [] });
  const [dateRange, setDateRange] = useState<string[]>([]);

  useEffect(() => {
    if (selectedPeriod === 12) {
      PerformanceApi.getRevenue({ LTM: true }).then(({ data }) => {
        const { revenueData } = data;
        console.log(revenueData);

        const dateRange = revenueData.map((item) =>
          moment(item.date).format("MM-YYYY")
        );
        setDateRange(dateRange);

        setRevenueData((state) => ({
          ...state,
          data: revenueData,
          loaded: true,
        }));
      });
    } else if (selectedPeriod === 7 || selectedPeriod === 30) {
      const toDate = moment(new Date()).format("YYYY-MM-DD");
      const fromDate = moment(toDate)
        .subtract(selectedPeriod, "day")
        .format("YYYY-MM-DD");
      console.log(toDate, fromDate);

      PerformanceApi.getRevenue({ fromDate, toDate }).then(({ data }) => {
        const { revenueData } = data;
        console.log(revenueData);

        const dateRange = revenueData.map((item) => {
          if (revenueData.length >= 30)
            return moment(item.date).format("DD-MM");

          return moment(item.date).format("DD-MM-YYYY");
        });
        setDateRange(dateRange);

        setRevenueData((state) => ({
          ...state,
          data: revenueData,
          loaded: true,
        }));
      });
    }
  }, [currentMonth, selectedPeriod]);

  const options: ChartOptions<"line"> = {
    responsive: true,
    datasets: {
      line: {
        pointStyle: "circle",
        tension: 0.2,
        pointHoverRadius: 6,
        pointHoverBorderWidth: 6,
        pointRadius: 5,
        pointBorderWidth: 2,
        pointBackgroundColor: "#fff",
        pointBorderColor: "#f5a067",
        segment: { borderColor: "#f5a067", borderWidth: 2 },
      },
    },
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          color: "#f5a067",
          font: {
            size: 16,
            weight: "bold",
          },
          padding: 15,
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => `Doanh thu: ${context.formattedValue} VNĐ`,
        },
        titleFont: {
          size: 18,
        },
        bodyFont: {
          size: 18,
        },
      },
      datalabels: {
        color: "#302f2f",
        font: { size: 16, weight: "bold" },
        align: "top",
        anchor: "end",
        formatter: (value, context) => {
          if (context.dataset.data.length >= 30) return null;
          return value === 0 ? "" : value.toLocaleString("vi-VN");
        },
      },
    },
    scales: {
      x: {
        stacked: true,
        ticks: {
          color: "rgba(42, 42, 43, 0.719)",
          font: { size: 14 },
        },
        grid: {
          color: "#ebedef",
        },
      },
      y: {
        stacked: true,
        ticks: {
          color: "rgba(42, 42, 43, 0.719)",
          font: { size: 14 },
        },
        grid: {
          color: "#ebedef",
        },
      },
    },
  };

  const chartData = (() => {
    const data = revenueData.data.map((item) => item.revenue);

    return {
      labels: dateRange,
      datasets: [
        {
          label: "Doanh thu(VNĐ)",
          data,
          borderColor: "#f5a067",
          backgroundColor: "rgba(255, 255, 255, 0.5)",
        },
      ],
    };
  })();

  function changePeriod(value: Period) {
    setSelectedPeriod(value);
  }

  return (
    <div className="tab-content">
      <div className="tab-pane">
        <div className="instructor-analytics--chart d-flex flex-column">
          <div className="date-range ml-auto d-flex align-items-center">
            <div className="txt d-flex align-items-center">
              <AiTwotoneCalendar style={{ fontSize: 18 }} />
              &nbsp;
              <b>Thời gian:</b>{" "}
            </div>
            <Select
              onChange={changePeriod}
              value={selectedPeriod}
              style={{ width: 150 }}
              bordered={false}
            >
              <Option value={7}>7 ngày qua</Option>
              <Option value={30}>30 ngày qua</Option>
              <Option value={12}>12 tháng qua</Option>
              <Option value="all">Tất cả</Option>
            </Select>
          </div>
          <div className="containerChart activeChart">
            <Line
              plugins={[ChartDataLabels]}
              options={options}
              data={chartData}
            />
          </div>
        </div>
        <div className="instructor-analytics--chart-footer">
          <div className="export d-flex align-items-center">
            <ImFileExcel style={{ fontSize: 18 }} />
            &nbsp;
            <b>Xuất báo cáo</b>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RevenueChart;
