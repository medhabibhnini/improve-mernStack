import {
  MOST_LIKED_POSTS,
  POST_ERROR,
} from "../../../constants/posts.constants";
import axios from "axios";

export const getMostLikedPosts = (blog_id) => async (dispatch) => {
  try {
    const res = await axios.get(
      `http://localhost:5000/forum/posts/most_liked/${blog_id}`
    );
    dispatch({ type: MOST_LIKED_POSTS, payload: res.data });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: error,
    });
  }
};
