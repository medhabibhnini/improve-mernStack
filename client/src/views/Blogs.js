import React, { useState, useEffect } from "react";
import {getBlogs} from "../redux/actions/blog.actions/getBlogs"
import { connect } from "react-redux";
import TopicBlogWrapper from "./Blog/TopicBlogWrapper";
import Header from "../components/header/Header";
import { Link } from "react-router-dom";
import TopicBlog from "../views/Blog/TopicBlog";
const Blogs = ({
getBlogs,
blogs

}) => {
 

 
  useEffect(() => {
 getBlogs();

  }, []);


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
      
     
      <div className="topics-wrapper">
      <Link to="/subject/add" className="btn btn-outline-primary btn-circle d-inline float-left">Add Subject</Link>
    <TopicBlogWrapper
    blogs={blogs.blogs}
    />
      </div>
      </div>
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
