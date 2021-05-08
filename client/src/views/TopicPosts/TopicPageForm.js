import React, { useState } from "react";

const TopicPageForm = ({ auth, createComment, post }) => {
  let [textOfTheComment, setTextOfTheComment] = useState("");

  const onChange = (e) => setTextOfTheComment(e.target.value);
  return (
  
     <>
     		    {/*<div class="comment-respond" id="respond">
											<h4 class="comment-reply-title" id="reply-title">Leave a Reply <small> <a style={{display:"none"}} href="#" id="cancel-comment-reply-link" rel="nofollow">Cancel reply</a> </small> </h4>
											<form class="comment-form" id="commentform" method="post">
											
												<p class="comment-form-comment">
													<label for="comment">Comment</label>
													<textarea rows="8" name="comment" placeholder="Comment" id="comment"></textarea>
												</p>
												<p class="form-submit">
													<input type="submit" value="Submit Comment" class="submit" id="submit" name="submit"/>
												</p>
											</form>
  </div>*/}
                   
                    
<form style={{ display: auth.isLogged ? "block" : "none" }}
    >
    <div class="comment-input-holder">
      
    <div class="user-thumb">
        <img src={auth.user.avatar} class="img-responsive" />
    </div>
 <div className="form-group">
        <input class="form-control" placeholder="write comment here"  value={textOfTheComment}
        onChange={(e) => onChange(e)}
        type="text" contenteditable="true" />
        <div class="post-action"   onClick={() => {
          createComment(textOfTheComment, post._id,auth);
          setTextOfTheComment("");
        }}>
                    <i class="fas fa-paper-plane"></i>
        </div>
       </div>
       
       
      
       </div>  
      
      </form>
      </>
  );
};

export default TopicPageForm;
