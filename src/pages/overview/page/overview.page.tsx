import { Tabs } from "antd";
import { Chart as ChartJS, registerables } from "chart.js";
import { useEffect, useState } from "react";
import OverviewApi from "../../../api/overview.api";
import { useTypedSelector } from "../../../hooks/redux.hooks";
import AmountCoursesByCategoryChart from "../components/AmountCoursesByCategoryChart.component";
import RevenueChart from "../components/RevenueChart.component";
import StudentChart from "../components/StudentChart.component";
import { StyledOverviewWrapper } from "../styles/overview.styles";
const { TabPane } = Tabs;
const OverviewPage = () => {
  const { profile } = useTypedSelector((state) => state.user);

  const [overview, setOverview] = useState(null);

  useEffect(() => {
    OverviewApi.getOverview().then((res) => {
      setOverview(res.data);
    });
  }, []);

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
    allCoursesInMonth,
    allCoursesByInstructor,
  } = overview;

  ChartJS.register(...registerables);

  return (
    <StyledOverviewWrapper className="main-content main-overview-content">
      <div className="overview-content">
        <div className="overview-title">
          <h2>Tổng quan</h2>
        </div>
        <div className="metrics-content">
          <div className="overview-body">
            <div className="nav-overview-container">
              <ul className="nav-tabs">
                {profile?.role.name === "admin" ? (
                  <>
                    <li className="">
                      <div className="instructor-analytics">
                        <div>Tổng số giảng viên</div>
                        <div className="lg-text">{allInstructors}</div>
                      </div>
                    </li>
                  </>
                ) : (
                  <li className="">
                    <div className="instructor-analytics">
                      <div>Khóa học của bạn</div>
                      <div className="lg-text">{allCoursesByInstructor}</div>
                    </div>
                  </li>
                )}
              </ul>

              <Tabs defaultActiveKey="1">
                {profile?.role.name === "admin" ? (
                  <TabPane
                    tab={
                      <div className="instructor-analytics">
                        <div>Tổng số khóa học</div>
                        <div className="lg-text">{allCourses}</div>
                        <div>{allCoursesInMonth} khóa học tháng này</div>
                      </div>
                    }
                    key={"courses"}
                  >
                    <AmountCoursesByCategoryChart />
                  </TabPane>
                ) : (
                  <TabPane
                    tab={
                      <div className="instructor-analytics">
                        <div>Tổng doanh thu</div>
                        <div className="lg-text">{totalRevenue} VNĐ</div>
                        <div>{totalRevenueInMonth} VNĐ tháng này</div>
                      </div>
                    }
                    key="revenue"
                  >
                    <RevenueChart />
                  </TabPane>
                )}
                <TabPane
                  tab={
                    <div className="instructor-analytics">
                      <div>Học viên</div>
                      <div className="lg-text">{totalStudents}</div>
                      <div>{numberOfStudentsInMonth} học viên tháng này</div>
                    </div>
                  }
                  key={"students"}
                >
                  <StudentChart />
                </TabPane>
                {profile?.role.name === "user" && (
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
                    key={"rating"}
                  ></TabPane>
                )}
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </StyledOverviewWrapper>
  );
};
export default OverviewPage;
