import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import InstructorApi, { CourseResponse } from "../../api/instructor.api";

type InstructorCourseState = {
  course: {
    loaded: boolean;
    data: CourseResponse | null;
    error: any;
  };
};

const initialState: InstructorCourseState = {
  course: {
    loaded: false,
    data: null,
    error: null,
  },
};

export const getCourse = createAsyncThunk<CourseResponse, number | string>(
  "instructor-course/getCourse",
  async (courseId, { rejectWithValue }) => {
    try {
      const {
        data: { course },
      } = await InstructorApi.getCourseById(courseId);

      return course;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const instructorCourseSlice = createSlice({
  name: "instructor-course",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // GET COURSE
    builder.addCase(getCourse.pending, (state) => {
      state.course.loaded = false;
    });
    builder.addCase(getCourse.fulfilled, (state, action) => {
      state.course.loaded = true;
      state.course.data = action.payload;
    });
    builder.addCase(getCourse.rejected, (state, action) => {
      state.course.loaded = true;
      state.course.error = action.payload;
    });
  },
});

export default instructorCourseSlice.reducer;
