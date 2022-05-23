import { Select } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { AiTwotoneCalendar } from "react-icons/ai";
import { ImFileExcel } from "react-icons/im";
import PerformanceApi, { EnrollmentArray } from "../../../api/performance.api";
import { Period } from "./RevenueChart.component";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { ChartOptions } from "chart.js";

const { Option } = Select;

const StudentChart = () => {
  const [enrollmentData, setEnrollmentData] = useState<{
    loaded: boolean;
    data: EnrollmentArray;
  }>({ loaded: false, data: [] });
  const [dateRange, setDateRange] = useState<string[]>([]);
  const [selectedPeriod, setSelectedPeriod] = useState<Period>(7);
  const currentMonth = new Date().getMonth() + 1;

  useEffect(() => {
    if (selectedPeriod === 12) {
      PerformanceApi.getEnrollments({ LTM: true }).then(({ data }) => {
        const { enrollmentData } = data;

        const dateRange = enrollmentData.map((item) =>
          moment(item.date).format("MM-YYYY")
        );
        setDateRange(dateRange);

        setEnrollmentData((state) => ({
          ...state,
          data: enrollmentData,
          loaded: true,
        }));
      });
    } else if (selectedPeriod === 7 || selectedPeriod === 30) {
      const toDate = moment(new Date()).format("YYYY-MM-DD");
      const fromDate = moment(toDate)
        .subtract(selectedPeriod, "day")
        .format("YYYY-MM-DD");

      PerformanceApi.getEnrollments({ fromDate, toDate }).then(({ data }) => {
        const { enrollmentData } = data;

        const dateRange = enrollmentData.map((item) => {
          if (enrollmentData.length >= 30)
            return moment(item.date).format("DD-MM");

          return moment(item.date).format("DD-MM-YYYY");
        });
        setDateRange(dateRange);

        setEnrollmentData((state) => ({
          ...state,
          data: enrollmentData,
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
          label: (context) => `Tổng: ${context.formattedValue} học viên`,
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
          return value === 0 ? "" : value;
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
          display: false,
        },
      },
      y: {
        stacked: true,
        ticks: {
          color: "rgba(42, 42, 43, 0.719)",
          font: { size: 14 },
        },
        grid: {
          color: "#c0c0c0",
        },
      },
    },
  };

  const chartData = (() => {
    const data = enrollmentData.data.map((item) => item.total);

    return {
      labels: dateRange,
      datasets: [
        {
          label: "Học viên đã đăng ký",
          data,
          borderColor: "transparent",
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

export default StudentChart;
