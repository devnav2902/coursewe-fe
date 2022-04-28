import axios from "axios";
import {
  ProcessServerConfigFunction,
  ProgressServerConfigFunction,
} from "filepond";
import { FC } from "react";
import { FilePond } from "react-filepond";
import LectureApi from "../../../../api/lecture.api";
import ResourceApi from "../../../../api/resource.api";
import { API_URL } from "../../../../utils/constants";
import { CustomFileUpload } from "../../styles/curriculum.styles";

type FileUploadProps = {
  fileType: "video" | "resource";
  lectureId: number;
  getLatestData: () => void;
};

const FileUpload: FC<FileUploadProps> = ({
  fileType,
  lectureId,
  getLatestData,
}) => {
  const label =
    fileType === "video"
      ? `<div class='input-group'>
  <div class='file-upload'>Bạn chưa chọn video bài giảng</div>
  <a class='filepond--label-action button-select-file'>
      Tải video lên
  </a>
</div>`
      : `<div class='input-group'>
  <div class='file-upload'>Upload tài liệu bài giảng</div>
  <a class='filepond--label-action button-select-file'>
      Tải tài liệu lên
  </a>
</div>`;

  const fileTypes = fileType === "video" ? ["video/mp4"] : ["image/png"];

  type Config = {
    url: string;
    timeout: number;
    process: ProcessServerConfigFunction;
  };

  const configServer: Config = {
    url: API_URL,
    timeout: 7000,
    process: function (
      fieldName: string,
      file: any,
      metadata: { [key: string]: any },
      load: (p: string | { [key: string]: any }) => void,
      error: (errorText: string) => void,
      progress: ProgressServerConfigFunction,
      abort: () => void
    ) {
      console.log(metadata);

      const formData = new FormData();
      formData.append(fieldName, file, file.name);
      formData.append("lectureId", lectureId.toString());
      // aborting the request
      const CancelToken = axios.CancelToken;
      const source = CancelToken.source();

      function onUploadProgress(e: ProgressEvent) {
        progress(e.lengthComputable, e.loaded, e.total);
      }

      if (fileType === "video") {
        LectureApi.upload({
          data: formData,
          onUploadProgress,
          source,
        }).then((res: any) => {
          console.log(res);

          load(res.data.fileUploaded); // gọi load filepond(object/id file) => dùng cho revert/restore
          getLatestData(); // get dữ liệu mới nhất từ dtb, trigger rerender
        });
      } else {
        ResourceApi.upload({
          data: formData,
          onUploadProgress,
          source,
        }).then((res: any) => {
          load(res.data.fileUploaded);
          getLatestData();
        });
      }

      return {
        // Should expose an abort method so the request can be cancelled
        abort: () => {
          // This function is entered if the user has tapped the cancel button
          source.cancel("Đã hủy upload file.");
          // Let FilePond know the request has been cancelled
          abort();
        },
      };
    },
  };

  return (
    <CustomFileUpload>
      <FilePond
        server={configServer}
        className="custom-fileupload"
        allowMultiple={false}
        acceptedFileTypes={fileTypes}
        labelTapToRetry="Nhấn để thử lại"
        labelFileProcessing="Đang tải lên"
        labelFileProcessingError="Lỗi khi tải lên"
        labelTapToCancel="Hủy tải lên"
        maxFiles={1}
        name="file"
        labelIdle={label}
        allowRevert={false}
      />
    </CustomFileUpload>
  );
};

export default FileUpload;
