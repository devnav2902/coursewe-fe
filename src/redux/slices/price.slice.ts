import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import PriceApi from "../../api/price.api";
import { Price } from "../../ts/types/course.types";

type PriceState = {
  priceList: {
    data: Price[] | [];
    loaded: boolean;
    error: null | string;
  };
  currentPrice: {
    data: Price | null;
    loaded: boolean;
    error: null | string;
  };
  updatePrice: {
    updating: boolean;
    error: null | string;
  };
};

const initialState: PriceState = {
  priceList: {
    data: [],
    loaded: false,
    error: null,
  },
  currentPrice: {
    data: null,
    loaded: false,
    error: null,
  },
  updatePrice: {
    updating: false,
    error: null,
  },
};

export const getPriceList = createAsyncThunk<
  Price[],
  undefined,
  { rejectValue: string }
>("price/getPriceList", async (_, { rejectWithValue }) => {
  try {
    const {
      data: { priceList },
    } = await PriceApi.getPriceList();
    return priceList;
  } catch (error) {
    return rejectWithValue("Lỗi khi hiển thị danh sách giá khóa học!");
  }
});

export const getCoursePrice = createAsyncThunk<
  Price,
  number | string,
  { rejectValue: string }
>("price/getCoursePrice", async (courseId, { rejectWithValue }) => {
  try {
    const {
      data: { price },
    } = await PriceApi.getPriceByCourseId(courseId);
    return price;
  } catch (error) {
    return rejectWithValue("Lỗi khi lấy thông tin giá khóa học!");
  }
});

export const updateCoursePrice = createAsyncThunk<
  Price,
  { courseId: number | string; priceId: number },
  { rejectValue: string }
>(
  "price/updateCoursePrice",
  async ({ courseId, priceId }, { rejectWithValue }) => {
    try {
      const { data } = await PriceApi.updatePrice(courseId, priceId);

      return data.price;
    } catch (error) {
      return rejectWithValue("Lỗi khi cập nhật giá khóa học!");
    }
  }
);

const priceSlice = createSlice({
  name: "price",
  reducers: {
    setCoursePrice: (state, action: PayloadAction<Price>) => {
      state.currentPrice.data = action.payload;
    },
  },
  initialState,
  extraReducers: (builder) => {
    // GET PRICE LIST
    builder.addCase(getPriceList.pending, (state) => {
      state.priceList.loaded = false;
    });
    builder.addCase(getPriceList.fulfilled, (state, action) => {
      state.priceList.data = action.payload;
      state.priceList.loaded = true;
    });
    builder.addCase(getPriceList.rejected, (state, action) => {
      state.priceList.error = action.payload as string;
      state.priceList.loaded = true;
    });
    // UPDATE COURSE PRICE
    builder.addCase(updateCoursePrice.pending, (state) => {
      state.updatePrice.updating = true;
    });
    builder.addCase(updateCoursePrice.fulfilled, (state, action) => {
      state.updatePrice.updating = false;
      state.currentPrice.data = action.payload;
    });
    builder.addCase(updateCoursePrice.rejected, (state, action) => {
      state.updatePrice.error = action.payload as string;
      state.updatePrice.updating = false;
    });
    // GET COURSE PRICE
    builder.addCase(getCoursePrice.pending, (state) => {
      state.currentPrice.loaded = false;
    });
    builder.addCase(getCoursePrice.fulfilled, (state, action) => {
      state.currentPrice.loaded = true;
      state.currentPrice.data = action.payload;
    });
    builder.addCase(getCoursePrice.rejected, (state, action) => {
      state.currentPrice.error = action.payload as string;
      state.currentPrice.loaded = true;
    });
  },
});

export default priceSlice.reducer;
export const { setCoursePrice } = priceSlice.actions;
