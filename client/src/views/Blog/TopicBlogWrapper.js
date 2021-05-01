import React from "react";
import TopicBlog from "./TopicBlog";


const TopicBlogWrapper = ({
blogs
}) =>
  blogs !== null &&
  blogs.length > 0 &&
  blogs.map((blog) => (
    <TopicBlog
    blog={blog}
    key={blog.id}
    />,
    console.log(blogs)
  
  ));
 

export default TopicBlogWrapper;
