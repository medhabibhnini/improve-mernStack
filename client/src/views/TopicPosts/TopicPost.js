import React from "react";
import { connect } from "react-redux";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import { addLikeToPost } from "../../redux/actions/likes.actions/addLikeToPost";
import { removeLikeFromTopicPost } from "../../redux/actions/likes.actions/removeLikeFromTopicPost";
import "./posts.css"
const TopicPost = ({
  isTheOldest,
  isTheMostCommented,
  isTheMostRecent,
  isTheMostLiked,
  post,
  removeLikeFromTopicPost,
  addLikeToPost,
  auth,
}) => {
  return (
    <>
    
<link href="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css"/>
<script src="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>


<div class="fb-cards-designs">
    <div class="fb-clone-card">
            <div class="fb-card-main-content">
                <div class="fb-card-header">
                    <div class="user-post-info">
                        <div class="user-thumb">
                            <img src={post.avatar} class="img-responsive" />
                        </div>
                        <div class="user-information">
                            <p>{post.name} {post.lastName}</p>
                            <small> <Moment format="HH:mm YYYY-MM-DD">{post.date}</Moment></small>
                        </div>
                    </div>
                    <div class="post-action">
                        <i class="fas fa-ellipsis-h"></i>
                    </div>
                </div>
                <div class="fb-card-body simple-text-card simple-image-card simple-image-post">
                    <div class="images-container">
                      
                            
                            <div class="sponsord-post-title-links">
                            <small>{post.title}</small>
                                <h5>{post.description}</h5>
                            </div>
                     
                    </div>
                </div>

               
            </div>

            <div class="fb-card-like-comment-holder">
                <div class="fb-card-like-comment">
                    <div class="likes-emoji-holder">
                    <span>   {post.likes.length} <i class="fas fa-thumbs-up"></i>  
                  
                      </span> 
             
             
                    </div>
                    <div class="like-comment-holder">
                    <span>   {post.comments.length} Comments
                  
                  </span> 
                    </div>
                </div>
            </div>

            <div class="fb-card-actions-holder">
                <div class="fb-card-actions">
                    <div class="fb-btn-holder">
                        <Link /*onClick={() => handleLike(posts._id)}*/
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
                    <div class="fb-btn-holder">
                    <Link to={`/topics/topic/${post._id}`}>View more</Link>
                    </div>
                  
                </div>
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
};

export default connect(mapStateToProps, mapDispatchToProps)(TopicPost);
