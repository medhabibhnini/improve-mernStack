import React, {useState, useEffect} from "react";
// @material-ui/core components

import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
// core components
import navi from "../../component/Sidebar/Sidebar";
import axios from 'axios'
import GridItem from "../../component/Grid/GridItem.js";
import GridContainer from "../../component/Grid/GridContainer.js";
import CustomInput from "../../component/CustomInput/CustomInput.js";
import Button from "../../component/CustomButtons/Button.js";
import Card from "../../component/Card/Card.js";
import CardHeader from "../../component/Card/CardHeader.js";
import CardAvatar from "../../component/Card/CardAvatar.js";
import CardBody from "../../component/Card/CardBody.js";
import CardFooter from "../../component/Card/CardFooter.js";
import avatar from "../../assets/img/faces/marc.jpg";
import { isEmpty } from "../../components/utils/validation/Validation";
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
type :'',
description :'',
err: '',
success: ''

}

export default function Softskills() {

    const [data, setData] = useState(initialState)
    const {title,type,description, err, success} = data
    const handleChange = e => {
      const {name, value} = e.target
      setData({...data, [name]:value, err:'', success: ''})
    }
    const handleSubmit = async e => {
e.preventDefault()
if(isEmpty(title) || isEmpty(type) || isEmpty(description))

  return setData({...data,err:"Please fill in all fields ", success :''})
try {
const res = await axios.post('http://localhost:5000/soft/ajoutSoft',{
  title,type,description
})
setData({...data,err:'',success:res.data.msg})
} catch(err)
{
  err.response.data.msg && 
  setData({...data, err: err.response.data.msg, success: ''})
}



    }
console.log(data)
  return (
    
<div class="container">
  <h1>Add soft skills </h1>
  <form onSubmit={handleSubmit}>
    <div class="row">
      <div class="col-25">
        <label for="fname">Tile</label>
      </div>
      <div class="col-75">
        <input type="text" id="fname" name="title" onChange={handleChange} placeholder="Communication.."/>
      </div>
    </div>
    <div class="row">
      <div class="col-25">
        <label for="lname">Type</label>
      </div>
      <div class="col-75">
        <input type="text" id="lname" name="type"  onChange={handleChange} placeholder="type.."/>
      </div>
    </div>
  
    <div class="row">
      <div class="col-25">
        <label for="subject">Description</label>
      </div>
      <div class="col-75">
        <textarea id="subject" name="description"  onChange={handleChange} placeholder="Write something.." style={{height:200}}></textarea>
      </div>
    </div>
    <div class="row">
      <input type="submit" value="Submit"/>
    </div>
  </form>
</div>
  );
}
