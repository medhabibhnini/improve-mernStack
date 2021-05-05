import React from "react";
import TopicPost from "./TopicPost";

const TopicPostsWrapper = ({
  isTheOldest,
  isTheMostCommented,
  isTheMostRecent,
  isTheMostLiked,
  posts,
  blog_id
}) =>
  posts !== null &&
  posts.length > 0 &&
  posts.map((post) => (
    <TopicPost
      isTheOldest={isTheOldest}
      isTheMostCommented={isTheMostCommented}
      isTheMostRecent={isTheMostRecent}
      isTheMostLiked={isTheMostLiked}
      blog_id={blog_id}
      post={post}
      key={post._id}
      
    />
  ));

export default TopicPostsWrapper;
