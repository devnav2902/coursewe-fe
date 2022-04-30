import { Col, Input, Row, Select } from "antd";
import { FC, useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import ReactQuill from "react-quill";
import InstructionalLevelApi from "../../../api/instructionalLevel.api";
import { ChildrenProps } from "../../../layouts/instructor-course.layout";
import { InstructionalLevel } from "../../../ts/types/course.types";
import CustomQuill from "../../../utils/quill";

const { Option } = Select;

const BasicsPage: FC<ChildrenProps> = ({ course, control }) => {
  const { title, description, instructional_level_id, subtitle } = course;

  const [instructionalLevelLoaded, setinstructionalLevelLoaded] =
    useState(false);
  const [instructionalLevel, setInstructionalLevel] = useState<
    InstructionalLevel[] | undefined
  >(undefined);

  useEffect(() => {
    !instructionalLevelLoaded &&
      InstructionalLevelApi.get().then((res) => {
        setInstructionalLevel(res.data.instructionalLevel);
        setinstructionalLevelLoaded(true);
      });
  }, [instructionalLevelLoaded]);

  return (
    <div className="edit-course-section">
      <div className="inner-column">
        <h6 className="">Thông tin khóa học</h6>
        <div className="edit-course-form">
          <div className="form-group">
            <label htmlFor="title">Tiêu đề khóa học</label>
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  defaultValue={title}
                  required
                  id="title"
                  showCount
                  maxLength={60}
                  placeholder="Nhập tiêu đề cho khóa học"
                />
              )}
            />
          </div>

          <div className="form-group">
            <label htmlFor="subtitle">Tóm tắt khóa học</label>
            <Controller
              name="subtitle"
              control={control}
              render={({ field }) => (
                <Input
                  defaultValue={subtitle}
                  id="subtitle"
                  {...field}
                  showCount
                  maxLength={120}
                  placeholder="Nhập tóm tắt cho khóa học"
                />
              )}
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Mô tả khóa học</label>
            <Controller
              control={control}
              name="description"
              render={({ field }) => (
                <ReactQuill
                  defaultValue={description}
                  onChange={(content, delta, source) => {
                    console.log(delta);
                    if (source === "user") {
                      field.onChange(content);
                    }
                  }}
                  theme="snow"
                  modules={CustomQuill.modules}
                  formats={CustomQuill.formats}
                />
              )}
            />
          </div>

          <div className="form-group">
            <label htmlFor="categories">Thông tin cơ bản</label>
            <Row gutter={16}>
              <Col span={8}>
                <Controller
                  name="instructional_level_id"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      defaultValue={instructional_level_id}
                      loading={!instructionalLevelLoaded}
                      options={instructionalLevel}
                      style={{ width: "100%" }}
                      fieldNames={{ label: "level", value: "id" }}
                    />
                  )}
                />
              </Col>
              <Col span={8}>
                <Select defaultValue="lucy" style={{ width: "100%" }}>
                  <Option value="lucy">IT & SOFTWARE</Option>
                </Select>
              </Col>
              <Col span={8}>
                <Select defaultValue="lucy" style={{ width: "100%" }}>
                  <Option value="lucy">Hardware</Option>
                </Select>
              </Col>
            </Row>
          </div>

          <div className="form-group">
            <label htmlFor="">Thông tin cá nhân</label>
            <div className="instructor-profile">
              <div className="instructor-profile__info">
                Tất cả các thông tin của giảng viên phải được điền đầy đủ trước
                khi khóa học được mở bán công khai. Bao gồm tên, hình ảnh, và
                giới thiệu ngắn tối thiểu 50 từ.
                <a href="{{ route('profile') }}">Tới trang profile.</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicsPage;
