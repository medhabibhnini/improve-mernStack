import React, { useState } from "react";

const TopicPageForm = ({ auth, createComment, post }) => {
  let [textOfTheComment, setTextOfTheComment] = useState("");

  const onChange = (e) => setTextOfTheComment(e.target.value);
  return (
  
     <>
     		<h4 class="comment-reply-title" id="reply-title">Leave a Reply <small> <a style={{display:"none"}} href="#" id="cancel-comment-reply-link" rel="nofollow">Cancel reply</a> </small> </h4>
     			<form class="comment-form">
												
												<p class="comment-form-comment">
													<label for="comment">Comment</label>
													<textarea class="form-control" rows="8" name="comment" placeholder="Comment" id="comment"></textarea>
												</p>
									
												
                          <input type="submit" class="btn btn-primary" value="Confirm"  />
											</form>
   
      </>
  );
};

export default TopicPageForm;
