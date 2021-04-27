import React, { useState, useEffect } from "react";
import { getPosts } from "../redux/actions/posts.actions/getPosts";
import { getMostRecentPosts } from "../redux/actions/posts.actions/getMostRecentPosts";
import { getMostCommentedPosts } from "../redux/actions/posts.actions/getMostCommentedPosts";
import { getMostLikedPosts } from "../redux/actions/posts.actions/getMostLikedPosts";
import { searchTopics } from "../redux/actions/posts.actions/searchTopics";
import { getUserPostsById } from "../redux/actions/posts.actions/getUserPostsById";
import { connect } from "react-redux";
import UserPostsWrapper from "./UserPosts/UserPostsWrapper";
import Header from "../components/header/Header";
import { Link } from "react-router-dom";
const PostsUser = ({
  getPosts,
  getMostRecentPosts,
  getMostCommentedPosts,
  getMostLikedPosts,
  searchTopics,
  getPostsUserById,
  posts,
  auth
}) => {
  let [dataFromSearch, setDataFromSearch] = useState("");
  let [topicsSortType, setTopicsSortType] = useState({
    isTheOldest: false,
    isTheMostRecent: true,
    isTheMostCommented: false,
    isTheMostLiked: false,
  });

  let {
    isTheMostCommented,
    isTheOldest,
    isTheMostLiked,
    isTheMostRecent,
  } = topicsSortType;

  useEffect(() => {
    getUserPostsById(auth.user.id);
 
  }, []);

  const onChange = (e) => setDataFromSearch(e.target.value);

  const searchForTopic = () => {
    if (dataFromSearch !== "" || dataFromSearch !== null) {
      return searchTopics(dataFromSearch);
    } else {
      setTopicsSortType({
        isTheMostRecent: true,
        isTheMostCommented: false,
        isTheMostLiked: false,
        isTheOldest: false,
      });
      getMostRecentPosts();
    }
  };

  const changeTopicsType = (changedType) => {
    if (changedType === "isTheMostLiked") {
      setTopicsSortType({
        isTheMostLiked: true,
        isTheOldest: false,
        isTheMostCommented: false,
        isTheMostRecent: false,
      });
      getMostLikedPosts();
    } else if (changedType === "isTheOldest") {
      setTopicsSortType({
        isTheMostLiked: false,
        isTheOldest: true,
        isTheMostCommented: false,
        isTheMostRecent: false,
      });
      getPosts();
    } else if (changedType === "isTheMostCommented") {
      setTopicsSortType({
        isTheMostLiked: false,
        isTheOldest: false,
        isTheMostCommented: true,
        isTheMostRecent: false,
      });
      getMostCommentedPosts();
    } else {
      setTopicsSortType({
        isTheMostLiked: false,
        isTheOldest: false,
        isTheMostCommented: false,
        isTheMostRecent: true,
      });
      getMostRecentPosts();
    }
  };

  return (
    <>
    <Header/>
    
     
      <div className="topics-wrapper">
   
        <UserPostsWrapper
 
          posts={posts.posts}
        />
      </div>
  
    </>
  );
};

const mapStateToProps = (state) => ({
  posts: state.posts,
  auth: state.auth
});

const mapDispatchToProps = {
  getPosts,
  getMostRecentPosts,
  getMostCommentedPosts,
  getMostLikedPosts,
  getUserPostsById,
  searchTopics,
};

export default connect(mapStateToProps, mapDispatchToProps)(PostsUser);
