import React, { useState, useEffect } from "react";
import { getBlogs } from "../redux/actions/blog.actions/getBlogs"
import { connect } from "react-redux";
import TopicBlogWrapper from "./Blog/TopicBlogWrapper";
import Header from "../components/header/Header";
import { Link } from "react-router-dom";
import TopicBlog from "../views/Blog/TopicBlog";
import Footer from "../components/footer/Footer";
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
    
  <div class="page-content bg-white">
   
        <div class="page-banner ovbl-dark" style={{backgroundImage:"url(assets/images/banner/banner1.jpg)"}}>
            <div class="container">
                <div class="page-banner-entry">
                    <h1 class="text-white">Blog Classic</h1>
				 </div>
            </div>
        </div>
		<div class="breadcrumb-row">
			<div class="container">
				<ul class="list-inline">
					<li><a href="#">Home</a></li>
					<li>Blog Classic</li>
				</ul>
			</div>
		</div>

    <div class="content-block"> 
    <div class="section-area section-sp1">  
    <div class="container">
    <div class="ttr-blog-grid-3 row" id="masonry">
    <TopicBlogWrapper
isTheOldest={isTheOldest}
    blogs={blogs.blogs}
   
    />
    </div>
    </div>
    </div>
    </div>    
</div>
<Footer/>

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
