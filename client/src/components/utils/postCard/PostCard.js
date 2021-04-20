import React from 'react'
import {Link} from 'react-router-dom'
import './ProductCard.css'
import  {useState, useEffect} from "react";
// @material-ui/core components
import {useSelector, useDispatch} from 'react-redux'
import {useParams, useHistory} from 'react-router-dom'
// core components
import axios from 'axios'


import { isEmpty } from "../../utils/validation/Validation";
const initialState ={
    err: '',
    success: ''
    
    }
function PostCard({posts}) {
    const [loading, setLoading] = useState(false)
const [callback, setCallback] = useState(false)
const [data, setData] = useState(initialState)
    const handleLike = async (id) =>{
        try{
          if(window.confirm("Are you sure ? Do you want to delete this soft skills"))
          {                  
              setLoading(true)
            await axios.post(`http://localhost:5000/soft/deleteskills/${id}`, {
        
          })
          setLoading(false)
          setCallback(!callback)
          window.location.reload(false);
        
          }
          
        
        
        } catch (err) {
          setData({...data, err: err.response.data.msg , success: ''})
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
                        <a href="#"><i class="far fa-thumbs-up" onClick={() => handleLike(posts._id)} ></i> Like</a>
                    </div>
                    <div class="fb-btn-holder">
                        <Link to={`/forum/posts/${posts._id}`}><i class="far fa-comment-alt"></i> Comment</Link>
                    </div>
                  
                </div>
            </div>
           
        </div>
</div>



      
       </>
    )
}

export default PostCard
