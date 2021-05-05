import React, {useState, useEffect} from "react";
// @material-ui/core components
import {useSelector, useDispatch} from 'react-redux'
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import {useParams, useHistory} from 'react-router-dom'
// core components
import {Link} from 'react-router-dom'
import axios from 'axios'
import Header from '../components/header/Header'
import Footer from '../components/footer/Footer'
import { isEmpty } from "../components/utils/validation/Validation";
const styles = {
    cardCategoryWhite: {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    cardTitleWhite: {
      color: "#FFFFFF",
      marginTop: "0px",
      minHeight: "auto",
      fontWeight: "300",
      fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
      marginBottom: "3px",
      textDecoration: "none"
    }
  };
  
const initialState ={
title :'',
description :'',
err: '',
success: '',
user:''
}

export default function CreatePost() {
    const auth = useSelector(state => state.auth)
    const {user} = auth
    const {blog_id}= useParams();
    console.log(blog_id);
    const history = useHistory()
    const [callback, setCallback] = useState(false)
    const [data, setData] = useState(initialState)
    const {title,description, err, success} = data
    const handleChange = e => {
      const {name, value} = e.target
      setData({...data, [name]:value, err:'', success: ''})
    }
    const handleSubmit = async e => {
e.preventDefault()
if(isEmpty(title)  || isEmpty(description))
       
  return setData({...data,err:"Please fill in all fields ", success :''})
 
try {
const res = await axios.post('http://localhost:5000/forum/posts',{
  title,description,user,blog_id
})

setData({...data,err:'',success:res.data.msg})
history.push(`/topics/${blog_id}`)
} catch(err)
{
  err.response.data.msg && 
  setData({...data, err: err.response.data.msg, success: ''})
}


    }
console.log(data)
  return (
    <>
  
  <div class="page-content bg-white">
   
   <div class="page-banner ovbl-dark" style={{backgroundImage:"url(assets/images/banner/banner1.jpg)"}}>
       <div class="container">
           <div class="page-banner-entry">
               <h1 class="text-white">Add subject</h1>
    </div>
       </div>
   </div>
<div class="breadcrumb-row">
 <div class="container">
   <ul class="list-inline">
     <li><Link to="/">Home</Link></li>
     <li><Link to="Subjects">Blog</Link></li>
     <li><Link to={`/topics/${blog_id}`}>Posts</Link></li>
     <li>Add Posts</li>
   </ul>
 </div>
</div>
<div class="page-banner contact-page section-sp2">
            <div class="container">
                <div class="row">
				
		
					<div class="col-lg-7 col-md-7">
						<form class="contact-bx ajax-form" onSubmit={handleSubmit} action="http://educhamp.themetrades.com/demo/assets/script/contact.php">
						<div class="ajax-message"></div>
							<div class="heading-bx left">
								<h2 class="title-head">Add <span>Post</span></h2>
								<p>you can add a post here</p>
							</div>
							<div class="row placeani">
								<div class="col-lg-6">
									<div class="form-group">
										<div class="input-group">
											
											<input type="text" name="title" placeholder="Subject Title" onChange={handleChange} required class="form-control valid-character"/>
										</div>
									</div>
								</div>
							
								<div class="col-lg-12">
									<div class="form-group">
										<div class="input-group">
						
											<textarea name="description"  placeholder="Write description" onChange={handleChange}  rows="4" class="form-control" required ></textarea>
										</div>
									</div>
								</div>
						
								<div class="col-lg-12">
									<button name="submit" type="submit" value="Submit" class="btn button-md"> Add post </button>
								</div>
							</div>
						</form>
					</div>
				</div>
            </div>
		</div>
				</div>
<Footer/>
</>
  );
}