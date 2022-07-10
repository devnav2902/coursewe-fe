import { Button, Row, Select, Space } from "antd";
import { ChartOptions } from "chart.js";
import moment from "moment";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { AiTwotoneCalendar } from "react-icons/ai";
import { ImFileExcel } from "react-icons/im";
import PerformanceApi, {
  Params,
  RevenueArray,
} from "../../../api/performance.api";
import ChartDataLabels from "chartjs-plugin-datalabels";
import ExportApi from "../../../api/export.api";
import { openNotification } from "../../../utils/functions";

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
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    if (selectedPeriod === 12) {
      PerformanceApi.getRevenue({ LTM: true }).then(({ data }) => {
        const { revenueData } = data;

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

      PerformanceApi.getRevenue({ fromDate, toDate }).then(({ data }) => {
        const { revenueData } = data;

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
          if (context.dataset.data.length >= 12) return null;
          return value === 0 ? "" : value.toLocaleString("vi-VN");
        },
        display: false,
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
    const data = revenueData.data.map((item) => item.revenue);

    return {
      labels: dateRange,
      datasets: [
        {
          label: "Doanh thu(VNĐ)",
          data,
          borderColor: "transparent",
        },
      ],
    };
  })();

  function changePeriod(value: Period) {
    setSelectedPeriod(value);
  }

  function handleExportData() {
    let params: Params = { LTM: true };

    if (selectedPeriod === 7 || selectedPeriod === 30) {
      const toDate = moment(new Date()).format("YYYY-MM-DD");
      const fromDate = moment(toDate)
        .subtract(selectedPeriod, "day")
        .format("YYYY-MM-DD");

      params = { fromDate, toDate };
    }

    setDownloading(true);

    ExportApi.revenueExport(params)
      .then((res) => {
        setDownloading(false);
        openNotification("success", "Tải file thành công!");
      })
      .catch((error) => {
        setDownloading(false);
        openNotification("error", "Lỗi trong quá trình tải dữ liệu!");
      });
  }

  return (
    <div className="tab-content">
      <Row justify="end">
        <Space size={25}>
          <Button loading={downloading} onClick={handleExportData}>
            <Space align="center" size={10}>
              <ImFileExcel style={{ fontSize: 18 }} />
              <b>Xuất báo cáo</b>
            </Space>
          </Button>

          <Space align="center" size={10}>
            <AiTwotoneCalendar style={{ fontSize: 18 }} />
            <b>Thời gian:</b>
          </Space>
        </Space>

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
      </Row>
      <div className="containerChart">
        <Line plugins={[ChartDataLabels]} options={options} data={chartData} />
      </div>
    </div>
  );
};

export default RevenueChart;
