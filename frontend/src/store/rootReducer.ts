import { combineReducers } from "@reduxjs/toolkit";
import { postReducer } from "./slices";

const rootReducer = combineReducers({
  posts: postReducer,
});

export { rootReducer };
