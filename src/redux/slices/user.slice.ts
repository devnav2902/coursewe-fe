import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import UserApi, { ParamsSignUp } from "../../api/user.api";
import { User } from "../../ts/types/user.types";

export interface UserState {
  loaded: boolean;
  profile: User | null;
  error: any;
}

const initialState: UserState = {
  loaded: false,
  profile: null,
  error: null,
};

export const logout = createAsyncThunk("user/logout", async () => {
  const { status } = await UserApi.logout();
  if (status === 200) {
    return true;
  }
});

interface DataUser {
  data: { user: User; error: string };
  status: number;
}

interface PramsLogin {
  email: string;
  password: string;
}

export const signUp = createAsyncThunk<User, ParamsSignUp>(
  "user/signUp",
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await UserApi.signUp(params);

      return data.user;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const login = createAsyncThunk<
  User,
  PramsLogin,
  {
    rejectValue: string | any;
  }
>("user/login", async ({ password, email }, { rejectWithValue }) => {
  try {
    const { data } = await UserApi.login({
      password,
      email,
    });

    return data.user;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data?.error);
    }
    return rejectWithValue("Lỗi trong quá trình đăng nhập!");
  }
});

export const getCurrentUser = createAsyncThunk<
  User,
  undefined,
  {
    rejectValue: any;
  }
>("user/getCurrentUser", async (_, { rejectWithValue }) => {
  try {
    const response = await UserApi.getCurrentUser();
    const { data, status } = (await response) as DataUser;
    if (status === 200) return data.user;

    return rejectWithValue(data.error);
  } catch (error) {
    return rejectWithValue(error);
  }
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // LOGOUT
    builder.addCase(logout.fulfilled, (state) => {
      state.profile = initialState.profile;
      state.error = initialState.error;
    });
    builder.addCase(logout.rejected, (state, payload) => {
      console.log(payload);
      state.error = payload.error;
    });

    // LOGIN
    builder.addCase(login.pending, (state) => {
      state.loaded = false;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.profile = action.payload;
      state.loaded = true;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.error = action.payload;
      state.loaded = true;
    });

    // GET CURRENT USER
    builder.addCase(getCurrentUser.pending, (state) => {
      state.loaded = false;
    });
    builder.addCase(getCurrentUser.fulfilled, (state, action) => {
      state.profile = action.payload;
      state.loaded = true;
    });
    builder.addCase(getCurrentUser.rejected, (state, action) => {
      state.error = action.payload;
      state.loaded = false;
    });
    // SIGN UP
    builder.addCase(signUp.pending, (state) => {
      state.loaded = false;
    });
    builder.addCase(signUp.fulfilled, (state, action) => {
      state.profile = action.payload;
      state.loaded = true;
    });
    builder.addCase(signUp.rejected, (state, action) => {
      state.error = action.payload;
      state.loaded = true;
    });
  },
});

export default userSlice.reducer;
