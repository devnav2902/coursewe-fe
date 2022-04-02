import React, { useEffect, useState } from "react";
import OverviewApi from "../../../api/overview.api";
import { useSelector } from "react-redux";
import SideBarOverview from "../../../components/SideBarOverview/SideBarOverview.component";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import ChartApi from "../../../api/chart.api";
import { Spin, Tabs } from "antd";
const { TabPane } = Tabs;
const OverviewPage = () => {
  const {
    profile: {
      role: { name },
    },
  } = useSelector((state) => state.user);
  const [loadedRevenue, setLoadedRevenue] = useState(false);
  const [loadedEnrollments, setLoadedEnrollments] = useState(false);
  const [loadedRating, setLoadedRating] = useState(false);
  const [loadedCourses, setLoadedCourses] = useState(false);

  const [overview, setOverview] = useState(null);
  const [chartRenevue, setChartRenevue] = useState([]);
  const [chartEnrollments, setChartEnrollments] = useState([]);
  const [chartRating, setChartRating] = useState([]);
  const [chartCourses, setChartCourses] = useState([]);

  useEffect(() => {
    OverviewApi.getOverview().then((res) => {
      setOverview(res.data);
    });
    const year = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;

    ChartApi.getRevenue(year, currentMonth).then((res) => {
      const {
        data: { chartData },
      } = res;
      setChartRenevue(chartData);
      setLoadedRevenue(true);
    });
    ChartApi.getEnrollments(year, currentMonth).then((res) => {
      const {
        data: { chartEnrollments },
      } = res;
      setChartEnrollments(chartEnrollments);
      setLoadedEnrollments(true);
    });
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
  if (!loadedRevenue) return null;
  if (!loadedEnrollments) return null;
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

  const dataRenevue = {
    labels,
    datasets: [
      {
        label: "Doanh thu",
        data: chartRenevue,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  const dataEnrollments = {
    labels,
    datasets: [
      {
        label: "Học viên đã đăng ký",
        data: chartEnrollments,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
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
    <div className="main-content main-overview-content">
      <div className="overview-container">
        <div className="overview-content">
          <div className="overview-title">
            <h2>Overview</h2>
          </div>
          <div className="metrics-content">
            <div className="overview-body">
              <div className="top-metrics">
                <div className="nav-overview-container">
                  <ul className="nav-tabs">
                    {name === "admin" ? (
                      <div className="overview_admin">
                        <li className="">
                          <button className="">
                            <div className="instructor-analytics--metrics-data">
                              <div>
                                <div className="text-midnight-lighter">
                                  Tổng số giảng viên
                                </div>
                                <div className="text-midnight">
                                  {allInstructors}
                                </div>
                              </div>
                            </div>
                          </button>
                        </li>
                        <li className="">
                          <button className="">
                            <div className="instructor-analytics--metrics-data">
                              <div>
                                <div className="text-midnight-lighter">
                                  Tổng số học viên
                                </div>
                                <div className="text-midnight">
                                  {allStudents}
                                </div>
                              </div>
                            </div>
                          </button>
                        </li>
                      </div>
                    ) : undefined}
                    <li className="">
                      <button className="">
                        <div className="instructor-analytics--metrics-data">
                          <div>
                            <div className="text-midnight-lighter">
                              Khóa học của bạn
                            </div>
                            <div className="text-midnight">
                              {allCoursesByInstructor}
                            </div>
                          </div>
                        </div>
                      </button>
                    </li>
                  </ul>
                  <ul className=" nav-tabs">
                    <Tabs defaultActiveKey="1">
                      <TabPane
                        tab={
                          <li
                            className="overview-item overview-active"
                            data-chart="revenueChart"
                          >
                            <button>
                              <div className="instructor-analytics--metrics-data">
                                <div>
                                  <div className="text-midnight-lighter">
                                    Tổng doanh thu
                                  </div>
                                  <div className="text-midnight">
                                    {totalRevenue}$
                                  </div>
                                  <div className="text-midnight-lighter">
                                    {totalRevenueInMonth}$ trong tháng này
                                  </div>
                                </div>
                              </div>
                            </button>
                          </li>
                        }
                        key="1"
                      >
                        <div className="tab-content">
                          <div className="tab-pane">
                            <div className="instructor-analytics--chart">
                              <div className="instructor-analytics-message">
                                <div className="containerChart  activeChart">
                                  <Line options={options} data={dataRenevue} />
                                </div>

                                {/* {{-- @endif --}} */}
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
                      <TabPane
                        tab={
                          <li
                            className="overview-item"
                            data-chart="enrollmentsChart"
                          >
                            <button>
                              <div className="instructor-analytics--metrics-data">
                                <div>
                                  <div className="text-midnight-lighter">
                                    Học viên
                                  </div>
                                  <div className="text-midnight">
                                    {totalStudents}
                                  </div>
                                  <div className="text-midnight-lighter">
                                    {numberOfStudentsInMonth} trong tháng này
                                  </div>
                                </div>
                              </div>
                            </button>
                          </li>
                        }
                        key="2"
                      >
                        <div className="tab-content">
                          <div className="tab-pane">
                            <div className="instructor-analytics--chart">
                              <div className="instructor-analytics-message">
                                <div className="containerChart activeChart">
                                  <Line
                                    options={options}
                                    data={dataEnrollments}
                                  />
                                </div>

                                {/* {{-- @endif --}} */}
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
                      <TabPane
                        tab={
                          <li
                            className="overview-item"
                            data-chart="ratingChart"
                          >
                            <button>
                              <div className="instructor-analytics--metrics-data">
                                <div>
                                  <div className="text-midnight-lighter">
                                    Đánh giá khóa học của bạn
                                  </div>
                                  <div className="text-midnight">
                                    {Number.parseFloat(ratingCourses).toFixed(
                                      1
                                    )}
                                  </div>
                                  <div className="text-midnight-lighter">
                                    {numberOfRatingsInMonth} đánh giá trong
                                    tháng này
                                  </div>
                                </div>
                              </div>
                            </button>
                          </li>
                        }
                        key="3"
                      >
                        <div className="tab-content">
                          <div className="tab-pane">
                            <div className="instructor-analytics--chart">
                              <div className="instructor-analytics-message">
                                <div className="containerChart activeChart">
                                  <Line
                                    options={optionmultis}
                                    data={datamulti}
                                  />
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
                            <li
                              className="overview-item"
                              data-chart="coursesChart"
                            >
                              <button>
                                <div className="instructor-analytics--metrics-data">
                                  <div>
                                    <div className="text-midnight-lighter">
                                      Tổng số khóa học
                                    </div>
                                    <div className="text-midnight">
                                      {allCourses}
                                    </div>
                                    <div className="text-midnight-lighter">
                                      {allCoursesInMonth} trong tháng này
                                    </div>
                                  </div>
                                </div>
                              </button>
                            </li>
                          }
                          key="4"
                        >
                          <div className="tab-content">
                            <div className="tab-pane">
                              <div className="instructor-analytics--chart">
                                <div className="instructor-analytics-message">
                                  <div className="containerChart activeChart">
                                    <Line
                                      options={options}
                                      data={dataCourses}
                                    />
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
                  </ul>
                </div>
              </div>

              {/* <div className="tab-content">
                      <div className="tab-pane">
                        <div className="instructor-analytics--chart">
                          <div className="instructor-analytics-message">
                            <div className="containerChart  ">
                              <Line options={options} data={data} />
                            </div>
                            <div className="containerChart ">
                              <Line options={options} data={data} />
                            </div>
                            <div className="containerChart activeChart">
                              <Line options={optionmultis} data={datamulti} />
                            </div>
                            <div className="containerChart ">
                              <Line options={options} data={data} />
                            </div>
                            <div className="containerChart">
                              <canvas id="instructorChart"></canvas>
                            </div>
                            <div className="containerChart">
                              <canvas id="studentChart"></canvas>
                            </div>
                            {{-- @endif --}}
                          </div>
                        </div>
                        <div className="instructor-analytics--chart-footer">
                          <a href="">
                            <span>Revenue Report</span>
                            <i className="fas fa-chevron-right"></i>
                          </a>
                        </div>
                      </div>
                    </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default OverviewPage;
