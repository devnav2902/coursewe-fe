import axios from "axios";
import { ProcessServerConfigFunction } from "filepond";
import { FC, useContext } from "react";
import { FilePond, registerPlugin } from "react-filepond";
import LectureApi from "../../../../api/lecture.api";
import ResourceApi from "../../../../api/resource.api";
import { API_URL } from "../../../../utils/constants";
import { openNotification } from "../../../../utils/functions";
import { LectureContext } from "../../hooks/curriculum.hooks";
import { CustomFileUpload } from "../../styles/curriculum.styles";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";

registerPlugin(FilePondPluginFileValidateType);

type FileUploadProps = {
  fileType: "video" | "resource";
  lectureId: number;
};

const FileUpload: FC<FileUploadProps> = ({ fileType, lectureId }) => {
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

  const {
    lectureUploading: { lectureUploading, setLectureUploadingTo },
    lectureData: {
      handle: { getLatestLecture },
    },
    resourceUploading: { setResourceUploadingTo },
  } = useContext(LectureContext);

  const configServer: Config = {
    url: API_URL,
    timeout: 7000,
    process: function (
      fieldName,
      file,
      metadata,
      load,
      error,
      progress,
      abort
    ) {
      console.log(metadata);
      if (fileType === "video") setLectureUploadingTo(true);
      else if (fileType === "resource") setResourceUploadingTo(true);

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
          setLectureUploadingTo(false);
          getLatestLecture(); // get dữ liệu mới nhất từ dtb, trigger rerender

          load(res.data.fileUploaded); // gọi load filepond(object/id file) => dùng cho revert/restore
        });
      } else {
        ResourceApi.upload({
          data: formData,
          onUploadProgress,
          source,
        }).then((res: any) => {
          setResourceUploadingTo(false);
          getLatestLecture(); // Get bài giảng mới nhất(đã chứa resource mới nhất)

          load(res.data.fileUploaded);
        });
      }

      return {
        // Should expose an abort method so the request can be cancelled
        abort: () => {
          // This function is entered if the user has tapped the cancel button
          source.cancel("Đã hủy upload file.");

          if (fileType === "video") setLectureUploadingTo(false);
          else if (fileType === "resource") setResourceUploadingTo(false);

          openNotification("success", "Đã dừng upload file");
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
        maxFiles={1}
        name="file"
        labelIdle={label}
        allowRevert={false}
        labelTapToRetry="Nhấn để thử lại"
        labelFileProcessing="Đang tải lên"
        labelFileProcessingError="Lỗi khi tải lên"
        labelTapToCancel="Hủy tải lên"
      />
    </CustomFileUpload>
  );
};

export default FileUpload;
