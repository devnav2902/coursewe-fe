import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type SectionType = "section";
export type LectureType = "lecture";

export type CurriculumTypes = {
  SECTION: SectionType;
  LECTURE: LectureType;
};

type SectionId = number | "";
type LectureId = number | "";
type ElementDisplay = {
  id: SectionId | LectureId;
  type: SectionType | LectureType | "";
};
type DisplayOption = { sectionId: number | "" };
type CurriculumState = {
  elementDisplay: ElementDisplay;
  displayCreateLecture: boolean;
  displayOption: DisplayOption;
  displayCreateSection: boolean;
};

const initialState: CurriculumState = {
  // edit lecture/section
  elementDisplay: { id: "", type: "" },
  // option & create lecture
  displayCreateLecture: false,
  displayOption: { sectionId: "" },
  // create section
  displayCreateSection: false,
};

const curriculumSlice = createSlice({
  name: "curriculum",
  initialState,
  reducers: {
    cancelEditTitle: (state) => {
      state.elementDisplay = { id: "", type: "" };
      state.displayCreateSection = false;
    },
    cancelCreateLecture: (state) => {
      state.displayCreateLecture = false;
    },
    setElementDisplay: (state, action: PayloadAction<ElementDisplay>) => {
      state.elementDisplay = action.payload;
    },
    setDisplayCreateLecture: (state, action: PayloadAction<boolean>) => {
      state.displayCreateLecture = action.payload;
    },
    setDisplayCreateSection: (state, action: PayloadAction<boolean>) => {
      state.displayCreateSection = action.payload;
    },
    setDisplayOption: (state, action: PayloadAction<DisplayOption>) => {
      state.displayOption = action.payload;
    },
    hideCreateSection: (state, action: PayloadAction<DisplayOption>) => {
      state.displayOption = action.payload;
    },
    openCreateLecture: (state, action: PayloadAction<SectionId>) => {
      state.displayOption.sectionId = action.payload;
      state.displayCreateSection = false;
    },
    openCreateSection: (state) => {
      state.displayCreateSection = true;
      state.displayCreateLecture = false;
      state.displayOption.sectionId = "";
    },
    hideOption: (state) => {
      state.displayOption.sectionId = "";
      state.displayCreateLecture = false;
    },
  },
});

const { actions, reducer } = curriculumSlice;

export const {
  cancelCreateLecture,
  cancelEditTitle,
  hideCreateSection,
  hideOption,
  openCreateLecture,
  openCreateSection,
  setDisplayCreateLecture,
  setDisplayCreateSection,
  setDisplayOption,
  setElementDisplay,
} = actions;

export default reducer;
