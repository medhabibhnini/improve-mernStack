import React from "react";
import { connect } from "react-redux";
import Moment from "react-moment";
import { Link } from "react-router-dom";

import "../TopicPosts/posts.css"
const TopicBlog = ({
 blog
}) => {
  

 
  return (
    <>
 <div class="fb-card-body simple-text-card simple-image-card simple-image-post">
                    <div class="images-container">
                      
                            
                            <div class="sponsord-post-title-links">
                            <small>{blog.title}</small>
                                <h5>{blog.description}</h5>
                            </div>
                     
                    </div>
                </div>

    </>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  blogs: state.blogs
});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(TopicBlog);
