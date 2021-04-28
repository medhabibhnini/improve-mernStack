import React, { useState, useEffect } from "react";
import { getPosts } from "../redux/actions/posts.actions/getPosts";
import { getMostRecentPosts } from "../redux/actions/posts.actions/getMostRecentPosts";
import { getMostCommentedPosts } from "../redux/actions/posts.actions/getMostCommentedPosts";
import { getMostLikedPosts } from "../redux/actions/posts.actions/getMostLikedPosts";
import { searchTopics } from "../redux/actions/posts.actions/searchTopics";
import { connect } from "react-redux";
import TopicPostsWrapper from "./TopicPosts/TopicPostsWrapper";
import Header from "../components/header/Header";
import { Link } from "react-router-dom";
const Topics = ({
  getPosts,
  getMostRecentPosts,
  getMostCommentedPosts,
  getMostLikedPosts,
  searchTopics,
  posts,
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
    if (isTheOldest) getPosts();
    else if (isTheMostCommented) getMostCommentedPosts();
    else if (isTheMostLiked) getMostLikedPosts();
    else getMostRecentPosts();
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
    
    
     
        <br />
        <br />
        <br />
        <br />
        <br />
        <div className="container">
        <div class="d-flex flex-row">
        <div class="p-2">
        <div
          className={
            isTheMostRecent
     
          }
        >
          <input
            onChange={() => changeTopicsType("isTheMostRecent")}
            value={isTheMostRecent}
            checked={isTheMostRecent}
            type="checkbox"
          />
          <p onClick={() => changeTopicsType("isTheMostRecent")}>
            The most recent
          </p>
        </div>
</div>
<div class="p-2">
        <div
          className={
            isTheMostLiked
          
          }
        >
          <input
            type="checkbox"
            checked={isTheMostLiked}
            value={isTheMostLiked}
            onChange={() => changeTopicsType("isTheMostLiked")}
          />
          <p onClick={() => changeTopicsType("isTheMostLiked")}>
            The Most Liked 
          </p>
        </div>
        </div>
        
        <div class="p-2">
            <div
          className={
            isTheMostCommented
        
          }
        >
          <input
            type="checkbox"
            checked={isTheMostCommented}
            value={isTheMostCommented}
            onChange={() => changeTopicsType("isTheMostCommented")}
          />
          <p onClick={() => changeTopicsType("isTheMostCommented")}>
            The Most Commented  
          </p>
        </div>
</div>
        </div>
     
      <div className="topics-wrapper">
      <Link to="/posts/add" className="btn btn-outline-primary btn-circle d-inline float-left">Add Post</Link>
        <TopicPostsWrapper
          isTheOldest={isTheOldest}
          isTheMostCommented={isTheMostCommented}
          isTheMostRecent={isTheMostRecent}
          isTheMostLiked={isTheMostLiked}
          posts={posts.posts}
        />
      </div>
      </div>
     
    </>
  );
};

const mapStateToProps = (state) => ({
  posts: state.posts,
});

const mapDispatchToProps = {
  getPosts,
  getMostRecentPosts,
  getMostCommentedPosts,
  getMostLikedPosts,
  searchTopics,
};

export default connect(mapStateToProps, mapDispatchToProps)(Topics);
