import {

    GET_BLOGS,
    GET_BLOG,
    BLOG_ERROR

  } from "../../constants/posts.constants";
  
  const initialState = {
    blogs: [],
    blog: null,
    isLoading: false,
    errors: {},
  };
  
  const blogs = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
     // case GET_BLOG:
      case GET_BLOGS:
      case BLOG_ERROR:
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
  