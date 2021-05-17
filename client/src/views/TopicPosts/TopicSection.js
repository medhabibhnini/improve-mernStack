import React from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { removePost } from "../../redux/actions/posts.actions/removePost";
import { useHistory } from "react-router-dom";
const TopicSection = ({
  auth,
  post,
  addLikeToTopicPage,
  removeLikeFromPost,
  removePost,
}) => {
    let history = useHistory();
  return (
      <>
<div class="col-lg-8 col-xl-8">
					
          <div class="recent-news blog-lg">
     
          <img src={post.avatar} class="img-responsive" />
        
            <div class="info-bx">
              <ul class="media-post">
                <li><a href="#"><i class="fa fa-calendar"></i> <Moment format="HH:mm YYYY-MM-DD">{post.date}</Moment></a></li>
                <li><a href="#"><i class="fa fa-comments-o"></i>{post.comments.length} comments</a></li>
                <li><a href="#"><i class="fas fa-thumbs-up"></i> {post.likes.length} likes </a></li>
                <li> <a href="#"> <div style={{marginLeft:"300px"}}>
          <div style={{ display: auth.isLogged && auth.user.name === post.name ? "block" : "none" }} class="post-action" 
                    onClick={() =>{
                     
                          removePost(post._id).then(history.push("/subjects"))}
                          
                        
                          } href="#">delete post</div></div></a></li>
                <li></li>
              </ul>
              <h5 class="post-title"><a href="#">{post.title}</a></h5>
              <p>{post.description}</p>
            
              <div class="ttr-divider bg-gray"><i class="icon-dot c-square"></i></div>
              
             
              <div class="ttr-divider bg-gray"><i class="icon-dot c-square"></i></div>
            </div>
          </div>
          <div class="clear" id="comment-list">
            <div class="comments-area" id="comments">
            
            
          
              </div>
            </div>
          </div>


        

            

           
            

</>
  );
};
const mapDispatchToProps = {
removePost
  };
  
  const mapStateToProps = (state) => ({
    post: state.posts.post,
    auth: state.auth,
  });

export default connect(mapStateToProps, mapDispatchToProps) (TopicSection);
