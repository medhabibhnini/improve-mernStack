import React, { useState, useEffect } from "react";
import { getPosts } from "../redux/actions/posts.actions/getPosts";
import { getMostRecentPosts } from "../redux/actions/posts.actions/getMostRecentPosts";
import { getMostCommentedPosts } from "../redux/actions/posts.actions/getMostCommentedPosts";
import { getMostLikedPosts } from "../redux/actions/posts.actions/getMostLikedPosts";
import { searchTopics } from "../redux/actions/posts.actions/searchTopics";
import { connect } from "react-redux";
import TopicPostsWrapper from "./TopicPosts/TopicPostsWrapper";
import Header from "../components/header/Header";
import { Link, useParams } from "react-router-dom";
import Footer from "../components/footer/Footer";


const Topics = ({
  getPosts,
  getMostRecentPosts,
  getMostCommentedPosts,
  getMostLikedPosts,
  searchTopics,
  posts,
 
}) => {
  let [dataFromSearch, setDataFromSearch] = useState("");
  //let [blog_id, setblog] = useState(blog);
 const { blog_id }= useParams();

  let [topicsSortType, setTopicsSortType] = useState({
    isTheOldest: true,
    isTheMostRecent: false,
    isTheMostCommented: false,
    isTheMostLiked: false,
  });

  let {
    isTheMostCommented,
    isTheOldest,
    isTheMostLiked,
    isTheMostRecent,
  } = topicsSortType;

  useEffect(() => {

   
    if (isTheMostRecent) getMostRecentPosts(blog_id);
    else if (isTheMostCommented) getMostCommentedPosts(blog_id);
    else if (isTheMostLiked) getMostLikedPosts(blog_id);
    else getPosts(blog_id) ;
  }, []);

  const onChange = (e) => setDataFromSearch(e.target.value);

  const searchForTopic = () => {
    if (dataFromSearch !== "" || dataFromSearch !== null) {
      return searchTopics(dataFromSearch);
    } else {
      setTopicsSortType({
        isTheMostRecent: true,
        isTheMostCommented: false,
        isTheMostLiked: false,
        isTheOldest: false,
      });
      getMostRecentPosts(blog_id);
    }
  };

  const changeTopicsType = (changedType) => {
    if (changedType === "isTheMostLiked") {
      setTopicsSortType({
        isTheMostLiked: true,
        isTheOldest: false,
        isTheMostCommented: false,
        isTheMostRecent: false,
      });
      getMostLikedPosts(blog_id);
    } else if (changedType === "isTheOldest") {
      setTopicsSortType({
        isTheMostLiked: false,
        isTheOldest: true,
        isTheMostCommented: false,
        isTheMostRecent: false,
      });
      getPosts(blog_id);
    } else if (changedType === "isTheMostCommented") {
      setTopicsSortType({
        isTheMostLiked: false,
        isTheOldest: false,
        isTheMostCommented: true,
        isTheMostRecent: false,
      });
      getMostCommentedPosts(blog_id);
    } else {
      setTopicsSortType({
        isTheMostLiked: false,
        isTheOldest: false,
        isTheMostCommented: false,
        isTheMostRecent: true,
      });
      getMostRecentPosts(blog_id);
    }
  };

  return (
    <>
    <Header/>
    
    <div class="page-content bg-white">
  
        <div class="page-banner ovbl-dark" style={{backgroundImage:"url(assets/images/banner/banner1.jpg)"}}>
            <div class="container">
                <div class="page-banner-entry">
                    <h1 class="text-white">Subjects Posts</h1>
				</div>
            </div>
        </div>
        <div class="breadcrumb-row">
			<div class="container">
				<ul class="list-inline">
					<li><Link to="/subjects">go Back</Link></li>
					<li>Posts</li>
          <li><Link to={`/posts/add/${blog_id}`}>Add Post</Link></li>
          <li></li>
         
				</ul>
			</div>
		</div>
    
 <div className="container">
        <div class="d-flex flex-row">
        
        <div class="p-2">
        <div
          className={
            isTheOldest
          }
        >
          <input
            onChange={() => changeTopicsType("isTheOldest")}
            value={isTheOldest}
            checked={isTheOldest}
            type="checkbox"
          />
          <p onClick={() => changeTopicsType("isTheOldest")}>
           the Oldest
          </p>
        </div>
</div>
        <div class="p-2">
        <div
          className={
            isTheMostRecent
     
          }
        >
          <input
            onChange={() => changeTopicsType("isTheMostRecent")}
            value={isTheMostRecent}
            checked={isTheMostRecent}
            type="checkbox"
          />
          <p onClick={() => changeTopicsType("isTheMostRecent")}>
            The most recent
          </p>
        </div>
</div>

<div class="p-2">
        <div
          className={
            isTheMostLiked
          
          }
        >
          <input
            type="checkbox"
            checked={isTheMostLiked}
            value={isTheMostLiked}
            onChange={() => changeTopicsType("isTheMostLiked")}
          />
          <p onClick={() => changeTopicsType("isTheMostLiked")}>
            The Most Liked 
          </p>
        </div>
        </div>
        
        <div class="p-2">
            <div
          className={
            isTheMostCommented
        
          }
        >
          <input
            type="checkbox"
            checked={isTheMostCommented}
            value={isTheMostCommented}
            onChange={() => changeTopicsType("isTheMostCommented")}
          />
          <p onClick={() => changeTopicsType("isTheMostCommented")}>
            The Most Commented  
          </p>
        </div>
        </div>
</div>
        </div>
    <div class="content-block">
			<div class="section-area section-sp1">
				<div class="container">
        <div class="row">
        <div class="col-lg-8">
     

      <br></br>
        <TopicPostsWrapper
          isTheOldest={isTheOldest}
          isTheMostCommented={isTheMostCommented}
          isTheMostRecent={isTheMostRecent}
          isTheMostLiked={isTheMostLiked}
          posts={posts.posts}
          blog_id={blog_id}
        />
    
					
				
					
						</div>
        <div class="col-lg-4 sticky-top">
							<aside class="side-bar sticky-top">
								<div class="widget">
									<h6 class="widget-title">Search</h6>
									<div class="search-bx style-1">
										<form role="search" method="post">
											<div class="input-group">
												<input name="text" class="form-control" placeholder="Enter your keywords..." type="text"/>
												<span class="input-group-btn">
													<button type="submit" class="fa fa-search text-primary"></button>
												</span> 
											</div>
										</form>
									</div>
								</div>
				
									<h6 class="widget-title">you can add a post here</h6>
									<div class="news-box">
										<p></p>
										
											<div class="input-group">
											
												<Link to={`/posts/add/${blog_id}`} class="btn black radius-no">
													Add Post
												</Link>
											</div>
										
									</div>
								
								
							
							</aside>
						</div>
        </div>

        </div>
     
       </div>
  </div>
  </div>
 
     <Footer/>
    </>
  );
};

const mapStateToProps = (state) => ({
  posts: state.posts,
});

const mapDispatchToProps = {
  getPosts,
  getMostRecentPosts,
  getMostCommentedPosts,
  getMostLikedPosts,
  searchTopics,
};

export default connect(mapStateToProps, mapDispatchToProps)(Topics);
