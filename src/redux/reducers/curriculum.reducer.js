import curriculumTypes from "../types/curriculum.types";

const initialState = {
  // edit lecture/section
  elementDisplay: { id: "", type: "" },
  // option & create lecture
  displayCreateLecture: false,
  displayOption: { sectionId: "" },
  // create section
  displayCreateSection: false,
};

const curriculumReducer = (state = initialState, action) => {
  switch (action.type) {
    case curriculumTypes.CANCEL_EDIT_TITLE:
      return {
        ...state,
        elementDisplay: { id: "", type: "" },
        displayCreateSection: false,
      }; // edit section/lecture
    case curriculumTypes.SET_ELEMENT_DISPLAY:
      return { ...state, elementDisplay: action.payload };
    case curriculumTypes.DISPLAY_CREATE_LECTURE:
      return { ...state, displayCreateLecture: action.payload };
    case curriculumTypes.DISPLAY_CREATE_SECTION:
      return { ...state, displayCreateSection: action.payload };
    case curriculumTypes.DISPLAY_OPTION:
      return { ...state, displayOption: { sectionId: action.payload } };

    default:
      return state;
  }
};

export default curriculumReducer;
