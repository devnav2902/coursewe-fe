import axios from "axios";
import CourseApi from "../../api/course.api";
import courseTypes from "../types/course.types";

const getAllCourses = () => {
  return async (dispatch) => {
    dispatch({ type: courseTypes.COURSE_REQUEST });

    try {
      const { data } = await CourseApi.get();

      dispatch({ type: courseTypes.COURSE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: courseTypes.COURSE_FAILURE });
    }
  };
};
const createCourse = (title) => {
  return async (dispatch) => {
    dispatch({ type: courseTypes.CREATE_COURSE_REQUEST });
    const {
      data: { id },
    } = await CourseApi.createCourse(title);

    dispatch({ type: courseTypes.CREATE_COURSE_SUCCESS, payload: id });
  };
};

export { getAllCourses, createCourse };
