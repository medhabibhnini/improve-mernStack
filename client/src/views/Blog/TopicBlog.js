import React from "react";
import { connect } from "react-redux";
import Moment from "react-moment";
import { Link } from "react-router-dom";

import "../TopicPosts/posts.css"
import Topics from "../Topics";
const TopicBlog = ({
 blog
}) => {


 
  return (
    <>
 
 <div class="post action-card col-lg-4 col-md-6 col-sm-12 col-xs-12 m-b40">
							<div class="recent-news">
								<div class="action-box">
                <img src="assets/images/blog/latest-blog/blog.jpg" alt=""/>
								</div>
								<div class="info-bx">
									<ul class="media-post">
										<li><a href="#"><i class="fa fa-calendar"></i>{blog.date}</a></li>
                  	<li><a href="#"><i class="fa fa-user"></i>{blog.name}</a></li>
									</ul>
                  <h5 class="post-title"><a href="blog-details.html">title: {blog.title}</a></h5>
									<p>{blog.description}</p>
									<div class="post-extra">
										<Link  blog_id={blog._id} to={`/topics/${blog._id}`} class="btn-link">READ MORE</Link>
									
									</div>
								</div>
							</div>
						</div>
        
              
              
   
  
     
        

    </>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  blogs: state.blogs,
});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(TopicBlog);
