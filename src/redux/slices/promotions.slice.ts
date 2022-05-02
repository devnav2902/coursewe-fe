import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import PromotionApi, {
  InformationCreateCoupon,
  ScheduledCoupons,
} from "../../api/promotions.api";
import { CouponTypes } from "../../ts/types/coupon.types";

type PromotionState = {
  expiredCoupons: {
    loaded: boolean;
    data: [];
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
};

const initialState: PromotionState = {
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
  number
>(
  "promotions/getInformationCreateCoupon",
  async (courseId, { rejectWithValue }) => {
    try {
      const { data } = await PromotionApi.getInformationCreateCoupon(courseId);

      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const promotionSlice = createSlice({
  name: "promotions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
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
