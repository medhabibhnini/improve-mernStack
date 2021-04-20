import React from 'react'
import './DetailProductCard.css'
import Rating from '../rating/Rating'
import { isEmpty } from "../../utils/validation/Validation";
import  {useState, useEffect} from "react";
// @material-ui/core components
import {useSelector, useDispatch} from 'react-redux'
import {useParams, useHistory} from 'react-router-dom'
// core components
import axios from 'axios'
const initialState ={
  textOfTheComment :'',
  err: '',
  success: '',
  user:'',
  posts:''
  }
function DetailPostsCard({posts}) {
    const auth = useSelector(state => state.auth)
  const {user, isAdmin} = auth
  const [data, setData] = useState(initialState)
  const {textOfTheComment, err, success} = data
  const handleChange = e => {
    const {name, value} = e.target
    setData({...data, [name]:value, err:'', success: ''})
  }
  const handleSubmit = async e => {
    e.preventDefault()
    if(isEmpty(textOfTheComment))
           
      return setData({...data,err:"Please fill in all fields ", success :''})
     
    try {
    const res = await axios.post('http://localhost:5000/comments/comment',{
      textOfTheComment,user,posts
    })
    
    setData({...data,err:'',success:res.data.msg})
    
    } catch(err)
    {
      err.response.data.msg && 
      setData({...data, err: err.response.data.msg, success: ''})
    }
    
    
        }
    return (
      <>
      
<link href="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css"/>
<script src="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>


<div class="fb-cards-designs">
    <div class="fb-clone-card">
            <div class="fb-card-main-content">
                <div class="fb-card-header">
                    <div class="user-post-info">
                        <div class="user-thumb">
                            <img src={posts.avatar} class="img-responsive" />
                        </div>
                        <div class="user-information">
                            <p>{posts.name} {posts.lastName}</p>
                         
                        </div>
                    </div>
                    <div class="post-action">
                        <i class="fas fa-ellipsis-h"></i>
                    </div>
                </div>
                <div class="fb-card-body simple-text-card simple-image-card simple-image-post">
                    <div class="images-container">
                      
                            
                            <div class="sponsord-post-title-links">
                            <small>{posts.title}</small>
                                <h5>{posts.description}</h5>
                            </div>
                     
                    </div>
                </div>

               
            </div>

            <div class="fb-card-like-comment-holder">
                <div class="fb-card-like-comment">
                    <div class="likes-emoji-holder">
                   
                    </div>
                    <div class="like-comment-holder">
                    
                    </div>
                </div>
            </div>

            <div class="fb-card-actions-holder">
                <div class="fb-card-actions">
                    <div class="fb-btn-holder">
                        <a href="#"><i class="far fa-thumbs-up"></i> Like</a>
                    </div>
                    <div class="fb-btn-holder">
                        <a><i class="far fa-comment-alt"></i> Comment</a>
                    </div>
                  
                </div>
            </div>
            <form  onSubmit={handleSubmit}>
            <div class="fb-card-comments">
                <div class="comment-input-holder">
                    <div class="user-thumb">
                        <img src={user.avatar} class="img-responsive" />
                    </div>
                    <div class="comment-input">
                        <div class="comment-box" name="textOfTheComment" onChange={handleChange} placeholder="Write a comment..." contenteditable="true" placeholder="write a comment"></div>
                        
                    </div>
                
                  
                </div>
            </div>
            <button type="submit">submit</button>
            </form>
        </div>
</div>




      </>
    )
}

export default DetailPostsCard
