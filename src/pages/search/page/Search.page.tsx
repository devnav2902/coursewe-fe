import { LoadingOutlined } from "@ant-design/icons";
import { Empty, Pagination, Row, Spin } from "antd";
import { memo, useEffect, useState } from "react";
import { MdFilterList } from "react-icons/md";
import { useSearchParams } from "react-router-dom";
import { CoursesByCategory } from "../../../api/categories.api";
import SearchApi from "../../../api/search.api";
import { ArrayCustomCourses } from "../../../components/Course/Course.component";
import { useAppDispatch, useTypedSelector } from "../../../hooks/redux.hooks";
import CourseCardLarge from "../component/CourseCardLarge.component";
import LoadingOverlay from "../component/LoadingOverlay.component";
import { StyledFilter } from "../styles/categories.styles";

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [filterLoading, setFilterLoading] = useState(false); // Sử dụng khi click filter
  const [coursesData, setCoursesData] = useState<CoursesByCategory>(); // Sử dụng khi click filter: ;
  // const {
  //   courses: { loaded: loadedCourses, data: coursesData },
  //   discoveryUnits: { loaded: loadedDiscoveryUnits, data: discoveryUnitsData },
  // } = useTypedSelector(({ categories }) => categories);

  const inputValue = searchParams.get("q") as string;
  const page = searchParams.get("page") as string;

  function onChangePage(page: number) {
    searchParams.set("page", page.toString());
    setSearchParams(searchParams);
  }

  useEffect(() => {
    setFilterLoading(true);
    SearchApi.getSearch(inputValue, page).then((res) => {
      setCoursesData(res.data.courses);
      setFilterLoading(false);
    });
  }, [page, inputValue]);

  return (
    <div className="main-categories">
      {/* first loading */}
      {!coursesData?.data ? (
        <div className="pd-2 d-flex justify-content-center">
          <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} />} />
        </div>
      ) : (
        <div className="main-categories__content">
          <div className="main-categories__main">
            <div className="category-page-container">
              {filterLoading && <LoadingOverlay />}
              <div
                className={`d-flex flex-column inner${
                  filterLoading ? " loading-pulse" : ""
                }`}
              >
                <div className="result-search ">
                  <h1>
                    {coursesData?.total} results for "{inputValue}"
                  </h1>
                </div>
                {!coursesData?.total ? (
                  <Row justify="center">
                    <Empty description="Hiện chưa có khóa học nào!" />
                  </Row>
                ) : (
                  <div className="courses">
                    {coursesData?.data.map((course) => (
                      <CourseCardLarge key={course.id} course={course} />
                    ))}
                  </div>
                )}

                {coursesData && coursesData.total > 0 && (
                  <Pagination
                    className="mt-auto ml-auto"
                    pageSize={coursesData.per_page}
                    current={coursesData.current_page}
                    onChange={onChangePage}
                    total={coursesData.total}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default memo(SearchPage);
