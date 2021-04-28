import React from "react";
import Moment from "react-moment";
import { connect } from "react-redux";
import { removeLikeFromComment } from "../../redux/actions/likes.actions/removeLikeFromComment";
import { addLikeToComment } from "../../redux/actions/likes.actions/addLikeToComment";
import { removeComment } from "../../redux/actions/comments.actions/removeComment";


const Comment = ({
  comment,
  auth,
  post,
  removeLikeFromComment,
  addLikeToComment,
  removeComment
}) => {

  return post === null || post === [] ? (
    <div className="all-page-wrapper flex__center">
    
    </div>
  ) : (
   
    <div class="comment-input-holder">
      
        <div class="user-thumb">
            <img src={comment.avatar} class="img-responsive" />
        </div>
        <div class="comment-input">
            <div class="comment-box" placeholder={comment.textOfTheComment} contenteditable="false" ></div>
            <div class="post-action"onClick={() => {
        
          
        removeComment(post._id, comment._id, )
    
    window.location.reload(true);
  }}
            >
                        <i class="fas fa-times" 
                         ></i>
            </div>
           </div>
           
           <div
            className="like-section"
            style={{ color: "rgb(42, 9, 9)" }}
            onClick={() => {
              if (comment.likes.find((like) => like.user === auth.user._id)) {
                comment.likes.find((like) =>
                  removeLikeFromComment(post._id, comment._id, like._id)
                );
              } else {
                addLikeToComment(post._id, comment._id ,auth);
              }
            }}
          >
           
              <i
                className={
                  comment.likes.find((like) => like.user === auth.user._id)
                    ? "fas fa-thumbs-up"
                    : "far fa-thumbs-up"
                }
              ></i>{comment.likes.length}
          
            </div>
    
          </div>
        
      
    

  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  post: state.posts.post,
});

const mapDispatchToProps = {
  removeLikeFromComment,
  addLikeToComment,
  removeComment
};

export default connect(mapStateToProps, mapDispatchToProps)(Comment);
