import React, { useState } from "react";

const TopicPageForm = ({ auth, createComment, post }) => {
  let [textOfTheComment, setTextOfTheComment] = useState("");

  const onChange = (e) => setTextOfTheComment(e.target.value);
  return (
    <form
      className="search-topic-wrapper"
      style={{ display: auth.isLogged ? "block" : "none" }}
    >
     

      <textarea
        value={textOfTheComment}
        onChange={(e) => onChange(e)}
        type="text"
      />

      <div
        className="topic-search-button app_color_background font__p font__bold"
        onClick={() => {
          createComment(textOfTheComment, post._id,auth);
          setTextOfTheComment("");
        }}
      >
        Add comment

      </div>
    
    </form>
  );
};

export default TopicPageForm;
