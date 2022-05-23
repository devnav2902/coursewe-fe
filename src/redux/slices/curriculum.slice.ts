import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import LectureApi from "../../api/lecture.api";
import SectionApi from "../../api/section.api";
import { Section, SectionItems } from "../../ts/types/course.types";

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
  sections: {
    data: SectionItems;
    loaded: boolean;
    error: string | null;
  };
};

const initialState: CurriculumState = {
  // edit lecture/section
  elementDisplay: { id: "", type: "" },
  // option & create lecture
  displayCreateLecture: false,
  displayOption: { sectionId: "" },
  // create section
  displayCreateSection: false,
  sections: {
    data: [],
    loaded: false,
    error: null,
  },
};

export const getSections = createAsyncThunk<SectionItems, number | string>(
  "curriculum/getSections",
  async (courseId, { rejectWithValue }) => {
    try {
      const {
        data: { sections },
      } = await SectionApi.getSectionsByCourseId(courseId);

      return sections;
    } catch (error) {
      return rejectWithValue("Lỗi trong quá trình tải thông tin!");
    }
  }
);

export const deleteLecture = createAsyncThunk<
  { lectureId: number; sectionId: number },
  { lectureId: number; courseId: number; sectionId: number }
>(
  "curriculum/deleteLecture",
  async ({ courseId, lectureId, sectionId }, { rejectWithValue }) => {
    try {
      const { data } = await LectureApi.delete(lectureId, courseId);

      return { lectureId, sectionId };
    } catch (error) {
      return rejectWithValue("Lỗi khi xóa bài giảng!");
    }
  }
);

const curriculumSlice = createSlice({
  name: "curriculum",
  initialState,
  reducers: {
    updateSections: (state, action: PayloadAction<SectionItems>) => {
      state.sections.data = action.payload;
    },
    updateSection: (state, action: PayloadAction<Section>) => {
      const sections = state.sections.data;

      const indexSection = sections.findIndex(
        (section) => section.id === action.payload.id
      );

      if (indexSection > -1) {
        sections.splice(indexSection, 1, action.payload);
      }
    },
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
    hideCreateSection: (state) => {
      state.displayCreateSection = false;
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
  extraReducers: (builder) => {
    // GET SECTIONS
    builder.addCase(getSections.pending, (state, action) => {
      state.sections.loaded = false;
    });
    builder.addCase(getSections.fulfilled, (state, action) => {
      state.sections.loaded = true;
      state.sections.data = action.payload;
    });
    builder.addCase(getSections.rejected, (state, action) => {
      state.sections.loaded = true;
      state.sections.error = action.payload as string;
    });

    // DELETE LECTURE
    builder.addCase(deleteLecture.fulfilled, (state, action) => {
      const sections = state.sections.data;

      const section = sections.find((section) => {
        const sectionId = action.payload.sectionId;

        return section.id === sectionId;
      });

      const lectureId = action.payload.lectureId;
      const indexLecture = section?.lecture.findIndex(
        (lecture) => lecture.id === lectureId
      );

      if (typeof indexLecture === "number" && indexLecture > -1) {
        section?.lecture.splice(indexLecture, 1);
      }
    });

    // DELETE SECTION
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
  updateSections,
  updateSection,
} = actions;

export default reducer;
