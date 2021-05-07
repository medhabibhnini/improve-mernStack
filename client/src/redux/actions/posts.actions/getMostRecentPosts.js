import {
  THE_MOST_RECENT_POSTS,
  POST_ERROR,
} from "../../../constants/posts.constants";
import axios from "axios";

export const getMostRecentPosts = (blog_id) => async (dispatch) => {
  try {
    const res = await axios.get(
      `/forum/posts/the_most_recent/${blog_id}`
    );
    dispatch({ type: THE_MOST_RECENT_POSTS, payload: res.data });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: error,
    });
  }
};
