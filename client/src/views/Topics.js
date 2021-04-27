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
    
      <header >
        <p >
          Topics
        </p>
        <br />

        <div
          className={
            isTheOldest
              ? "header-checkbox app_color_font p__size font__p font__bold"
              : "header-checkbox app_color_font p__size font__p"
          }
        >
          <input
            type="checkbox"
            value={isTheOldest}
            checked={isTheOldest}
            onChange={() => changeTopicsType("isTheOldest")}
          />
          <p onClick={() => changeTopicsType("isTheOldest")}>The Oldest</p>
        </div>

        <div
          className={
            isTheMostRecent
              ? "header-checkbox app_color_font p__size font__p font__bold"
              : "header-checkbox app_color_font p__size font__p"
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

        <div
          className={
            isTheMostLiked
              ? "header-checkbox app_color_font p__size "
              : "header-checkbox app_color_font p__size font__p"
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

        <div
          className={
            isTheMostCommented
              ? "header-checkbox app_color_font p__size font__p font__bold"
              : "header-checkbox app_color_font p__size font__p"
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

        <form className="search-topic-wrapper">
          <textarea
            type="submit"
            value={dataFromSearch}
            onChange={(e) => onChange(e)}
          />

          <div
            className="topic-search-button app_color_background font__p font__bold"
            onClick={() => searchForTopic()}
          >
            Search for topic
          </div>
        </form>
      </header>
     
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
