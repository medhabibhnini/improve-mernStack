import { MOST_COMMENTED, POST_ERROR } from "../../../constants/posts.constants";
import axios from "axios";

export const getMostCommentedPosts = (blog_id) => async (dispatch) => {
  try {
    const res = await axios.get(
      `/forum/posts/the_most_commented/${blog_id}`
    );
    dispatch({ type: MOST_COMMENTED, payload: res.data });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: error,
    });
  }
};
