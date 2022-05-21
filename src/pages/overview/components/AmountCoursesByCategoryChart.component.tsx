import { Select } from "antd";
import { ChartOptions } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import moment from "moment";
import { useEffect, useState } from "react";
import { Chart } from "react-chartjs-2";
import { AiTwotoneCalendar } from "react-icons/ai";
import { ImFileExcel } from "react-icons/im";
import PerformanceApi, {
  AmountCoursesByCategoryArray,
} from "../../../api/performance.api";

const { Option } = Select;

export type Period = 7 | 30 | 12 | "all";
const AmountCoursesByCategoryChart = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<Period>(7);
  const [amountCoursesByCategoryData, setAmountCoursesByCategoryData] =
    useState<{
      loaded: boolean;
      data: AmountCoursesByCategoryArray;
    }>({ loaded: false, data: [] });
  const [categoriesList, setCategoriesList] = useState<string[]>([]);

  useEffect(() => {
    if (
      typeof selectedPeriod === "number" &&
      [7, 30, 12].includes(selectedPeriod)
    ) {
      const toDate = moment(new Date()).format("YYYY-MM-DD");
      const fromDate = moment(toDate)
        .subtract(selectedPeriod, "day")
        .format("YYYY-MM-DD");

      const params =
        selectedPeriod === 7 || selectedPeriod === 30
          ? { fromDate, toDate }
          : { LTM: true as const };

      PerformanceApi.getCourses(params).then(({ data }) => {
        const { amountCoursesByCategory } = data;

        const categories = amountCoursesByCategory.map((item) => item.category);
        setCategoriesList(categories);

        setAmountCoursesByCategoryData((state) => ({
          ...state,
          data: amountCoursesByCategory,
          loaded: true,
        }));
      });
    }
  }, [selectedPeriod]);

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
              return `Doanh thu: ${context.formattedValue} VNĐ`;
            }
            return `Số lượng: ${context.formattedValue} khóa học`;
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
        position: "left",
        ticks: {
          color: "rgba(42, 42, 43, 0.719)",
          font: { size: 14 },
        },
        grid: {
          color: "#c0c0c0",
        },
      },
      yRevenue: {
        stacked: true,
        position: "right",
        ticks: {
          color: "#31357c",
          font: { size: 14 },
        },
        grid: { display: false },
      },
    },
  };

  const chartData = (() => {
    const dataAmountCourses = amountCoursesByCategoryData.data.map(
      (item) => item.amountCourses
    );
    const dataRevenue = amountCoursesByCategoryData.data.map(
      (item) => item.revenue
    );

    return {
      labels: categoriesList,
      datasets: [
        {
          type: "line" as const,
          label: "Doanh thu theo danh mục",
          data: dataRevenue,
          yAxisID: "yRevenue",
          borderColor: "transparent",
        },
        {
          type: "bar" as const,
          label: "Khóa học theo danh mục",
          data: dataAmountCourses,
          backgroundColor: "#2f7ed8",
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

export default AmountCoursesByCategoryChart;
