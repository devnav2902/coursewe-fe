import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import { Col, Form, Input, Row } from "antd";
import { Select } from "antd";
import InstructionalLevelApi from "../../../api/instructionalLevel.api";
import { useForm, Controller } from "react-hook-form";
import CustomQuill from "../../../utils/quill";
import { Upload, message } from "antd";
import { FileImageOutlined, VideoCameraOutlined } from "@ant-design/icons";
import CourseApi from "../../../api/course.api";
import axios from "axios";

const { Option } = Select;
const { Dragger } = Upload;

const BasicsPage = ({
  course,
  triggerSubmit,
  setTriggerSubmit,
  handleValueChanged,
  valueChanged,
  resetState,
  watch,
  control,
  register,
  setValue,
}) => {
  const {
    title,
    description,
    video_demo,
    thumbnail,
    instructional_level_id,
    subtitle,
    id,
  } = course;

  const [instructionalLevelLoaded, setinstructionalLevelLoaded] =
    useState(false);
  const [instructionalLevel, setInstructionalLevel] = useState(null);

  useEffect(() => {
    !instructionalLevelLoaded &&
      InstructionalLevelApi.get().then((res) => {
        setInstructionalLevel(res.data.instructionalLevel);
        setinstructionalLevelLoaded(true);
      });
  }, [instructionalLevelLoaded]);

  const beforeUpload = () => false;
  const propsFileUpload = {
    multiple: false,
    maxCount: 1,
    beforeUpload,
  };

  return (
    <div className="edit-course-section">
      <div className="inner-column">
        <h6 className="">Thông tin khóa học</h6>
        <div className="edit-course-form">
          <div className="form-group">
            <label htmlFor="title">Tiêu đề khóa học</label>
            <Controller
              name="title"
              defaultValue={title}
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
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
              defaultValue={subtitle}
              control={control}
              render={({ field }) => (
                <Input
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
              defaultValue={description}
              render={({ field }) => (
                <ReactQuill
                  {...field}
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
          </div>

          <div className="form-group">
            <label htmlFor="categories">Thông tin cơ bản</label>
            <Row gutter={16}>
              <Col span={8}>
                <Controller
                  name="instructional_level_id"
                  control={control}
                  defaultValue={instructional_level_id}
                  render={({ field }) => (
                    <Select
                      {...field}
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

          <Row gutter={26}>
            <Col span={12}>
              <div className="form-group">
                <label htmlFor="thumbnail">Hình ảnh khóa học</label>

                <Controller
                  name="thumbnail"
                  control={control}
                  render={({ field }) => (
                    <Dragger
                      {...propsFileUpload}
                      {...field}
                      onChange={(file) => {
                        setValue("thumbnail", file.file);
                      }}
                      accept="image/*"
                      defaultFileList={[
                        { thumbUrl: thumbnail, name: thumbnail },
                      ]}
                    >
                      <p className="ant-upload-drag-icon">
                        <FileImageOutlined />
                      </p>
                      <p className="ant-upload-text">
                        Click hoặc kéo thả hình ảnh khóa học tại đây
                      </p>
                    </Dragger>
                  )}
                />
              </div>
            </Col>
            <Col span={12}>
              <div className="form-group">
                <label htmlFor="demo-video-url">Video giới thiệu</label>

                <Controller
                  name="video_demo"
                  control={control}
                  render={({ field }) => (
                    <Dragger
                      beforeUpload={(file) => beforeUpload(file, "video_demo")}
                      {...propsFileUpload}
                      {...field}
                      accept="video/*"
                      defaultFileList={[{ name: video_demo }]}
                    >
                      <p className="ant-upload-drag-icon">
                        <VideoCameraOutlined />
                      </p>
                      <p className="ant-upload-text">
                        Click hoặc kéo thả video giới thiệu khóa học tại đây
                      </p>
                    </Dragger>
                  )}
                />
              </div>
            </Col>
          </Row>

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
