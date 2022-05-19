import { Tabs } from "antd";
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { useSelector } from "react-redux";
import ChartApi from "../../../api/performance.api";
import OverviewApi from "../../../api/overview.api";
import RevenueChart from "../components/RevenueChart.component";
import { StyledOverviewWrapper } from "../styles/overview.styles";
import StudentChart from "../components/StudentChart.component";
import { useTypedSelector } from "../../../hooks/redux.hooks";
const { TabPane } = Tabs;
const OverviewPage = () => {
  const { profile } = useTypedSelector((state) => state.user);

  const [loadedEnrollments, setLoadedEnrollments] = useState(false);
  const [loadedRating, setLoadedRating] = useState(false);
  const [loadedCourses, setLoadedCourses] = useState(false);

  const [overview, setOverview] = useState(null);
  const [chartRating, setChartRating] = useState([]);
  const [chartCourses, setChartCourses] = useState([]);

  useEffect(() => {
    OverviewApi.getOverview().then((res) => {
      setOverview(res.data);
    });
    const year = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;

    ChartApi.getRating(year, currentMonth).then((res) => {
      const {
        data: { chartRating },
      } = res;
      setChartRating(chartRating);
      setLoadedRating(true);
    });
    ChartApi.getCourses(year, currentMonth).then((res) => {
      const {
        data: { chartCourses },
      } = res;
      setChartCourses(chartCourses);
      setLoadedCourses(true);
    });
  }, []);

  if (!loadedRating) return null;
  if (!loadedCourses) return null;

  if (!overview) return null;
  const {
    totalStudents,
    numberOfStudentsInMonth,
    totalRevenue,
    totalRevenueInMonth,
    ratingCourses,
    numberOfRatingsInMonth,
    allCourses,
    allInstructors,
    allStudents,
    allCoursesInMonth,
    allCoursesByInstructor,
  } = overview;

  function avgRating() {
    const avg = [];
    chartRating.map((rating) =>
      rating.avg_rating === null ? avg.push(0) : avg.push(rating.avg_rating)
    );
    return avg;
  }
  function avgNumberStudent() {
    const avg = [];
    chartRating.map((rating) =>
      rating.avg_rating === null ? avg.push(0) : avg.push(rating.count_student)
    );
    return avg;
  }

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
  const labels = [
    "Tháng 1",
    "Tháng 2",
    "Tháng 3",
    "Tháng 4",
    "Tháng 5",
    "Tháng 6",
    "Tháng 7",
    "Tháng 8",
    "Tháng 9",
    "Tháng 10",
    "Tháng 11",
    "Tháng 12",
  ];

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        // text: "Doanh thu",
      },
    },
  };
  const optionmultis = {
    responsive: true,
    interaction: {
      mode: "index",
      intersect: false,
    },
    stacked: false,
    plugins: {
      title: {
        display: true,
        // text: "Chart.js Line Chart - Multi Axis",
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
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  const datamulti = {
    labels,
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

  const dataCourses = {
    labels,
    datasets: [
      {
        label: "Số khóa học",
        data: chartCourses,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return (
    <StyledOverviewWrapper className="main-content main-overview-content">
      <div className="overview-content">
        <div className="overview-title">
          <h2>Overview</h2>
        </div>
        <div className="metrics-content">
          <div className="overview-body">
            <div className="nav-overview-container">
              <ul className="nav-tabs">
                {name === "admin" ? (
                  <>
                    <li className="">
                      <div className="instructor-analytics">
                        <div>Tổng số giảng viên</div>
                        <div className="lg-text">{allInstructors}</div>
                      </div>
                    </li>
                    <li className="">
                      <div className="instructor-analytics">
                        <div>Tổng số học viên</div>
                        <div className="lg-text">{allStudents}</div>
                      </div>
                    </li>
                  </>
                ) : undefined}
                <li className="">
                  <div className="instructor-analytics">
                    <div>Khóa học của bạn</div>
                    <div className="lg-text">{allCoursesByInstructor}</div>
                  </div>
                </li>
              </ul>

              <Tabs defaultActiveKey="1">
                <TabPane
                  tab={
                    <div className="instructor-analytics">
                      <div>Tổng doanh thu</div>
                      <div className="lg-text">{totalRevenue}đ</div>
                      <div>{totalRevenueInMonth}đ tháng này</div>
                    </div>
                  }
                  key="1"
                >
                  <RevenueChart />
                </TabPane>
                <TabPane
                  tab={
                    <div className="instructor-analytics">
                      <div>Học viên</div>
                      <div className="lg-text">{totalStudents}</div>
                      <div>{numberOfStudentsInMonth} học viên tháng này</div>
                    </div>
                  }
                  key="2"
                >
                  <StudentChart />
                </TabPane>
                <TabPane
                  tab={
                    <div className="instructor-analytics">
                      <div>Đánh giá khóa học của bạn</div>
                      <div className="lg-text">
                        {Number.parseFloat(ratingCourses).toFixed(1)}
                      </div>
                      <div>{numberOfRatingsInMonth} đánh giá tháng này</div>
                    </div>
                  }
                  key="3"
                >
                  <div className="tab-content">
                    <div className="tab-pane">
                      <div className="instructor-analytics--chart">
                        <div className="instructor-analytics-message">
                          <div className="containerChart activeChart">
                            <Line options={optionmultis} data={datamulti} />
                          </div>
                        </div>
                      </div>
                      <div className="instructor-analytics--chart-footer">
                        <a href="">
                          <span>Revenue Report</span>
                          <i className="fas fa-chevron-right"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </TabPane>
                {name === "admin" ? (
                  <TabPane
                    tab={
                      <div className="instructor-analytics">
                        <div>Tổng số khóa học</div>
                        <div className="lg-text">{allCourses}</div>
                        <div>{allCoursesInMonth} khóa học tháng này</div>
                      </div>
                    }
                    key="4"
                  >
                    <div className="tab-content">
                      <div className="tab-pane">
                        <div className="instructor-analytics--chart">
                          <div className="instructor-analytics-message">
                            <div className="containerChart activeChart">
                              <Line options={options} data={dataCourses} />
                            </div>
                          </div>
                        </div>
                        <div className="instructor-analytics--chart-footer">
                          <a href="">
                            <span>Revenue Report</span>
                            <i className="fas fa-chevron-right"></i>
                          </a>
                        </div>
                      </div>
                    </div>
                  </TabPane>
                ) : undefined}
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </StyledOverviewWrapper>
  );
};
export default OverviewPage;
