import axios from "axios";
import { GET_USER_POSTS, USER_ERROR } from "../../../constants/users.constants";

export const getUserPosts = () => async (dispatch) => {
  try {
    const res = await axios.get(`/forum/posts/user_posts`);
    dispatch({ type: GET_USER_POSTS, payload: res.data });
  } catch (error) {
    dispatch({
      type: USER_ERROR,
      payload: error,
    });
  }
};
