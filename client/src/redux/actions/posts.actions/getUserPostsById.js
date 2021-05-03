import axios from "axios";
import {
  GET_POST_BY_USER_ID,
  USER_ERROR,
} from "../../../constants/users.constants";

export const getUserPostsById = (auth) => async (dispatch) => {
  try {
    console.log(auth)
    const user_id=auth.user._id
    const res = await axios.get(
      `http://localhost:5000/forum/posts/user_posts/${user_id}`,
    );
    console.log(res.data)
    dispatch({ type: GET_POST_BY_USER_ID, payload: res.data });
  } catch (error) {
    dispatch({
      type: USER_ERROR,
      payload: error,
    });

  }
};