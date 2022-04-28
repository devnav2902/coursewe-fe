import { useState } from "react";
import {
  Lecture,
  ResourceItems,
} from "../../../layouts/instructor-course.layout";
import ResourceApi from "../../../api/resource.api";
import { Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import LectureApi from "../../../api/lecture.api";

type DataResources = {
  resources: ResourceItems;
  getLatestResources: () => void;
  deleteResource: (resourceId: number, courseId: number) => void;
};

export const useResources = (
  lectureId: number,
  iniResourcesItems: ResourceItems
): DataResources => {
  const [resources, setResources] = useState<ResourceItems>(iniResourcesItems);

  function getLatestResources() {
    ResourceApi.getByLectureId(lectureId)
      .then((res) => {
        console.log(res);
        setResources(res.data.resources);
      })
      .catch((error) => error);
  }

  function deleteResource(resourceId: number, courseId: number) {
    Modal.confirm({
      title: "Thông báo",
      icon: <ExclamationCircleOutlined />,
      content: "Bạn xác nhận muốn gỡ tài liệu này khỏi bài học?",
      okText: "Đồng ý",
      cancelText: "Hủy bỏ",
      onOk: () => {
        if (courseId) {
          return new Promise((resolve, reject) => {
            ResourceApi.delete(lectureId, courseId, resourceId)
              .then((res) => {
                getLatestResources();
                resolve(res);
              })
              .catch((e) => reject(e));
          });
        }
      },
      onCancel() {},
    });
  }

  return { resources, getLatestResources, deleteResource };
};

type DataLecture = {
  lecture: Lecture;
  deleted: boolean;
  getLatestLecture: () => void;
  deleteLecture: (lectureId: number, courseId: number) => void;
};

export const useLecture = (iniLectureItem: Lecture): DataLecture => {
  const [lecture, setLecture] = useState(iniLectureItem);
  const [deleted, setDeleted] = useState(false);

  function getLatestLecture() {
    LectureApi.getByLectureId(iniLectureItem.id)
      .then((res) => {
        console.log(res);
        setLecture(res.data.lecture);
      })
      .catch((error) => error);
  }

  function deleteLecture(lectureId: number, courseId: number) {
    Modal.confirm({
      title: "Thông báo",
      icon: <ExclamationCircleOutlined />,
      content: "Bạn xác nhận muốn xóa bài giảng này khỏi chương học?",
      okText: "Đồng ý",
      cancelText: "Hủy bỏ",
      onOk: () => {
        return new Promise((resolve, reject) => {
          LectureApi.delete(lectureId, courseId)
            .then((res) => {
              setDeleted(true);
              resolve(res);
            })
            .catch((e) => reject(e));
        });
      },
      onCancel() {},
    });
  }

  return { lecture, getLatestLecture, deleteLecture, deleted };
};
