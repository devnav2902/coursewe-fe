import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import userReducer from "../reducers/user.reducer";
import { createLogger } from "redux-logger";
import courseReducer from "../reducers/course.reducer";

const logger = createLogger({
  // ...options
});
const middleware = [thunk, logger];

const reducers = combineReducers({
  course: courseReducer,
  user: userReducer,
});
const store = createStore(reducers, applyMiddleware(...middleware));
export default store;
