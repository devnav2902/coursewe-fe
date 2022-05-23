import { Select } from "antd";
import { ChartOptions } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import moment from "moment";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
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
  function avgRating() {
    const avg: any = [];
    chartRating.data.map((rating: any) =>
      rating.avg_rating === null ? avg.push(0) : avg.push(rating.avg_rating)
    );
    return avg;
  }

  function avgNumberStudent() {
    const avg: any = [];
    chartRating.data.map((rating: any) =>
      rating.avg_rating === null ? avg.push(0) : avg.push(rating.count_student)
    );
    return avg;
  }

  const data = {
    labels: dateRange,
    datasets: [
      {
        label: "Trung bình đánh giá của học viên",
        data: avgRating(),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        yAxisID: "y",
      },
      {
        label: "Số học viên đã đăng ký",
        data: avgNumberStudent(),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        yAxisID: "y1",
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    interaction: {
      mode: "index",
      intersect: false,
    },

    plugins: {
      title: {
        display: true,
        text: "Chart.js Line Chart - Multi Axis",
      },
    },
    scales: {
      y: {
        type: "linear",
        display: true,
        position: "left",
      },
      y1: {
        type: "linear",
        display: true,
        position: "right",

        // grid line settings
        grid: {
          drawOnChartArea: false, // only want the grid lines for one axis to show up
        },
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
            <Line plugins={[ChartDataLabels]} options={options} data={data} />
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
