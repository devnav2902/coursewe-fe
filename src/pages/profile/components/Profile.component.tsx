import { LoadingOutlined } from "@ant-design/icons";
import { Col, Input, Row, Spin } from "antd";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { Controller, FieldValues, useForm } from "react-hook-form";
import ReactQuill from "react-quill";
import ProfileApi from "../../../api/profile.api";
import ErrorBanner from "../../../components/ErrorBanner/ErrorBanner.component";
import Loading from "../../../components/Loading/Loading.component";
import { useTypedSelector } from "../../../hooks/redux.hooks";
import { User } from "../../../ts/types/user.types";
import { openNotification } from "../../../utils/functions";
import CustomQuill from "../../../utils/quill";

const Profile = () => {
  const { profile, loaded } = useTypedSelector((state) => state.user);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
    setError,
  } = useForm();

  const [valueChanged, setValueChanged] = useState<boolean>(false); // trigger button save
  const [saving, setSaving] = useState<boolean>(false);

  const handleValueChanged = useCallback((boolValue) => {
    setValueChanged(boolValue);
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      !valueChanged && handleValueChanged(true);
      console.log(value, name, type);
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [handleValueChanged, watch, valueChanged]);

  if (!loaded) return <Loading />;

  const {
    fullname,
    facebook,
    headline,
    linkedin,
    youtube,
    twitter,
    website,
    bio,
  } = profile as User;

  function onSubmit(data: FieldValues) {
    setSaving(true);
    ProfileApi.updateProfile(data)
      .then((res) => {
        setSaving(false);
        handleValueChanged(false);
        openNotification("success");
      })
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          const { errors } = error.response?.data;
          for (const key in errors) {
            const element = errors[key];
            setError(key, { message: element.at(-1) });
          }
          setSaving(false);
          handleValueChanged(false);
          openNotification("error", "Lỗi trong quá trình lưu thông tin");
        }
      });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Row gutter={[20, 20]}>
        <Col span={12}>
          <div className="form-group">
            <div className="group">
              <label htmlFor="">Tên của bạn</label>
              <Controller
                control={control}
                name="fullname"
                render={({ field }) => (
                  <Input
                    defaultValue={fullname}
                    className="custom-input"
                    {...field}
                  />
                )}
              />
              <ErrorBanner error={errors.fullname} />
            </div>
            <div className="group">
              <label htmlFor="">Nơi làm việc</label>
              <Controller
                control={control}
                name="headline"
                render={({ field }) => (
                  <Input
                    defaultValue={headline}
                    className="custom-input"
                    {...field}
                  />
                )}
              />
            </div>
            <div className="group">
              <label htmlFor="bio">Giới thiệu</label>
              <Controller
                control={control}
                name="bio"
                render={({ field }) => (
                  <ReactQuill
                    defaultValue={bio}
                    onChange={(content, delta, source, editor) => {
                      if (source === "user") field.onChange(content);
                    }}
                    id="bio"
                    theme="snow"
                    modules={CustomQuill.modules}
                    formats={CustomQuill.formats}
                  />
                )}
              />
              <ErrorBanner error={errors.bio} />
            </div>
          </div>
        </Col>
        <Col span={12}>
          <div className="form-group">
            <div className="group">
              <label htmlFor="">Website</label>
              <Controller
                control={control}
                name="website"
                render={({ field }) => (
                  <Input
                    defaultValue={website}
                    className="custom-input"
                    placeholder="URL"
                    {...field}
                  />
                )}
              />
              <ErrorBanner error={errors.website} />
            </div>
            <div className="group">
              <label htmlFor="">Linkedin</label>
              <Controller
                control={control}
                name="linkedin"
                render={({ field }) => (
                  <Input
                    defaultValue={linkedin}
                    addonBefore="http://www.linkedin.com/"
                    placeholder="Resource ID"
                    className="custom-input"
                    {...field}
                  />
                )}
              />
            </div>
            <div className="group">
              <label htmlFor="">Youtube</label>
              <Controller
                control={control}
                name="youtube"
                render={({ field }) => (
                  <Input
                    defaultValue={youtube}
                    addonBefore="http://www.youtube.com/"
                    placeholder="Username"
                    className="custom-input"
                    {...field}
                  />
                )}
              />
            </div>
            <div className="group">
              <label htmlFor="twitter">Twitter</label>
              <Controller
                control={control}
                name="twitter"
                render={({ field }) => (
                  <Input
                    defaultValue={twitter}
                    id="twitter"
                    addonBefore="http://www.twitter.com/"
                    placeholder="Username"
                    className="custom-input"
                    {...field}
                  />
                )}
              />
            </div>
            <div className="group">
              <label htmlFor="">Facebook</label>
              <Controller
                control={control}
                name="facebook"
                render={({ field }) => (
                  <Input
                    defaultValue={facebook}
                    addonBefore="http://www.facebook.com/"
                    placeholder="Username"
                    className="custom-input"
                    {...field}
                  />
                )}
              />
            </div>
          </div>
        </Col>
      </Row>

      <button
        className="btn-primary"
        disabled={saving ? true : valueChanged ? false : true}
        type="submit"
      >
        {saving && (
          <Spin
            indicator={
              <LoadingOutlined style={{ color: "#fff" }} className="mr-1" />
            }
          />
        )}
        <span>Lưu thông tin</span>
      </button>
    </form>
  );
};

export default Profile;
