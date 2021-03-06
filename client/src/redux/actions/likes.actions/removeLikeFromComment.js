import axios from "axios";
import {
  REMOVE_LIKE_FROM_COMMENT,
  POST_ERROR,
} from "../../../constants/posts.constants";

export const removeLikeFromComment = (post_id, comment_id, like_id) => async (
  dispatch
) => {
  try {
    const res = await axios.delete(
      `/forum/posts/remove_like_from_comment/${post_id}/${comment_id}/${like_id}`
    );
    dispatch({ type: REMOVE_LIKE_FROM_COMMENT, payload: res.data });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: error,
    });
  }
};
