import { combineReducers } from "redux";

import { postReducer } from "./postsReducers";

export default combineReducers({
  posts: postReducer,
});
