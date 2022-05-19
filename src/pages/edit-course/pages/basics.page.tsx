import { Col, Input, Row, Select } from "antd";
import { FC, useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import ReactQuill from "react-quill";
import InstructionalLevelApi from "../../../api/instructionalLevel.api";
import { CourseResponse } from "../../../api/instructor.api";
import ErrorBanner from "../../../components/ErrorBanner/ErrorBanner.component";
import Loading from "../../../components/Loading/Loading.component";
import { useTypedSelector } from "../../../hooks/redux.hooks";
import { ChildrenProps } from "../../../layouts/instructor-course.layout";
import { InstructionalLevel } from "../../../ts/types/course.types";
import CustomQuill from "../../../utils/quill";
import Categories from "../components/basics/Categories.component";
import InstructorProfile from "../components/basics/InstructorProfile.component";

const BasicsPage: FC<ChildrenProps> = ({ formHandler }) => {
  const {
    control,
    formState: { errors },
  } = formHandler;

  const [instructionalLevelLoaded, setInstructionalLevelLoaded] =
    useState(false);
  const [instructionalLevel, setInstructionalLevel] = useState<
    InstructionalLevel[] | undefined
  >(undefined);

  const { data: course, loaded: loadedCourse } = useTypedSelector(
    (state) => state.instructorCourse.course
  );

  useEffect(() => {
    !instructionalLevelLoaded &&
      InstructionalLevelApi.get().then((res) => {
        setInstructionalLevel(res.data.instructionalLevel);
        setInstructionalLevelLoaded(true);
      });
  }, [instructionalLevelLoaded]);

  if (!loadedCourse) return <Loading />;

  const { title, description, instructional_level_id, subtitle } =
    course as CourseResponse;

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
            <ErrorBanner error={errors.description} />
          </div>

          <div className="form-group">
            <label htmlFor="">Thông tin cơ bản</label>
            <Row gutter={[16, 0]}>
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
              <Categories formHandler={formHandler} />
            </Row>
          </div>

          <div className="form-group">
            <label htmlFor="">Thông tin giảng viên</label>
            <InstructorProfile />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicsPage;
