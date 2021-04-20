import React from 'react'
import {Link} from 'react-router-dom'
import './ProductCard.css'
import {useSelector, useDispatch} from 'react-redux'
function PostCard({posts}) {
  const auth = useSelector(state => state.auth)
  const {user, isAdmin} = auth
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
                            <img src={posts.avatar} class="img-responsive" />
                        </div>
                        <div class="user-information">
                            <p>{posts.name} {posts.lastName}</p>
                         
                        </div>
                    </div>
                    <div class="post-action">
                        <i class="fas fa-ellipsis-h"></i>
                    </div>
                </div>
                <div class="fb-card-body simple-text-card simple-image-card simple-image-post">
                    <div class="images-container">
                        <a href="https://medium.com/@karthikricssion/how-to-design-a-printable-html-page-layout-802bc9ea61dd" target="_blank">
                            
                            <div class="sponsord-post-title-links">
                            <small>{posts.title}</small>
                                <h5>{posts.description}</h5>
                            </div>
                        </a>
                    </div>
                </div>

               
            </div>

            <div class="fb-card-like-comment-holder">
                <div class="fb-card-like-comment">
                    <div class="likes-emoji-holder">
                   
                    </div>
                    <div class="like-comment-holder">
                    
                    </div>
                </div>
            </div>

            <div class="fb-card-actions-holder">
                <div class="fb-card-actions">
                    <div class="fb-btn-holder">
                        <a href="#"><i class="far fa-thumbs-up"></i> Like</a>
                    </div>
                    <div class="fb-btn-holder">
                        <a href="#"><i class="far fa-comment-alt"></i> Comment</a>
                    </div>
                  
                </div>
            </div>

            <div class="fb-card-comments">
                <div class="comment-input-holder">
                    <div class="user-thumb">
                        <img src={user.avatar} class="img-responsive" />
                    </div>
                    <div class="comment-input">
                        <div class="comment-box" placeholder="Write a comment..." contenteditable="true" placeholder="write a comment"></div>
                    </div>
                </div>
            </div>
        </div>
</div>



      
       </>
    )
}

export default PostCard
