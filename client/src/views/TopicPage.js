import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { clearPost } from "../redux/actions/posts.actions/clearPost";
import { getPost } from "../redux/actions/posts.actions/getPost";
import { removeLikeFromPost } from "../redux/actions/likes.actions/removeLikeFromPost";
import { addLikeToTopicPage } from "../redux/actions/likes.actions/addLikeToTopicPage";
import { createComment } from "../redux/actions/comments.actions/createComment";

import CommentsWrapper from "../views/Comments/CommentsWrapper";
import TopicSection from "../views/TopicPosts/TopicSection";
import TopicPageForm from "../views/TopicPosts/TopicPageForm";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";

const TopicPage = ({
  clearPost,
  getPost,
  removeLikeFromPost,
  addLikeToTopicPage,
  createComment,
  match,
  auth,
  post,
}) => {
  useEffect(() => {
    clearPost();
    getPost(match.params.topic_id);
  }, []);

  return post === null || post === [] ? (
    <div className="all-page-wrapper flex__center">

    </div>
  ) : (
    <>
    <Header/>

    <div class="fb-cards-designs">
      <TopicSection
        post={post}
        auth={auth}
        removeLikeFromPost={removeLikeFromPost}
        addLikeToTopicPage={addLikeToTopicPage}
      />

   
       
   
       
<div class="clear" id="comment-list">
								<div class="comments-area" id="comments">
									<h2 class="comments-title">Comments</h2>
									<div class="clearfix m-b20">
                  <ol class="comment-list">
                    
     
        <CommentsWrapper comments={post.comments} />
        </ol>
     </div>
     </div>
     </div>
      
    <TopicPageForm auth={auth} post={post} createComment={createComment} />
 

    </div>
    <Footer/>
</>
  );
};

const mapDispatchToProps = {
  clearPost,
  getPost,
  removeLikeFromPost,
  addLikeToTopicPage,
  createComment,
};

const mapStateToProps = (state) => ({
  post: state.posts.post,
  auth: state.auth,
});

export default connect(mapStateToProps, mapDispatchToProps)(TopicPage);
