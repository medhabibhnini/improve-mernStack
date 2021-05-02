import axios from "axios";
import { ADD_LIKE, POST_ERROR } from "../../../constants/posts.constants";
import { getPosts } from "../posts.actions/getPosts";
import { getMostRecentPosts } from "../posts.actions/getMostRecentPosts";
import { getMostCommentedPosts } from "../posts.actions/getMostCommentedPosts";
import { getMostLikedPosts } from "../posts.actions/getMostLikedPosts";
import {useSelector, useDispatch} from 'react-redux'

export const addLikeToPost = (
  post_id,
  isOldest,
  isMostRecent,
  isMostCommented,
  isMostLiked,
  blog_id,
  auth
) => async (dispatch) => {
  //const auth = useSelector(state => state.auth)
console.log(auth)
  
  try {
    const res = await axios.put(
      `http://localhost:5000/forum/posts/likes/${post_id}`,auth
    );
    dispatch({ type: ADD_LIKE, payload: res.data });

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
    dispatch({
      type: POST_ERROR,
      payload: error,
    });
  }
};
