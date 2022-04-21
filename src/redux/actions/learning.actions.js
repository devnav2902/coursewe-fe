import LearningApi from "../../api/learning.api";
import ProgressApi from "../../api/progress.api";
import learningTypes from "../types/learning.types.ts";

const getCourseRequest = { type: learningTypes.GET_COURSE_IN_LEARNING_REQUEST };
const getCourseSuccess = (data) => ({
  type: learningTypes.GET_COURSE_IN_LEARNING_SUCCESS,
  payload: data,
});

const getProgressRequest = { type: learningTypes.GET_PROGRESS_REQUEST };
const getProgressSuccess = (data) => ({
  type: learningTypes.GET_PROGRESS_SUCCESS,
  payload: data,
});

const getProgress = (id) => (dispatch) => {
  dispatch(getProgressRequest);

  ProgressApi.getProgress(id).then((res) => {
    const { data } = res;
    const { complete, total } = data;

    dispatch(getProgressSuccess({ complete, total }));
  });
};

const getCourse = (slug) => (dispatch) => {
  dispatch(getCourseRequest);

  LearningApi.getCourseBySlug(slug).then((res) => {
    const { data } = res;

    dispatch(getCourseSuccess(data.course));
  });
};

const getSectionsRequest = {
  type: learningTypes.GET_SECTIONS_IN_LEARNING_REQUEST,
};
const getSectionsSuccess = (data) => ({
  type: learningTypes.GET_SECTIONS_IN_LEARNING_SUCCESS,
  payload: data,
});

const getSections = (courseId) => (dispatch) => {
  dispatch(getSectionsRequest);

  LearningApi.getSections(courseId).then((res) => {
    dispatch(getSectionsSuccess(res.data.sections));
  });
};

const resetStateLearning = {
  type: learningTypes.RESET_STATE_LEARNING,
};

export { getCourse, getProgress, getSections, resetStateLearning };
