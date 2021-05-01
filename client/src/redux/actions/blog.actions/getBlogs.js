import axios from "axios";
import { GET_BLOGS, BLOG_ERROR } from "../../../constants/posts.constants";

export const getBlogs = () => async (dispatch) => {
  try {
    const res = await axios.get("http://localhost:5000/blog/blogs");
      dispatch({ type: GET_BLOGS, payload: res.data });
  } catch (error) {
      dispatch({
      type: BLOG_ERROR,
      payload: error,
    });
  }
};
