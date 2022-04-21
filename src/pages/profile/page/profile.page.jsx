import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ProfileApi from "../../../api/profile.api";
import { Upload, message, Modal, Button } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import InputProfile from "../../../components/Input/inputprofile.component";
import { BE_URL } from "../../../utils/constants";
import { useParams } from "react-router-dom";
import Input from "../../../components/Input/Input.component";
import ReactQuill from "react-quill";
import { Controller } from "react-hook-form";
import CustomQuill from "../../../utils/quill";
import { linkThumbnail } from "../../../utils/functions";
const ProfilePage = ({ register, control }) => {
  const {
    profile: { avatar, created_at, fullname },
  } = useSelector((state) => state.user);
  // console.log(profile);

  const [userBio, setUserBio] = useState(null);
  const [uploadAvatar, setUploadAvatar] = useState(null);
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState({
    previewVisible: false,
    previewImage: "",
    previewTitle: "",
    fileList: [
      {
        uid: "-1",
        name: "image.png",
        status: "done",
        url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
      },
    ],
  });

  function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle:
        file.name || file.url.substring(file.url.lastIndexOf("/") + 1),
    });
  };
  const handleCancel = () => setState({ previewVisible: false });

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  const { previewVisible, previewImage, fileList, previewTitle } = state;

  return (
    <div className="profile-page">
      <div className="profile-banner transparent-bgr">
        <div className="banner-wrap">
          <div className="title">Profile & settings</div>
        </div>
      </div>
      <div className="profile-main">
        <div className="main-wrap">
          <div className="bar">
            <div className="user">
              <div className="edit-avatar">
                <Controller
                  control={control}
                  name="image"
                  render={({ field }) => (
                    <Upload
                      accept=".png, .jpg, .jpeg"
                      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                      listType="picture-card"
                      maxCount={1}
                      beforeUpload={() => false}
                      showUploadList={{ showRemoveIcon: false }}
                      defaultFileList={[
                        {
                          uid: "1",
                          name: avatar,
                          url: linkThumbnail(avatar),
                        },
                      ]}
                      onPreview={handlePreview}
                      {...field}
                      // onChange={field.onChange(handleOnChange)}
                    >
                      {uploadButton}
                    </Upload>
                  )}
                />
                <Modal
                  visible={previewVisible}
                  title={previewTitle}
                  footer={null}
                  onCancel={handleCancel}
                >
                  <img
                    alt="example"
                    style={{ width: "100%" }}
                    src={previewImage}
                  />
                </Modal>
              </div>

              <div className="meta">
                <span id="name">{fullname}</span>
                <span id="create_at">Ngày tạo: {created_at}</span>
              </div>
            </div>
          </div>

          <div className="form">
            <form
              action="{{ route('saveProfile') }}"
              method="POST"
              className="form-profile"
            >
              <div className="title">Profile</div>
              <div className="form-group">
                <div className="group">
                  <Input
                    label={"Tên của bạn"}
                    type={"text"}
                    register={register}
                    name="fullname"
                  />
                </div>
              </div>
            </form>
            <form
              action="{{ route('changePassword') }}"
              method="POST"
              className="form-profile"
            >
              {/* @csrf */}
              <div className="title">Đổi mật khẩu</div>
              <div className="form-group">
                <div className="group">
                  <Input
                    label={"Mật khẩu cũ"}
                    type={"password"}
                    name="old_password"
                    register={register}
                  />
                </div>
                <div className="group">
                  <Input
                    label={"Mật khẩu mới"}
                    type={"text"}
                    name="new_password"
                    register={register}
                  />
                </div>
              </div>
            </form>
            <form
              action="{{ route('changeBio') }}"
              method="POST"
              className="form-profile"
            >
              {/* @csrf */}
              <div className="title">Devco Profile</div>
              <div className="form-group">
                <div className="group">
                  <Input
                    label={"Headline"}
                    type={"text"}
                    name="headline"
                    register={register}
                  />
                </div>
                <div class="group">
                  <label for="bio">Giới thiệu</label>

                  <Controller
                    control={control}
                    name="bio"
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

                  {/* @error('bio')
                  <div class="message">{{ $message }}</div>
                  @enderror */}
                </div>
                <div className="group">
                  {/* <label for="website">Website</label> */}
                  {/* <input type="text" id="website" name="website" placeholder=""
              value="{{ isset($globalUser->bio->website) ? $globalUser->bio->website : old('website') }}"
              > */}
                  <Input
                    label={"Website"}
                    type={"text"}
                    name="website"
                    register={register}
                  />
                  {/* @error('new_password')
                  <div class=" message">{{ $message }}</div>
                  @enderror */}
                </div>
                <div className="group">
                  {/* <label for="linkedIn">LinkedIn</label> */}
                  {/* <input type="text" id="linkedIn" 
            class="@error('linkedin') is-invalid @enderror" name=" linkedIn"
              placeholder=""
              value="{{ isset($globalUser->bio->linkedin) ? $globalUser->bio->linkedin : old('linkedin') }}"
              > */}
                  <Input
                    label={"LinkedIn"}
                    type={"text"}
                    name={"linkedin"}
                    register={register}
                  />
                  {/* @error('linkedin')
                  <div class="message">{{ $message }}</div>
                  @enderror */}
                </div>
                <div class="group">
                  {/* <label for="youtube">Youtube</label> */}
                  {/* <input type="text" id="youtube" class="@error('youtube') is-invalid @enderror" name="youtube" placeholder=""
              value="{{ isset($globalUser->bio->youtube) ? $globalUser->bio->youtube : old('youtube') }}"> */}
                  <Input
                    label={"Youtube"}
                    type={"text"}
                    name={"youtube"}
                    register={register}
                  />
                </div>
                <div className="group">
                  <Input
                    label={"Twitter"}
                    type={"text"}
                    name={"twitter"}
                    register={register}
                  />
                </div>
                <div className="group">
                  <Input
                    label={"Facebook"}
                    type={"text"}
                    name={"facebook"}
                    register={register}
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProfilePage;
