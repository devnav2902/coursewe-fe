import axiosClient from "../utils/axios";

class Course {
  getCourseBySlug = async (slug: string) => {
    return axiosClient
      .post("/course", { slug })
      .then((res) => res)
      .catch((error) => error.response);
  };

  getCourseById = async (id: string | number) => {
    return axiosClient
      .get(`/course/${id}`)
      .then((res) => res)
      .catch((error) => error.response);
  };

  updateInformation = async (id: string | number, data: any) => {
    let dataForm = new FormData();
    for (const key in data) data[key] && dataForm.append(key, data[key]);

    return axiosClient
      .post(`/course/update-information/${id}`, dataForm, {
        headers: {
          "Content-Type":
            "multipart/form-data; charset=utf-8; boundary=" +
            Math.random().toString().substr(2),
        },
      })
      .then((res) => res)
      .catch((error) => error.response);
  };

  updateCourseOutcome = async (id: string | number, data: any) => {
    return axiosClient
      .patch(`/course/update-course-outcome/${id}`, data)
      .then((res) => res)
      .catch((error) => error.response);
  };

  updateCourseRequirements = async (id: string | number, data: any) => {
    return axiosClient
      .patch(`/course/update-course-requirements/${id}`, data)
      .then((res) => res)
      .catch((error) => error.response);
  };

  deleteCourseOutcome = async (id: string | number, data: any) => {
    return axiosClient
      .delete(`/course/delete-course-outcome/${id}`, { data })
      .then((res) => res)
      .catch((error) => error.response);
  };

  deleteCourseRequirements = async (id: string | number, data: any) => {
    return axiosClient
      .delete(`/course/delete-course-requirements/${id}`, { data })
      .then((res) => res)
      .catch((error) => error.response);
  };
}

const CourseApi = new Course();

export default CourseApi;
