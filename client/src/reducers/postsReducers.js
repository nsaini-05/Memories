import {
  FETCH_ALL,
  DELETE,
  UPDATE,
  LIKE,
  CREATE,
} from "../constants/actionTypes";

export const postReducer = (posts = [], action) => {
  switch (action.type) {
    case FETCH_ALL:
      return action.payload;

    case CREATE:
      return [...posts, action.payload];

    case DELETE:
      console.log(action.payload);
      return posts.filter((post) => post._id !== action.payload);

    case UPDATE:
    case LIKE:
      return posts.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );

    default:
      return posts;
  }
};
