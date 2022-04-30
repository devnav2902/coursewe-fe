import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import LearningApi from "../../api/learning.api";
import ProgressApi from "../../api/progress.api";
import { LearningProgress, SectionItems } from "../../ts/types/course.types";
import { User } from "../../ts/types/user.types";

export type Course = {
  id: number;
  author_id: number;
  slug: string;
  thumbnail: string;
  title: string;
  description: string;
  instructional_level: {
    id: number;
    level: string;
  };
  author: User;
};

type LearningState = {
  dataCourse: {
    course: null | Course;
    loadedCourse: boolean;
    error: any;
  };
  myProgress: {
    loadedMyProgress: boolean;
    total: number;
    complete: number;
    error: any;
  };
  sections: {
    error: any;
    loaded: boolean;
    data: SectionItems;
  };
};

const initialState: LearningState = {
  dataCourse: {
    course: null,
    loadedCourse: false,
    error: null,
  },
  myProgress: {
    loadedMyProgress: false,
    total: 0,
    complete: 0,
    error: null,
  },
  sections: {
    loaded: false,
    data: [],
    error: null,
  },
};

export const getProgress = createAsyncThunk<
  LearningProgress,
  number,
  { rejectValue: any }
>("learning/getProgress", async (id: number, { rejectWithValue }) => {
  try {
    const { data } = await ProgressApi.getProgress(id);

    return data;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const getCourse = createAsyncThunk<
  Course,
  string,
  {
    rejectValue: any;
  }
>("learning/getCourse", (slug: string, { rejectWithValue }) => {
  return new Promise((resolve) => {
    LearningApi.getCourseBySlug(slug)
      .then((res) => {
        const { data } = res;

        resolve(data.course);
      })
      .catch((error) => {
        rejectWithValue(error);
      });
  });
});

export const getSections = createAsyncThunk<SectionItems, number>(
  "learning/getSections",
  async (courseId, { rejectWithValue }) => {
    try {
      const { data } = await LearningApi.getSections(courseId);

      return data.sections;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const learningSlice = createSlice({
  name: "learning",
  initialState,
  reducers: {
    resetStateLearning: (state) => {
      state.dataCourse = initialState.dataCourse;
      state.myProgress = initialState.myProgress;
      state.sections = initialState.sections;
    },
  },
  extraReducers: (builder) => {
    // GET COURSE
    builder.addCase(getCourse.pending, (state) => {
      state.dataCourse.loadedCourse = false;
    });
    builder.addCase(getCourse.fulfilled, (state, action) => {
      const { dataCourse } = state;
      dataCourse.loadedCourse = true;
      dataCourse.course = action.payload;
    });
    builder.addCase(getCourse.rejected, (state, action) => {
      const { dataCourse } = state;
      dataCourse.loadedCourse = true;
      dataCourse.error = action.payload;
    });
    // GET PROGRESS
    builder.addCase(getProgress.fulfilled, (state, { payload }) => {
      const { myProgress } = state;
      myProgress.complete = payload.complete;
      myProgress.total = payload.total;
    });
    builder.addCase(getProgress.rejected, (state, { payload }) => {
      const { myProgress } = state;
      myProgress.error = payload;
    });
    // GET SECTIONS
    builder.addCase(getSections.fulfilled, (state, action) => {
      state.sections.data = action.payload;
    });
    builder.addCase(getSections.rejected, (state, action) => {
      state.sections.error = action.payload;
    });
  },
});

export default learningSlice.reducer;
