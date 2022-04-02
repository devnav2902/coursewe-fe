const { default: courseTypes } = require("../types/course.types");

const initialState = {
  loading: false,
  courseData: [],
  idNewCourse: null,
};

function courseReducer(state = initialState, action) {
  switch (action.type) {
    case courseTypes.COURSE_REQUEST:
      return { ...state, loading: true };
    case courseTypes.COURSE_SUCCESS:
      return { ...state, loading: false, courseData: action.payload };
    case courseTypes.COURSE_FAILURE:
      return { ...state, loading: false };

    case courseTypes.CREATE_COURSE_REQUEST:
      return { ...state, loading: true };
    case courseTypes.CREATE_COURSE_SUCCESS:
      return { ...state, loading: false, idNewCourse: action.payload };
    default:
      return state;
  }
}

export default courseReducer;
