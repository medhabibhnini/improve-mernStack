import React, { useState } from "react";

const TopicPageForm = ({ auth, createComment, post }) => {
  let [textOfTheComment, setTextOfTheComment] = useState("");

  const onChange = (e) => setTextOfTheComment(e.target.value);
  return (
  
     <>
     	{/*	<h4 class="comment-reply-title" id="reply-title">Leave a Reply <small> <a style={{display:"none"}} href="#" id="cancel-comment-reply-link" rel="nofollow">Cancel reply</a> </small> </h4>
     			<form class="comment-form">
												
												<p class="comment-form-comment">
													<label for="comment">Comment</label>
													<textarea class="form-control" rows="8" name="comment" value={textOfTheComment}
                          onChange={(e) => onChange(e)} placeholder="Comment" id="comment"></textarea>
												</p>
									
												
                          <input type="submit" class="btn btn-primary" value="Confirm" onClick={() => {
          createComment(textOfTheComment, post._id,auth);
          setTextOfTheComment("");
        }} />
      </form>*/}
                         
<form style={{ display: auth.isLogged ? "block" : "none" }}
    >
    <div class="comment-input-holder">
      
    <div class="user-thumb">
    <div class="comment-author vcard"> <img  class="avatar photo" src={auth.user.avatar} alt=""/> <cite class="fn">{auth.user.name}</cite> <span class="says"></span> </div>

    </div>
 <div className="form-group">
        <input class="form-control" placeholder="write comment here"  value={textOfTheComment}
        onChange={(e) => onChange(e)}
        type="text" contenteditable="true" />
        <div style={{marginTop:"-30px"}}>
        <div style={{marginLeft:"100%"}} class="post-action"   onClick={() => {
          createComment(textOfTheComment, post._id,auth);
          setTextOfTheComment("");
        }}>
                    <i class="fas fa-paper-plane"></i>
        </div>
        </div>
       </div>
       
       
      
       </div>  
      
      </form>
   
      </>
  );
};

export default TopicPageForm;
