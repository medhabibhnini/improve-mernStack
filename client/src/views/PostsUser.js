import React,{useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {useParams, useHistory} from 'react-router-dom'
import axios from 'axios'
import {Link} from 'react-router-dom'
import Moment from "react-moment";
import UserPostsWrapper from "../views/UserPosts/UserPostsWrapper"

import { Button } from 'react-bootstrap';

import { $CombinedState } from 'redux'
import Header from '../components/header/Header';
const initialState ={
  title :'',
  type :'',
  description :'',
  err: '',
  success: ''
  
  }
  
function PostsUser  ()  {
const auth = useSelector(state => state.auth)
const [posts,getMyPosts] =useState([]);
const [loading, setLoading] = useState(false)
const [callback, setCallback] = useState(false)
const [data, setData] = useState(initialState)
const history = useHistory()

const user_id =auth.user._id
useEffect(()=>{
getUserPostById();},[]);
const getUserPostById =()=>{
axios.get(`http://localhost:5000/forum/posts/user_posts/${user_id}`)
    .then((response)=>{
        const Myposts =response.data;
            getMyPosts(Myposts);
        }).catch(error=>console.error(`Error :${error}`));


}
/*
const handleDelete = async (id) =>{
try{
  if(window.confirm("Are you sure ? Do you want to delete this soft skills"))
  {                  
      setLoading(true)
    await axios.delete(`http://localhost:5000/soft/deleteskills/${id}`, {

  })
  setLoading(false)
  setCallback(!callback)
  window.location.reload(false);

  }
  


} catch (err) {
  setData({...data, err: err.response.data.msg , success: ''})
}


}*/

    return (
        <>
    <Header/>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    

<UserPostsWrapper posts={posts}/>

   
</>

    
    )
                    }

export default PostsUser
