import axios from "axios";
import { REMOVE_POST, POST_ERROR } from "../../../constants/posts.constants";
import { getPost } from "../posts.actions/getPost";

export const removeLikeFromPost = (post_id, like_id) => async (dispatch) => {
  try {
    const res = await axios.delete(
      `/forum/posts/remove_like_from_post/${post_id}/${like_id}`
    );
    dispatch({ type: REMOVE_POST, payload: res.data });
    dispatch(getPost(post_id));
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: error,
    });
  }
};
