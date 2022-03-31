import { FilePond, File, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import { useState } from "react";
import ReactQuill from "react-quill";
import { Col, Input, Row } from "antd";
import { Select } from "antd";

registerPlugin(FilePondPluginImagePreview);
const { Option } = Select;

const BasicsPage = ({ course }) => {
  const { title, description, video_demo, thumbnail } = course;
  const [descriptionState, setDescription] = useState(description);

  return (
    <div className="edit-course-section">
      <form method="POST" id="form-course" action="">
        <div className="inner-column">
          <h6 className="">Thông tin khóa học</h6>
          <div className="edit-course-form">
            <div className="form-group">
              <label htmlFor="title">Tiêu đề khóa học</label>
              <Input
                id="title"
                showCount
                maxLength={60}
                value={title}
                placeholder="Nhập tiêu đề cho khóa học"
                name="title"
              />
            </div>

            <div className="form-group">
              <label htmlFor="subtitle">Tóm tắt khóa học</label>
              <Input
                id="subtitle"
                name="subtitle"
                showCount
                maxLength={120}
                placeholder="Nhập tóm tắt cho khóa học"
                // value={title}
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Mô tả khóa học</label>
              <ReactQuill
                theme="snow"
                value={descriptionState}
                onChange={setDescription}
              />
            </div>

            <div className="form-group">
              <label htmlFor="categories">Thông tin cơ bản</label>
              <Row gutter={16}>
                <Col span={8}>
                  <Select defaultValue="lucy" style={{ width: "100%" }}>
                    <Option value="lucy">Người mới bắt đầu</Option>
                  </Select>
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

              {/* <div className="category-box">
                <select name="category[]" id="" multiple className="cat-multi">
                  @foreach ($categories as $category)
                    <option value="{{ $category->id }}" @if (isset($category->selected))
                      selected
                  @endif>
                  {{ $category->title }}</option>
                  @endforeach
                </select>
              </div> */}
            </div>

            <Row gutter={16}>
              <Col span={12}>
                <div className="form-group">
                  <label
                    htmlFor="thumbnail"
                    id="label-thumbnail"
                    data-course="{{ $course->id }}"
                  >
                    Hình ảnh khóa học
                  </label>
                  {/* <input type="image" name="thumbnail" id="thumbnail" /> */}

                  <FilePond
                    files={[
                      {
                        source: thumbnail,
                      },
                    ]}
                    accept="image/png, image/jpeg"
                    // onupdatefiles={setFiles}
                    allowMultiple={false}
                    maxFiles={3}
                    // server="/api"
                    name="files"
                    labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
                  />

                  {/* @if (!empty($course->thumbnail))
                <div className="gallery">
                  <div className="image-item">
                    <img title="thumbnail post" src="{{ asset($course->thumbnail) }}" alt="Không tìm thấy hình này!" />
                  </div>
                </div>
              @endif */}
                </div>
              </Col>
              <Col span={12}>
                <div className="form-group">
                  <label htmlFor="demo-video-url">Video giới thiệu</label>
                  <FilePond
                    files={[
                      {
                        source: video_demo,
                      },
                    ]}
                    accept="image/png, image/jpeg"
                    // onupdatefiles={setFiles}
                    allowMultiple={false}
                    maxFiles={3}
                    // server="/api"
                    name="video_demo"
                    labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
                  />
                </div>
              </Col>
            </Row>

            <div className="form-group">
              <label htmlFor="">Thông tin cá nhân</label>
              <div className="instructor-profile">
                <div className="instructor-profile__info">
                  Tất cả các thông tin của giảng viên phải được điền đầy đủ
                  trước khi khóa học được mở bán công khai. Bao gồm tên, hình
                  ảnh, và giới thiệu ngắn tối thiểu 50 từ.
                  <a href="{{ route('profile') }}">Tới trang profile.</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default BasicsPage;
