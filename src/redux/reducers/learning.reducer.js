import learningTypes from "../types/learning.types";

const initialState = {
  dataCourse: {
    course: null,
    loadedCourse: false,
  },
  myProgress: {
    loadedMyProgress: false,
    total: 0,
    complete: 0,
  },
  sections: {
    loaded: false,
    data: [],
  },
};

const learningReducer = (state = initialState, action) => {
  switch (action.type) {
    case learningTypes.RESET_STATE_LEARNING:
      return { ...initialState };

    case learningTypes.GET_COURSE_IN_LEARNING_REQUEST:
      return {
        ...state,
      };

    case learningTypes.GET_COURSE_IN_LEARNING_SUCCESS:
      return {
        ...state,
        dataCourse: {
          ...state.dataCourse,
          loadedCourse: true,
          course: action.payload,
        },
      };

    case learningTypes.GET_PROGRESS_REQUEST:
      return {
        ...state,
      };
    case learningTypes.GET_PROGRESS_SUCCESS:
      return {
        ...state,
        sections: { ...state.sections },
        myProgress: {
          ...state.myProgress,
          loadedMyProgress: true,
          ...action.payload,
        },
      };

    case learningTypes.GET_SECTIONS_IN_LEARNING_REQUEST:
      return {
        ...state,
      };

    case learningTypes.GET_SECTIONS_IN_LEARNING_SUCCESS:
      return {
        ...state,
        sections: { ...state.sections, loaded: true, data: action.payload },
      };

    default:
      return state;
  }
};

export default learningReducer;
