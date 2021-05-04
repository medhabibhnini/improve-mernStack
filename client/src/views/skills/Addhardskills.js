import React, {useState, useEffect} from "react";
// @material-ui/core components
import {useHistory} from 'react-router-dom'

import "../../admin/assets/css/assets.css"
import "../../admin/assets/vendors/calendar/fullcalendar.css"
import "../../admin/assets/css/typography.css"
import "../../admin/assets/css/shortcodes/shortcodes.css"
import "../../assets/css/style.css"
import "../../admin/assets/css/dashboard.css"
import "../../assets/css/color/color-1.css"
import 'bootstrap/dist/css/bootstrap.min.css';




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
    categorie:'',
    err: '',
    success: ''
    
    }
    
export default  function Addhardskills()
{
    const history = useHistory()

    const [data, setData] = useState(initialState)
    const {title,type,description,categorie, err, success} = data
    const handleChange = e => {
      const {name, value} = e.target
      setData({...data, [name]:value, err:'', success: ''})
    }
    const handleSubmit = async e => {
e.preventDefault()
if(isEmpty(title) || isEmpty(type) || isEmpty(description) || isEmpty(categorie))

  return setData({...data,err:"Please fill in all fields ", success :''})
try {
const res = await axios.post('http://localhost:5000/hard/ajouthard',{
  title,type,description,categorie
})
setData({...data,err:'',success:res.data.msg})
history.push("./hardskills")
} catch(err)
{
  err.response.data.msg && 
  setData({...data, err: err.response.data.msg, success: ''})
}



    }
    return(
<> 
<Dashboard/>



<main class="ttr-wrapper" style={{marginLeft:"300px"}}>
		<div class="container-fluid">
			<div class="db-breadcrumb">
				<h4 class="breadcrumb-title">Add Hard</h4>
				<ul class="db-breadcrumb-list">
					<li><a href="#"><i class="fa fa-home"></i>Home</a></li>
					<li>Add Hard</li>
				</ul>
			</div>	
			<div class="row">
				<div class="col-lg-12 m-b30">
					<div class="widget-box">
						<div class="wc-title">
							<h4>Add Hard</h4>
						</div>
						<div class="widget-inner">
            <form onSubmit={handleSubmit} class="edit-profile m-b30">
    <div class="form-group">
        <label for="fname" >Title</label>
        <input type="text" id="fname"    style={{marginLeft:"45px",marginBottom:"25px"}}class="form-control" name="title" onChange={handleChange} placeholder="Communication.."/>
    </div>
    <div class="form-group">
        <label for="lname">Type</label>
        <input type="text" id="lname"  style={{marginLeft:"45px",marginBottom:"25px"}}  class="form-control" name="type"  onChange={handleChange} placeholder="type.."/>
      </div>
  
      <div class="form-group">
        <label for="cat">Categorie</label>
     <select name="categorie" id="cat" class="form-control"  style={{marginLeft:"15px",marginBottom:"25px"}} onChange={handleChange} name="categorie">
<option value="informatic">Informatic</option>
<option value="bussiness">Business</option>
<option value="Health care">Health care</option>
<option value="Mathematic">Mathematic</option>

     </select>
     
     
      </div>
    <div class="form-group">
        <label for="subject">Description </label>
        <br></br>
        <textarea id="subject"  style={{marginLeft:"50px"}}  class="form-control" name="description"  onChange={handleChange} placeholder="Write something.." style={{height:200}}></textarea>
    </div>
    <div class="row">
      <input type="submit" className="btn btn-primary" value="Confirm" style={{marginLeft:"500px"}}/>
    </div>
  </form>
						</div>
					</div>
				</div>
			</div>
		</div>
	</main>
</>

    )
}