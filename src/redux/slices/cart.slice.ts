import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import CartApi from "../../api/cart.api";
import {
  ArrayShoppingCartResponse,
  CartType,
  CartTypes,
  Course,
  FormattedCart,
  FormattedCartItem,
  ShoppingCart,
  ShoppingCartResponseItem,
} from "../../ts/types/cart.types";

export type CartState = {
  loading: boolean;
  loadedCart: boolean;
  error: any;
} & FormattedCart;

export const getCart = createAsyncThunk<
  FormattedCart,
  undefined,
  {
    rejectValue: any;
  }
>("cart/getCart", async (_, { rejectWithValue }) => {
  try {
    const { data } = await CartApi.get();

    return data.shoppingCart.reduce((result, item) => {
      const { cartType, data, current_price, original_price, discount } = item;
      const type = cartType.type;

      return {
        ...result,
        [type]: { courses: data, current_price, original_price, discount },
      };
    }, {} as FormattedCart);
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const addToCart = createAsyncThunk<Course, number>(
  "cart/addToCart",
  async (id: number, { rejectWithValue }) => {
    // Giỏ hàng database
    try {
      const { data } = (await CartApi.addToCart({
        course_id: id,
      })) as AxiosResponse<{ course: Course }>;

      return data.course;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("error message: ", error.message);

        return rejectWithValue(error.message);
      } else {
        console.log("unexpected error: ", error);
        return rejectWithValue("An unexpected error occurred");
      }
    }
  }
);

// utils
const getItemsByCartType = (
  type: CartType["type"],
  arr: ArrayShoppingCartResponse
) => {
  const cartItems = arr.find(
    (cart) => cart.cartType.type === type
  ) as ShoppingCartResponseItem;

  return {
    courses: cartItems.data,
    original_price: cartItems.original_price,
    current_price: cartItems.current_price,
    discount: cartItems.discount,
  } as FormattedCartItem;
};

export const removeItem = createAsyncThunk<
  { type: CartType["type"]; data: FormattedCartItem },
  { id: number; type: CartType["type"] }
>("cart/removeItem", async ({ id, type }, { rejectWithValue }) => {
  try {
    const { data } = await CartApi.delete(id);

    const shoppingCartData =
      type === "cart"
        ? getItemsByCartType("cart", data.shoppingCart)
        : getItemsByCartType("saved_for_later", data.shoppingCart);

    return { type, data: shoppingCartData };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("error message: ", error.message);

      return rejectWithValue(error.message);
    }

    console.log("unexpected error: ", error);
    return rejectWithValue("An unexpected error occurred");
  }
});

export const moveToSavedForLater = createAsyncThunk<
  Omit<FormattedCart, CartTypes["wishlist"]>,
  number
>("cart/moveToSavedForLater", async (id: number, { rejectWithValue }) => {
  try {
    const {
      data: { shoppingCart },
    } = (await CartApi.savedForLater(id)) as AxiosResponse<ShoppingCart>;

    const cartItems = getItemsByCartType("cart", shoppingCart);
    const savedForLaterItems = getItemsByCartType(
      "saved_for_later",
      shoppingCart
    );

    return {
      saved_for_later: savedForLaterItems,
      cart: cartItems,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.message);
    }

    return rejectWithValue("An unexpected error occurred");
  }
});

export const moveToCart = createAsyncThunk<
  Omit<FormattedCart, CartTypes["wishlist"]>,
  number,
  { rejectValue: any }
>("cart/moveToCart", async (id: number, { rejectWithValue }) => {
  try {
    const { data } = (await CartApi.addToCart({
      course_id: id,
    })) as AxiosResponse<ShoppingCart>;

    const cartItems = getItemsByCartType("cart", data.shoppingCart);
    const savedForLaterItems = getItemsByCartType(
      "saved_for_later",
      data.shoppingCart
    );

    return {
      saved_for_later: savedForLaterItems,
      cart: cartItems,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.message);
    }

    return rejectWithValue("An unexpected error occurred");
  }
});

const initialCart = {
  courses: [],
  current_price: "0",
  original_price: "0",
  discount: "0",
};
const initialState: CartState = {
  cart: initialCart,
  saved_for_later: initialCart,
  wishlist: initialCart,
  loading: false, // Thêm/ xóa
  error: null,
  loadedCart: false, // load từ dtb
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // GET CART
    builder.addCase(getCart.fulfilled, (state, { payload }) => {
      state.cart = payload.cart;
      state.saved_for_later = payload.saved_for_later;
      state.wishlist = payload.wishlist;
      state.loadedCart = true;
    });
    builder.addCase(getCart.rejected, (state, { payload }) => {
      state.error = payload;
    });
    // ADD TO CART
    builder.addCase(addToCart.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addToCart.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.cart.courses.push(payload);
    });
    builder.addCase(addToCart.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
    // REMOVE ITEM
    builder.addCase(removeItem.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(removeItem.fulfilled, (state, { payload }) => {
      if (payload.type === "cart") state.cart = payload.data;
      else if (payload.type === "saved_for_later") {
        state.saved_for_later = payload.data;
      }

      state.loading = false;
    });
    builder.addCase(removeItem.rejected, (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    });
    // MOVE TO SAVED FOR LATER
    builder.addCase(moveToSavedForLater.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(moveToSavedForLater.fulfilled, (state, { payload }) => {
      state.cart = payload.cart;
      state.saved_for_later = payload.saved_for_later;
      state.loading = false;
    });
    builder.addCase(moveToSavedForLater.rejected, (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    });
    // MOVE TO CART
    builder.addCase(moveToCart.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(moveToCart.fulfilled, (state, { payload }) => {
      state.cart = payload.cart;
      state.saved_for_later = payload.saved_for_later;
      state.loading = false;
    });
    builder.addCase(moveToCart.rejected, (state, { payload }) => {
      state.error = payload;
      state.loading = false;
    });
  },
});

export default cartSlice.reducer;
