import curriculumTypes from "../types/curriculum.types";

const cancelEditTitle = { type: curriculumTypes.CANCEL_EDIT_TITLE };

const cancelCreateLecture = (dispatch) => {
  dispatch({ type: curriculumTypes.DISPLAY_CREATE_LECTURE, payload: false });
};

const setElementDisplay = (element) => (dispatch) => {
  dispatch({
    type: curriculumTypes.SET_ELEMENT_DISPLAY,
    payload: element,
  });
};

const setDisplayCreateLecture = (booleanValue) => ({
  type: curriculumTypes.DISPLAY_CREATE_LECTURE,
  payload: booleanValue,
});

const setDisplayOption = (sectionId) => ({
  type: curriculumTypes.DISPLAY_OPTION,
  payload: sectionId,
});

const openCreateLecture = (sectionId) => (dispatch) => {
  dispatch(setDisplayOption(sectionId));
  // dispatch(setDisplayCreateLecture(false)); // default, khi click vào button tạo lecture khác sẽ giữ form create => reset default
  dispatch(hideCreateSection());
};

const hideOption = () => (dispatch) => {
  dispatch(setDisplayOption(""));
  dispatch(setDisplayCreateLecture(false));
};

const setDisplayCreateSection = (booleanValue) => (dispatch) => {
  dispatch({
    type: curriculumTypes.DISPLAY_CREATE_SECTION,
    payload: booleanValue,
  });
};

const openCreateSection = () => (dispatch) => {
  dispatch(setDisplayCreateSection(true));
  dispatch(hideOption());
};

const hideCreateSection = () => (dispatch) => {
  dispatch(setDisplayCreateSection(false));
};

export {
  cancelEditTitle,
  setElementDisplay,
  setDisplayOption,
  setDisplayCreateLecture,
  setDisplayCreateSection,
  cancelCreateLecture,
  openCreateLecture,
  hideOption,
  openCreateSection,
  hideCreateSection,
};
