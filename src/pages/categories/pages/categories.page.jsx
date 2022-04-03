import { Radio, Row, Checkbox, Collapse } from "antd";
import React from "react";
import { Link, useParams } from "react-router-dom";
import Rating from "../../../components/Rating/Rating.component";
import { routesWithParams } from "../../../utils/constants";

import { Select } from "antd";
import CourseCardLarge from "../components/CourseCardLarge.component";

const { Panel } = Collapse;
const { Option } = Select;

const CategoriesPage = () => {
  const params = useParams();
  console.log(params);
  return (
    <div class="main-categories">
      <div class="main-categories__content">
        <div class="left-side">
          <div class="categories-box">
            <div className="categories-filter">
              <div className="filter-item">
                <div className="filter-item__content">
                  <Collapse
                    defaultActiveKey={["1"]}
                    expandIconPosition="right"
                    bordered={false}
                  >
                    <Panel header={<b>Đánh giá</b>} key="1">
                      <Radio value={1}>
                        <Rating value={4.5} size={"13px"} />
                        4.5 trở lên
                        <span className="amount">(446)</span>
                      </Radio>
                      <Radio value={1}>
                        <Rating value={4} size={"13px"} />
                        4.0 trở lên
                        <span className="amount">(446)</span>
                      </Radio>
                      <Radio value={1}>
                        <Rating value={3.5} size={"13px"} />
                        3.5 trở lên
                        <span className="amount">(446)</span>
                      </Radio>
                      <Radio value={1}>
                        <Rating value={3} size={"13px"} />
                        3.0 trở lên
                        <span className="amount">(446)</span>
                      </Radio>
                    </Panel>
                  </Collapse>
                </div>
              </div>
              <div className="filter-item">
                <div className="filter-item__content">
                  <Collapse
                    defaultActiveKey={["1"]}
                    expandIconPosition="right"
                    bordered={false}
                  >
                    <Panel header={<b>Chủ đề</b>} key="1">
                      <Checkbox>
                        Javascript <span className="amount">(223)</span>
                      </Checkbox>
                      <Checkbox>
                        HTML/CSS <span className="amount">(23)</span>
                      </Checkbox>
                      <Checkbox>
                        REACTJS <span className="amount">(14)</span>
                      </Checkbox>
                      <Checkbox>
                        LARAVEL <span className="amount">(22)</span>
                      </Checkbox>
                    </Panel>
                  </Collapse>
                </div>
              </div>
              <div className="filter-item">
                <div className="filter-item__content">
                  <Collapse
                    defaultActiveKey={["1"]}
                    expandIconPosition="right"
                    bordered={false}
                  >
                    <Panel header={<b>Danh mục</b>} key="1">
                      <Checkbox>
                        Lập trình web <span className="amount">(223)</span>
                      </Checkbox>
                      <Checkbox>
                        Data science <span className="amount">(23)</span>
                      </Checkbox>
                      <Checkbox>
                        Game development <span className="amount">(14)</span>
                      </Checkbox>
                      <Checkbox>
                        Software engineering{" "}
                        <span className="amount">(22)</span>
                      </Checkbox>
                    </Panel>
                  </Collapse>
                </div>
              </div>
              <div className="filter-item">
                <div className="filter-item__content">
                  <Collapse
                    defaultActiveKey={["1"]}
                    expandIconPosition="right"
                    bordered={false}
                  >
                    <Panel header={<b>Cấp độ</b>} key="1">
                      <Checkbox>
                        Tất cả cấp độ <span className="amount">(223)</span>
                      </Checkbox>
                      <Checkbox>
                        Beginner <span className="amount">(23)</span>
                      </Checkbox>
                      <Checkbox>
                        Intermediate <span className="amount">(14)</span>
                      </Checkbox>
                      <Checkbox>
                        Expert <span className="amount">(22)</span>
                      </Checkbox>
                    </Panel>
                  </Collapse>
                </div>
              </div>
              <div className="filter-item">
                <div className="filter-item__content">
                  <Collapse
                    defaultActiveKey={["1"]}
                    expandIconPosition="right"
                    bordered={false}
                  >
                    <Panel header={<b>Giá bán</b>} key="1">
                      <Checkbox>
                        Trả phí <span className="amount">(14)</span>
                      </Checkbox>
                      <Checkbox>
                        Miễn phí <span className="amount">(22)</span>
                      </Checkbox>
                    </Panel>
                  </Collapse>
                </div>
              </div>
            </div>
            <div class="categories">
              {/* @foreach ($categories as $category)
                      <a href="{{ route('category', ['url' => $category->slug]) }}" class="">
                          {{ $category->title }}
                      </a>
                  @endforeach */}
            </div>
          </div>
        </div>

        <div class="category-page-container">
          <div class="sec-title">{/* <h2>{{ $breadcrumb }}</h2> */}</div>
          <div class="all-courses">
            {Array.from({ length: 10 }).map((course) => (
              <CourseCardLarge />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoriesPage;
