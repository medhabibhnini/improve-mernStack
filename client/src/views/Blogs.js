import React, { useState, useEffect } from "react";
import { getBlogs } from "../redux/actions/blog.actions/getBlogs"
import { connect } from "react-redux";
import TopicBlogWrapper from "./Blog/TopicBlogWrapper";
import Header from "../components/header/Header";
import { Link } from "react-router-dom";
import TopicBlog from "../views/Blog/TopicBlog";
const Blogs = ({
  blogs,
getBlogs,


}) => {
  let [topicsSortType, setTopicsSortType] = useState({
    isTheOldest: true,
  });

  let {

    isTheOldest,
  } = topicsSortType;
 
  useEffect(() => {
  if (isTheOldest) getBlogs();

  }, []);
  console.log(blogs.blogs)
  return (
    <>
  <Header/>
    
    
     
        <br />
        <br />
        <br />
        <br />
        <br />
        <div className="container">
        <Link to="/subject/add" className="btn btn-outline-primary btn-circle d-inline float-left">Add Subject</Link>
        <br></br>
        <div className="row mt-5">

         
    <TopicBlogWrapper
isTheOldest={isTheOldest}
    blogs={blogs.blogs}
   
    />
</div>
</div>
    </>
  );
};

const mapStateToProps = (state) => ({
  blogs: state.blogs,
});

const mapDispatchToProps = {
getBlogs,
};

export default connect(mapStateToProps, mapDispatchToProps)(Blogs);
