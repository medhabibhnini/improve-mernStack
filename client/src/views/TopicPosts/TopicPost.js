import React from "react";
import { connect } from "react-redux";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import { addLikeToPost } from "../../redux/actions/likes.actions/addLikeToPost";
import { removeLikeFromTopicPost } from "../../redux/actions/likes.actions/removeLikeFromTopicPost";
import { removePost } from "../../redux/actions/posts.actions/removePost";
import "./posts.css"
import Header from "../../components/header/Header";
const TopicPost = ({
  isTheOldest,
  isTheMostCommented,
  isTheMostRecent,
  isTheMostLiked,
  post,
  removeLikeFromTopicPost,
  addLikeToPost,
  removePost,
  blog_id,
  auth,
}) => {
  
  return (
    <>
   
   <div class="blog-post blog-md clearfix">
  
             
								<div class="ttr-post-media"> 
									<a href="#"><img src={post.avatar} class="img-responsive" alt=""/></a> 
								</div>
								<div class="ttr-post-info">
									<ul class="media-post">
										<li><a href="#"><i class="fa fa-calendar"></i> <Moment format="HH:mm YYYY-MM-DD">{post.date}</Moment></a></li>
										<li><a href="#"><i class="fa fa-user"></i>{post.name} {post.lastName}</a></li>
									</ul>
									<h5 class="post-title"><a href="blog-details.html">{post.title}</a></h5>
									<p>{post.description}</p>
                      
                  <span>    <i class="fas fa-thumbs-up"></i>  {post.likes.length} Likes
                  
                  </span> 
                
      
										<a href="#" class="comments-bx"> {post.comments.length} Comment</a>
									<div class="post-extra">
              <div class="fb-btn-holder" style={{ display: auth.isLogged ? "block" : "none" }}>
                        <Link 
                         onClick={() => {
                            if (post.likes.find((like) => like.user === auth.user._id)) {
                              post.likes.find((like) =>
                              removeLikeFromTopicPost(
                                post._id,
                                like._id,
                                isTheOldest,
                                isTheMostRecent,
                                isTheMostCommented,
                                isTheMostLiked,
                                blog_id,
                                auth
                              )
                            );
                          } else {
                            addLikeToPost(
                              post._id,
                              isTheOldest,
                              isTheMostRecent,
                              isTheMostCommented,
                              isTheMostLiked,
                              blog_id,
                              auth
                            );
                            }
                          }}
                         ><i  className={
                            post.likes.find((like) => like.user === auth.user._id)
                              ? "fas fa-thumbs-up"
                              : "far fa-thumbs-up"
                          } ></i></Link>
                    </div>
                    <Link to={`/topics/topic/${post._id}`} class="comments-bx btn black radius-no"> View Details</Link> 
                 
									</div>
								</div>
							</div>



    </>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = {
  addLikeToPost,
  removeLikeFromTopicPost,
  removePost
};

export default connect(mapStateToProps, mapDispatchToProps)(TopicPost);
