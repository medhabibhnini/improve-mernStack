import {
  MAKE_POST,
  POST_ERROR,
  GET_POSTS,
  GET_POST,
  CLEAR_POSTS,
  CLEAR_POST,
  SEARCH_TOPICS,
  MOST_LIKED_POSTS,
  MOST_COMMENTED,
  THE_MOST_RECENT_POSTS,
  REMOVE_LIKE_FROM_COMMENT,
  GET_BLOG,
  GET_BLOGS
} from "../../constants/posts.constants";

const initialState = {
  blogs: [],
};

const blogs = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_BLOGS:  
    case THE_MOST_RECENT_POSTS:
    case SEARCH_TOPICS:
    case MOST_COMMENTED:
    case MOST_LIKED_POSTS:
      return {
        ...state,
        blogs: payload,
        errors: {},
        isLoading: false,
      };
    case POST_ERROR:
      return {
        ...state,
        errors: payload,
        isLoading: true,
      };
    default:
      return state;
  }
};

export default blogs;
