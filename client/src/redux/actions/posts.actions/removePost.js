import { REMOVE_POST, POST_ERROR } from "../../../constants/posts.constants";
import { getUserPosts } from "./getUserPosts";
import axios from "axios";

export const removePost = (post_id) => async (dispatch) => {
  try {
    const res = await axios.delete(
      `/forum/posts/delete_post/${post_id}`
    );
    dispatch({ type: REMOVE_POST, payload: res.data });
    dispatch(getUserPosts());
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: error,
    });
  }
};
