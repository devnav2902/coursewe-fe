import { LoadingOutlined } from "@ant-design/icons";
import { Empty, Pagination, Row, Spin } from "antd";
import { memo, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { CoursesByCategory } from "../../../api/categories.api";
import SearchApi from "../../../api/search.api";
import CourseCardLarge from "../../categories/components/CourseCardLarge.component";
import LoadingOverlay from "../../categories/components/LoadingOverlay.component";

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [filterLoading, setFilterLoading] = useState(false);
  const [coursesData, setCoursesData] = useState<CoursesByCategory>();

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
      {filterLoading ? (
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
                    {coursesData?.total} kết quả tìm kiếm cho từ khóa "
                    {inputValue}"
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

                {coursesData && (
                  <Pagination
                    className="mt-auto ml-auto"
                    pageSize={coursesData.per_page}
                    current={coursesData.current_page}
                    onChange={onChangePage}
                    total={coursesData.total}
                    showSizeChanger={false}
                    hideOnSinglePage
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
