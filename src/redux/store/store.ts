import { configureStore } from "@reduxjs/toolkit";
import { createLogger } from "redux-logger";
import userReducer from "../slices/user.slice";
import cartReducer from "../slices/cart.slice";
import curriculumReducer from "../slices/curriculum.slice";
import learningReducer from "../slices/learning.slice";
import promotionReducer from "../slices/promotions.slice";

const logger = createLogger({
  // ...options
});
const middleware = [logger];

export const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    curriculum: curriculumReducer,
    learning: learningReducer,
    promotion: promotionReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
