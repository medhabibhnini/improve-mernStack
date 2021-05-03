import React from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";
const TopicSection = ({
  auth,
  post,
  addLikeToTopicPage,
  removeLikeFromPost,
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
                    
                    </div>
                </div>
            </div>
            

           
            
           
        </div>
</div>
</>
  );
};

export default TopicSection;
