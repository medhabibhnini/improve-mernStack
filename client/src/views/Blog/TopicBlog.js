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
   
             
              
              
   
   <div className="col-md-4">
         <div className="card mb-4 shadow-sm">
            <img className="card-img-top" src="images/jelly-pro-2.jpeg"  alt=""/>
            <div className="card-body">
              <h4 className="card-title mb-3 text-dark">
                <a href="#" className="text-decoration-none text-dark font-weight-bold">
               {blog.title}
              </a>
              </h4>
              <p className="card-text">{blog.description} </p>
              
            </div>
             <div className="card-footer text-muted border-0 bg-white">
             <Link blog_id={blog._id} to={`/topics/${blog._id}`}>View more</Link>
            
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
