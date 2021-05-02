import React from "react";
import TopicBlog from "./TopicBlog";


const TopicBlogWrapper = ({
  blogs,
  isTheOldest,
}) =>
blogs !== null &&
blogs.length > 0 &&
blogs.map((blog) => (
    <TopicBlog
      isTheOldest={isTheOldest}
      blog={blog}
      key={blog._id}
    />
  ));

export default TopicBlogWrapper;

