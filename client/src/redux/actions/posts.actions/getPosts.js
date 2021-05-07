import axios from "axios";
import { GET_POSTS, POST_ERROR } from "../../../constants/posts.constants";

export const getPosts = (blog_id) => async (dispatch) => {

  try {
    const res = await axios.get(`/forum/posts/${blog_id}`);
    console.log(res.data)
    let list = [];
    for (var i=0; i < res.data.result; i++) {
     list.push(res.data.posts[i])
  } 
      dispatch({ type: GET_POSTS, payload: list});
  } catch (error) {
      dispatch({
      type: POST_ERROR,
      payload: error,
    });
  }
};
