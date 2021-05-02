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
const res = await axios.post('http://localhost:5000/blog/createblog',{
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
  
   <div className="main-content">
<div className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center" style={{minHeight: '600px',backgroundImage: 'url(https://www.amalo-recrutement.fr/app/uploads/2020/01/soft-skills-scaled.jpg)', backgroundSize: 'cover', backgroundPosition: 'center top'}}>
              

              <h1 class="titre" style={{marginLeft:"100px",fontSize:"100",color:"white"}}>Post Here</h1>
<div class="overlay"></div>
</div>
<Link to="/topics" className="btn btn-outline-primary btn-circle d-inline float-right">Go back</Link>
    
<div class="container">
  <h1>Add Subjects </h1>
  <form onSubmit={handleSubmit}>
  <div class="form-group">
        <label for="fname">Title</label>
        <input type="text" id="fname"  class="form-control" name="title" onChange={handleChange} placeholder="title"/>
    </div>
   
    <div class="form-group">
        <label for="subject">Description</label>
        <textarea id="subject"  class="form-control" name="description"  onChange={handleChange} placeholder="Write something.." style={{height:200}}></textarea>
    </div>
    <div class="row">
      <input type="submit" className="btn btn-info" value="Submit"/>
     
    </div>
  
    </form>
</div>
</div>
<Footer/>
</>
  );
}