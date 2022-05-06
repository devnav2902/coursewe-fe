import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import PromotionApi, {
  ExpiredCoupons,
  FormCreateCoupon,
  InformationCreateCoupon,
  ScheduledCoupons,
} from "../../api/promotions.api";
import { CouponTypes } from "../../ts/types/coupon.types";

type PromotionState = {
  expiredCoupons: {
    loaded: boolean;
    data: ExpiredCoupons;
    error: any;
  };
  scheduledCoupons: {
    loaded: boolean;
    data: ScheduledCoupons;
    error: any;
  };
  couponTypes: {
    loaded: boolean;
    data: CouponTypes;
    error: any;
  };
  informationCreateCoupon: {
    loaded: boolean;
    data: InformationCreateCoupon;
    error: any;
  };
  submitCreatedCoupon: {
    loading: boolean;
    error: string | null;
    success: boolean;
  };
};

const initialState: PromotionState = {
  submitCreatedCoupon: {
    loading: false,
    error: null,
    success: false,
  },
  expiredCoupons: {
    loaded: false,
    data: [],
    error: null,
  },
  scheduledCoupons: {
    loaded: false,
    data: [],
    error: null,
  },
  couponTypes: {
    loaded: false,
    data: [],
    error: null,
  },
  informationCreateCoupon: {
    loaded: false,
    data: {
      canCreate: false,
      couponsCreationRemaining: 0,
      maxCouponInAMonth: 0,
      isFreeCourse: false,
    },
    error: null,
  },
};

export const submitCreatedCoupon = createAsyncThunk<
  any,
  FormCreateCoupon,
  { rejectValue: string }
>("promotions/submitCreatedCoupon", async (data, { rejectWithValue }) => {
  try {
    const res = await PromotionApi.createCoupon(data);
    console.log(res);

    return res.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response?.data, error);
      return rejectWithValue("Lỗi trong quá trình tạo mã giảm giá!");
    }

    return rejectWithValue("An unknown error");
  }
});

export const getScheduledCoupons = createAsyncThunk<ScheduledCoupons, number>(
  "promotions/getScheduledCoupons",
  async (courseId, { rejectWithValue }) => {
    try {
      const { data } = await PromotionApi.getScheduledCoupons(courseId);

      return data.scheduledCoupons;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getExpiredCoupons = createAsyncThunk<ExpiredCoupons, number>(
  "promotions/getExpiredCoupons",
  async (courseId, { rejectWithValue }) => {
    try {
      const { data } = await PromotionApi.getExpiredCoupons(courseId);

      return data.expiredCoupons;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getCouponTypes = createAsyncThunk<CouponTypes, undefined>(
  "promotions/getCouponTypes",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await PromotionApi.getCouponTypes();

      return data.couponTypes;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getInformationCreateCoupon = createAsyncThunk<
  InformationCreateCoupon,
  number,
  { rejectValue: string }
>(
  "promotions/getInformationCreateCoupon",
  async (courseId, { rejectWithValue }) => {
    try {
      const { data } = await PromotionApi.getInformationCreateCoupon(courseId);

      return data;
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Error");
    }
  }
);

const promotionSlice = createSlice({
  name: "promotions",
  initialState,
  reducers: {
    clearErrorSubmitCreatedCoupon: (state) => {
      state.submitCreatedCoupon.error = null;
    },
    resetSubmitCreatedCoupon: (state) => {
      state.submitCreatedCoupon = initialState.submitCreatedCoupon;
    },
  },
  extraReducers: (builder) => {
    // SUBMIT CREATED COUPON
    builder.addCase(submitCreatedCoupon.pending, (state) => {
      state.submitCreatedCoupon.loading = true;
    });
    builder.addCase(submitCreatedCoupon.fulfilled, (state) => {
      state.submitCreatedCoupon.loading = false;
      state.submitCreatedCoupon.success = true;
    });
    builder.addCase(submitCreatedCoupon.rejected, (state, action) => {
      state.submitCreatedCoupon.loading = false;
      state.submitCreatedCoupon.error = action.payload as string;
    });
    // GET SCHEDULED COUPONS
    builder.addCase(getScheduledCoupons.pending, (state) => {
      state.scheduledCoupons.loaded = false;
    });
    builder.addCase(getScheduledCoupons.fulfilled, (state, action) => {
      state.scheduledCoupons.loaded = true;
      state.scheduledCoupons.data = action.payload;
    });
    builder.addCase(getScheduledCoupons.rejected, (state, action) => {
      state.scheduledCoupons.loaded = true;
      state.scheduledCoupons.error = action.payload;
    });
    // GET EXPIRED COUPONS
    builder.addCase(getExpiredCoupons.pending, (state) => {
      state.expiredCoupons.loaded = false;
    });
    builder.addCase(getExpiredCoupons.fulfilled, (state, action) => {
      state.expiredCoupons.loaded = true;
      state.expiredCoupons.data = action.payload;
    });
    builder.addCase(getExpiredCoupons.rejected, (state, action) => {
      state.expiredCoupons.loaded = true;
      state.expiredCoupons.error = action.payload;
    });
    // GET COUPON TYPES
    builder.addCase(getCouponTypes.pending, (state) => {
      state.couponTypes.loaded = false;
    });
    builder.addCase(getCouponTypes.fulfilled, (state, action) => {
      state.couponTypes.loaded = true;
      state.couponTypes.data = action.payload;
    });
    builder.addCase(getCouponTypes.rejected, (state, action) => {
      state.couponTypes.loaded = true;
      state.couponTypes.error = action.payload;
    });
    // GET INFORMATION CREATE COUPON
    builder.addCase(getInformationCreateCoupon.pending, (state) => {
      state.informationCreateCoupon.loaded = false;
    });
    builder.addCase(getInformationCreateCoupon.fulfilled, (state, action) => {
      state.informationCreateCoupon.loaded = true;
      state.informationCreateCoupon.data = action.payload;
    });
    builder.addCase(getInformationCreateCoupon.rejected, (state, action) => {
      state.informationCreateCoupon.loaded = true;
      state.informationCreateCoupon.error = action.payload;
    });
  },
});

export default promotionSlice.reducer;
export const { clearErrorSubmitCreatedCoupon, resetSubmitCreatedCoupon } =
  promotionSlice.actions;
