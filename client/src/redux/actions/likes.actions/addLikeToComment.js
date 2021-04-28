import { getPost } from "../posts.actions/getPost";
import axios from "axios";
import { LIKE_COMMENT, POST_ERROR } from "../../../constants/posts.constants";

export const addLikeToComment = (post_id, comment_id,auth) => async (dispatch) => {
  try {
    const res = await axios.put(
      `http://localhost:5000/forum/posts/like_comment/${post_id}/${comment_id}`,auth
    );
    dispatch({ type: LIKE_COMMENT, payload: res.data });
    dispatch(getPost(post_id));
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: error,
    });
  }
};
