import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import InstructorApi, { CourseResponse } from "../../api/instructor.api";
import PriceApi from "../../api/price.api";
import { Price } from "../../ts/types/course.types";

type InstructorCourseState = {
  course: {
    loaded: boolean;
    data: CourseResponse | null;
    error: any;
  };
  price: {
    loaded: boolean;
    data: Price[] | [];
    error: any;
  };
};

const initialState: InstructorCourseState = {
  course: {
    loaded: false,
    data: null,
    error: null,
  },
  price: {
    loaded: false,
    data: [],
    error: null,
  },
};

export const getListPrice = createAsyncThunk<Price[]>(
  "instructor-course/getListPrice",
  async (_, { rejectWithValue }) => {
    try {
      const {
        data: { price },
      } = await PriceApi.getPrice();
      return price;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

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
    builder.addCase(getCourse.fulfilled, (state, action) => {
      state.course.loaded = true;
      state.course.data = action.payload;
    });
    builder.addCase(getCourse.rejected, (state, action) => {
      state.course.loaded = true;
      state.course.error = action.payload;
    });
    // GET LIST PRICE
    builder.addCase(getListPrice.fulfilled, (state, action) => {
      state.price.loaded = true;
      state.price.data = action.payload;
    });
    builder.addCase(getListPrice.rejected, (state, action) => {
      state.price.loaded = true;
      state.price.error = action.payload;
    });
  },
});

export default instructorCourseSlice.reducer;
