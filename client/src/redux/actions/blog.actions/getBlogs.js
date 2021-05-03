import axios from "axios";
import { GET_BLOGS, BLOG_ERROR } from "../../../constants/posts.constants";

export const getBlogs = () => async  (dispatch) => {
  try {
    const res = await axios.get("http://localhost:5000/blog/blogs");
    let list = [];
    for (var i=0; i < res.data.result; i++) {
     list.push(res.data.blogs[i])
  } 
   //console.log(list)
      dispatch({ type: GET_BLOGS, payload: list });
  } catch (error) {
      dispatch({
      type: BLOG_ERROR,
      payload: error,
    });
  }
};
