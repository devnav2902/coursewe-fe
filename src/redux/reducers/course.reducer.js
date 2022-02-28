const { default: courseTypes } = require("../types/course.types");

const initialState = {
  loading: false,
  courseData: [],
};

function courseReducer(state = initialState, action) {
  switch (action.type) {
    case courseTypes.COURSE_REQUEST:
      return { ...state, loading: true };
    case courseTypes.COURSE_SUCCESS:
      return { ...state, loading: false, courseData: action.payload };
    case courseTypes.COURSE_FAILURE:
      return { ...state, loading: false };
    default:
      return state;
  }
}

export default courseReducer;
