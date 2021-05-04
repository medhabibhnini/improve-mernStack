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
    <li class="comment">
   		<div class="comment-author vcard"> <img  class="avatar photo" src={comment.avatar} alt=""/> <cite class="fn">{comment.name}</cite> <span class="says">says:</span> </div>
													<div class="comment-meta"> <a href="#">{comment.date}</a> </div>
													<p>{comment.textOfTheComment}  </p>
													<div class="reply"> <a href="#" class="comment-reply-link">delete</a> </div>
									
    </li>

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
