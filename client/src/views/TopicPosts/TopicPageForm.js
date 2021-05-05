import React, { useState } from "react";

const TopicPageForm = ({ auth, createComment, post }) => {
  let [textOfTheComment, setTextOfTheComment] = useState("");

  const onChange = (e) => setTextOfTheComment(e.target.value);
  return (
  
     <>
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
