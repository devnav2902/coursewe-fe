import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";
import courseReducer from "../reducers/course.reducer";
import accountReducer from "../reducers/account.reducer";
import cartReducer from "../reducers/cart.reducer";
import _ from "lodash";

const logger = createLogger({
  // ...options
});
const middleware = [thunk, logger];

const reducers = combineReducers({
  course: courseReducer,
  user: accountReducer,
  cart: cartReducer,
});

const persistedState = localStorage.getItem("shoppingCart:storage")
  ? JSON.parse(localStorage.getItem("shoppingCart:storage"))
  : {};

const store = createStore(
  reducers,
  persistedState,
  applyMiddleware(...middleware)
);

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("shoppingCart:storage", serializedState);
  } catch {
    // ignore write errors
  }
};

store.subscribe(
  _.throttle(() => {
    saveState(store.getState());
  }, 1000)
);

export default store;
