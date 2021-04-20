import React, {useState, useEffect} from "react";
// @material-ui/core components
import {useHistory} from 'react-router-dom'


import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
// core components
import axios from 'axios'
import Dashboard from "../../components/body/dashboard/dashboard"

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
  const history = useHistory()

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
history.push("./softskills")
} catch(err)
{
  err.response.data.msg && 
  setData({...data, err: err.response.data.msg, success: ''})
}



    }
console.log(data)
  return (
    <>
    <Dashboard/>
<div class="container" style={{marginLeft:"300px",marginTop:"100px"}}>
<div  id="headers"className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center" style={{height:"400px" ,backgroundImage: 'url(https://www.amalo-recrutement.fr/app/uploads/2020/01/soft-skills-scaled.jpg)', backgroundSize: 'cover', backgroundPosition: 'center top'}}>
              

              <h1 class="titre" style={{marginLeft:"200px",fontSize:"100",color:"white"}}> Add soft skills </h1>
<div class="overlay"></div>
</div>  <form onSubmit={handleSubmit}>
    <div class="form-group">
        <label for="fname"  style={{marginLeft:'10px',marginBottom:'0%',fontFamily:'Georgia, serif',fontStyle:'oblique',fontSize: '20px'}}>Title :</label>
        <input type="text" id="fname"  class="form-control" name="title" onChange={handleChange} placeholder="Communication.."/>
    </div>
 
      <div class="form-group">
        <label for="cat">Categorie</label>
     <select name="type" id="cat" class="form-control" onChange={handleChange} >
<option value="Communication">Communication</option>
<option value="Leadership">Leadership</option>
<option value="Health Influencing">Influencing</option>
<option value="Interpersonal skills">Interpersonal skills</option>
<option value="personal skills">personal skills</option>
<option value="Creativity">Creativity</option>
<option value="Professional skills">Professional skills</option>

     </select>
     
     
      </div>





    <div class="form-group">
        <label for="subject"  style={{marginLeft:'10px',marginBottom:'0%',fontFamily:'Georgia, serif',fontStyle:'oblique',fontSize: '20px'}}>Description :</label>
        <textarea id="subject"  class="form-control" name="description"  onChange={handleChange} placeholder="Write something.." style={{height:200}}></textarea>
    </div>
    <div class="row">
      <input type="submit" className="btn btn-primary" value="Submit"/>
    </div>
  </form>
</div>
</>
  );
}
