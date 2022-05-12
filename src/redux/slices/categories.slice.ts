import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import CategoriesApi, {
  ArrayPopularInstructors,
  Breadcrumb,
  CoursesBeginner,
  CoursesByCategory,
  DiscoveryUnitsResponse,
} from "../../api/categories.api";

type CategoriesState = {
  discoveryUnits: {
    loaded: boolean;
    error: null | string;
    data: DiscoveryUnitsResponse | null;
  };
  courses: {
    data: CoursesByCategory | null;
    loaded: boolean;
    error: null | string;
  };
  breadcrumb: {
    data: Breadcrumb | null;
    loaded: boolean;
    error: null | string;
  };
  popularInstructors: {
    data: ArrayPopularInstructors | [];
    error: null | string;
    loaded: boolean;
  };
  coursesBeginner: {
    data: CoursesBeginner | null;
    error: null | string;
    loaded: boolean;
  };
};

const initialState: CategoriesState = {
  discoveryUnits: {
    loaded: false,
    error: null,
    data: null,
  },
  courses: {
    data: null,
    error: null,
    loaded: false,
  },
  breadcrumb: {
    data: null,
    error: null,
    loaded: false,
  },
  popularInstructors: {
    data: [],
    error: null,
    loaded: false,
  },
  coursesBeginner: {
    data: null,
    error: null,
    loaded: false,
  },
};

export const getCoursesBeginner = createAsyncThunk<
  CoursesBeginner,
  string,
  { rejectValue: string }
>("categories/getCoursesBeginner", async (slug, { rejectWithValue }) => {
  try {
    const { data } = await CategoriesApi.coursesBeginner(slug);

    return data.coursesBeginner;
  } catch (error) {
    return rejectWithValue("Lỗi trong quá trình tải thông tin!");
  }
});

export const getBreadcrumbByCategory = createAsyncThunk<
  Breadcrumb,
  string,
  { rejectValue: string }
>("categories/getBreadcrumbByCategory", async (slug, { rejectWithValue }) => {
  try {
    const { data } = await CategoriesApi.getBreadcrumbByCategory(slug);

    return data.breadcrumb;
  } catch (error) {
    return rejectWithValue("Lỗi trong quá trình tải thông tin!");
  }
});

export const getPopularInstructors = createAsyncThunk<
  ArrayPopularInstructors,
  string,
  { rejectValue: string }
>("categories/getPopularInstructors", async (slug, { rejectWithValue }) => {
  try {
    const { data } = await CategoriesApi.getPopularInstructors(slug);
    return data.popularInstructors;
  } catch (error) {
    return rejectWithValue("Lỗi trong quá trình tải thông tin!");
  }
});

export const getDiscoveryUnits = createAsyncThunk<
  DiscoveryUnitsResponse,
  { slug: string; params: object },
  { rejectValue: string }
>(
  "categories/getDiscoveryUnits",
  async ({ slug, params }, { rejectWithValue }) => {
    try {
      const { data } = await CategoriesApi.discoveryUnits(slug, params);
      return data;
    } catch (error) {
      return rejectWithValue("Lỗi trong quá trình tải thông tin!");
    }
  }
);

export const getCourses = createAsyncThunk<
  CoursesByCategory,
  { slug: string; params: object },
  { rejectValue: string }
>("categories/getCourses", async ({ slug, params }, { rejectWithValue }) => {
  try {
    const { data } = await CategoriesApi.getCoursesByCategorySlug(slug, params);
    return data.courses;
  } catch (error) {
    return rejectWithValue("Lỗi trong quá trình tải thông tin!");
  }
});

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    resetState: (state) => {
      state = initialState;
    },
  },
  extraReducers: (builder) => {
    // GET DISCOVERY UNITS
    builder.addCase(getDiscoveryUnits.pending, (state) => {
      state.discoveryUnits.loaded = false;
    });
    builder.addCase(getDiscoveryUnits.fulfilled, (state, action) => {
      state.discoveryUnits.loaded = true;
      state.discoveryUnits.data = action.payload;
    });
    builder.addCase(getDiscoveryUnits.rejected, (state, action) => {
      state.discoveryUnits.loaded = true;
      state.discoveryUnits.error = action.payload as string;
    });
    // GET COURSES
    builder.addCase(getCourses.pending, (state) => {
      state.courses.loaded = false;
    });
    builder.addCase(getCourses.fulfilled, (state, action) => {
      state.courses.loaded = true;
      state.courses.data = action.payload;
    });
    builder.addCase(getCourses.rejected, (state, action) => {
      state.courses.loaded = true;
      state.courses.error = action.payload as string;
    });
    // GET BREADCRUMB
    builder.addCase(getBreadcrumbByCategory.pending, (state) => {
      state.breadcrumb.loaded = false;
    });
    builder.addCase(getBreadcrumbByCategory.fulfilled, (state, action) => {
      state.breadcrumb.loaded = true;
      state.breadcrumb.data = action.payload;
    });
    builder.addCase(getBreadcrumbByCategory.rejected, (state, action) => {
      state.breadcrumb.loaded = true;
      state.breadcrumb.error = action.payload as string;
    });
    // GET POPULAR INSTRUCTORS
    builder.addCase(getPopularInstructors.pending, (state) => {
      state.popularInstructors.loaded = false;
    });
    builder.addCase(getPopularInstructors.fulfilled, (state, action) => {
      state.popularInstructors.loaded = true;
      state.popularInstructors.data = action.payload;
    });
    builder.addCase(getPopularInstructors.rejected, (state, action) => {
      state.popularInstructors.loaded = true;
      state.popularInstructors.error = action.payload as string;
    });
    // GET COURSES BEGINNER
    builder.addCase(getCoursesBeginner.pending, (state) => {
      state.coursesBeginner.loaded = false;
    });
    builder.addCase(getCoursesBeginner.fulfilled, (state, action) => {
      state.coursesBeginner.loaded = true;
      state.coursesBeginner.data = action.payload;
    });
    builder.addCase(getCoursesBeginner.rejected, (state, action) => {
      state.coursesBeginner.loaded = true;
      state.coursesBeginner.error = action.payload as string;
    });
  },
});

export default categoriesSlice.reducer;
export const { resetState } = categoriesSlice.actions;
