import React, {useState, useEffect} from "react";
// @material-ui/core components
import {useSelector, useDispatch} from 'react-redux'
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import {useParams, useHistory} from 'react-router-dom'
// core components
import axios from 'axios'

import { isEmpty } from "../../utils/validation/Validation";
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
  title,description,user
})

setData({...data,err:'',success:res.data.msg})

} catch(err)
{
  err.response.data.msg && 
  setData({...data, err: err.response.data.msg, success: ''})
}

history.push('/posts')

    }
console.log(data)
  return (
    
<div class="container">
  <h1>Add post </h1>
  <form onSubmit={handleSubmit}>
    <div class="row">
      <div class="col-25">
        <label for="fname">Tile</label>
      </div>
      <div class="col-75">
        <input type="text" id="fname" name="title" onChange={handleChange} placeholder="title"/>
      </div>
    </div>
  
    <div class="row">
      <div class="col-25">
        <label for="subject">Description</label>
      </div>
      <div class="col-75">
        <textarea id="subject" name="description"  onChange={handleChange} placeholder="description" style={{height:200}}></textarea>
      </div>
    </div>
    <div class="row">
      <input type="submit" value="Submit"/>
    </div>
  </form>
</div>
  );
}
