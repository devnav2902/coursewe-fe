import { PlusOutlined } from "@ant-design/icons";
import { Modal, Upload } from "antd";
import { UploadFile } from "antd/lib/upload/interface";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Loading from "../../../components/Loading/Loading.component";
import { useTypedSelector } from "../../../hooks/redux.hooks";
import { User } from "../../../ts/types/user.types";
import { linkThumbnail } from "../../../utils/functions";

const Picture = () => {
  const { control } = useForm();
  const { profile, loaded } = useTypedSelector((state) => state.user);

  const [state, setState] = useState({
    previewVisible: false,
    previewImage: "",
    previewTitle: "",
  });

  function getBase64(file: File) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      const base64 =
        file.originFileObj && ((await getBase64(file.originFileObj)) as string);

      file.preview = base64;
    }

    setState((state) => ({
      ...state,
      previewImage: (file.url as string) || (file.preview as string),
      previewVisible: true,
      previewTitle:
        file.name ||
        (file?.url?.substring(file.url.lastIndexOf("/") + 1) as string),
    }));
  };
  const handleCancel = () =>
    setState((state) => ({ ...state, previewVisible: false }));

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  const { previewVisible, previewImage, previewTitle } = state;

  if (!loaded) return <Loading />;
  const { avatar } = profile as User;

  return (
    <div className="user">
      <div className="edit-avatar">
        <Controller
          control={control}
          name="image"
          render={({ field }) => (
            <Upload
              accept=".png, .jpg, .jpeg"
              listType="picture-card"
              maxCount={1}
              beforeUpload={() => false}
              showUploadList={{ showRemoveIcon: false }}
              defaultFileList={[
                {
                  uid: avatar,
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
            style={{ width: "100%", objectFit: "cover" }}
            src={previewImage}
          />
        </Modal>
      </div>
    </div>
  );
};

export default Picture;
