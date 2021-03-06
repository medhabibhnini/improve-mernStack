import axios from "axios";
import { REMOVE_LIKE, POST_ERROR } from "../../../constants/posts.constants";
import { getPosts } from "../posts.actions/getPosts";
import { getMostRecentPosts } from "../posts.actions/getMostRecentPosts";
import { getMostCommentedPosts } from "../posts.actions/getMostCommentedPosts";
import { getMostLikedPosts } from "../posts.actions/getMostLikedPosts";

export const removeLikeFromTopicPost = (
  post_id,
  like_id,
  isOldest,
  isMostRecent,
  isMostCommented,
  isMostLiked,
  blog_id
) => async (dispatch) => {
  try {
    const res = await axios.delete(
      `/forum/posts/remove_like_from_post/${post_id}/${like_id}`
    );
    dispatch({
      type: REMOVE_LIKE,
      payload: res.data,
    });
    if (isOldest) {
      dispatch(getPosts(blog_id));
    } else if (isMostRecent) {
      dispatch(getMostRecentPosts(blog_id));
    } else if (isMostCommented) {
      dispatch(getMostCommentedPosts(blog_id));
    } else if (isMostLiked) {
      dispatch(getMostLikedPosts(blog_id));
    }
  } catch (error) {
    dispatch({ type: POST_ERROR });
  }
};
