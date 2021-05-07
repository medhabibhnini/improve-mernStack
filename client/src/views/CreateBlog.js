import React, {useState, useEffect} from "react";
// @material-ui/core components
import {useSelector, useDispatch} from 'react-redux'
import InputLabel from "@material-ui/core/InputLabel";
import {useParams, useHistory} from 'react-router-dom'
// core components
import {Link} from 'react-router-dom'
import axios from 'axios'
import Header from '../components/header/Header'
import Footer from '../components/footer/Footer'
import { isEmpty } from "../components/utils/validation/Validation";

  
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
const res = await axios.post('/blog/createblog',{
  title,description,user
})

setData({...data,err:'',success:res.data.msg})
history.push("/subjects")
} catch(err)
{
  err.response.data.msg && 
  setData({...data, err: err.response.data.msg, success: ''})
}


    }
console.log(data)
  return (
    <>
  <Header/>

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
     <li><Link to="/subjects">Blog</Link></li>
     <li>Add Subjects</li>
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
								<h2 class="title-head">Add <span>Subject</span></h2>
								<p>you can add a subject here</p>
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
									<button name="submit" type="submit" value="Submit" class="btn button-md"> Add </button>
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