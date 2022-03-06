import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";
import courseReducer from "../reducers/course.reducer";
import accountReducer from "../reducers/account.reducer";

const logger = createLogger({
  // ...options
});
const middleware = [thunk, logger];

const reducers = combineReducers({
  course: courseReducer,
  user: accountReducer,
});
const store = createStore(reducers, applyMiddleware(...middleware));
export default store;
