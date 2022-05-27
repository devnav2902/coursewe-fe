import { Select } from "antd";
import { ChartOptions } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import moment from "moment";
import { useEffect, useState } from "react";
import { Chart, Line } from "react-chartjs-2";
import { AiTwotoneCalendar } from "react-icons/ai";
import { ImFileExcel } from "react-icons/im";
import PerformanceApi, { RatingArray } from "../../../api/performance.api";
import { Period } from "./RevenueChart.component";

const { Option } = Select;

const RatingChart = () => {
  const currentMonth = new Date().getMonth() + 1;

  const [selectedPeriod, setSelectedPeriod] = useState<Period>(7);
  const [dateRange, setDateRange] = useState<string[]>([]);
  const [chartRating, setChartRating] = useState<{
    loaded: boolean;
    data: RatingArray;
  }>({ loaded: false, data: [] });

  function changePeriod(value: Period) {
    setSelectedPeriod(value);
  }
  useEffect(() => {
    if (selectedPeriod === 12) {
      PerformanceApi.getRating({ LTM: true }).then(({ data }) => {
        const { chartRatingData } = data;
        console.log(chartRatingData);

        const dateRange = chartRatingData.map((item) =>
          moment(item.date).format("MM-YYYY")
        );
        setDateRange(dateRange);

        setChartRating((state) => ({
          ...state,
          data: chartRatingData,
          loaded: true,
        }));
      });
    } else if (selectedPeriod === 7 || selectedPeriod === 30) {
      const toDate = moment(new Date()).format("YYYY-MM-DD");
      const fromDate = moment(toDate)
        .subtract(selectedPeriod, "day")
        .format("YYYY-MM-DD");
      console.log(toDate, fromDate);

      PerformanceApi.getRating({ fromDate, toDate }).then(({ data }) => {
        const { chartRatingData } = data;
        console.log(chartRatingData);

        const dateRange = chartRatingData.map((item) => {
          if (chartRatingData.length >= 30)
            return moment(item.date).format("DD-MM");

          return moment(item.date).format("DD-MM-YYYY");
        });
        setDateRange(dateRange);

        setChartRating((state) => ({
          ...state,
          data: chartRatingData,
          loaded: true,
        }));
      });
    }
  }, [currentMonth, selectedPeriod]);

  const chartData = (() => {
    const avgRating = chartRating.data.map((rating) =>
      !rating.avg_rating ? 0 : rating.avg_rating
    );

    const numberStudent = chartRating.data.map((rating) =>
      !rating.count_students ? 0 : rating.count_students
    );

    return {
      labels: dateRange,
      datasets: [
        {
          type: "line" as const,
          label: "Đánh giá trung bình",
          data: avgRating,
          yAxisID: "yRating",
          backgroundColor: "#c0c0c0",
          borderColor: "transparent",
        },
        {
          type: "bar" as const,
          label: "Số học viên đánh giá",
          data: numberStudent,
          backgroundColor: "#2f7ed8",
          borderColor: "transparent",
        },
      ],
    };
  })();

  const options: ChartOptions = {
    responsive: true,
    datasets: {
      line: {
        backgroundColor: "transparent",
        pointStyle: "circle",
        tension: 0,
        pointHoverRadius: 6,
        pointHoverBorderWidth: 6,
        pointRadius: 3,
        pointBorderWidth: 2,
        pointBackgroundColor: "#fff",
        pointBorderColor: "#00ccff",
        segment: { borderColor: "#00ccff", borderWidth: 2 },
      },
    },
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          font: {
            size: 14,
            weight: "bold",
          },
          padding: 15,
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            if (context.dataset.type === "line") {
              return `Đánh giá: ${context.formattedValue}`;
            }
            return `Số lượng: ${context.formattedValue} học viên`;
          },
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
        font: { size: 14, weight: "bold" },
        align: "top",
        anchor: "end",
        padding: { top: 10 },
        formatter: (value, context) => {
          if (context.dataset.type === "bar") return null;
          return value === 0 ? null : value.toLocaleString("vi-VN");
        },
      },
    },
    scales: {
      x: {
        stacked: true,
        ticks: {
          color: "rgb(0, 0, 0)",
          font: { size: 14, weight: "bold" },
        },
        grid: {
          display: false,
        },
      },
      y: {
        stacked: true,
        position: "right",
        ticks: {
          color: "rgba(42, 42, 43, 0.719)",
          font: { size: 14 },
        },
        grid: {
          color: "#c0c0c0",
        },
      },
      yRating: {
        stacked: true,
        position: "left",
        ticks: {
          color: "#31357c",
          font: { size: 14 },
        },
        grid: { display: false },
      },
    },
  };

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
            <Chart
              type="bar"
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

export default RatingChart;
