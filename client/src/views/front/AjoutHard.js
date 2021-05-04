import React, {useState, useEffect} from 'react'
import Header from "../../components/header/Header"
import Footer from "../../components/footer/Footer"
import { Button } from 'react-bootstrap';
import { isEmpty } from "../../components/utils/validation/Validation";
import Swal from 'sweetalert2'

import image from "./soft.jpg"
import {useParams, useHistory} from 'react-router-dom'
import axios from 'axios'
const initialState ={
    title :'',
    type :'',
    description :'',
    categorie:'',
    err: '',
    success: ''
    
    }
    
export default function AjoutHard()
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
{
  Swal.fire(
    'Error!',
    'You must fill all the blanks.',
    'error'
  )
  return setData({...data,err:"Please fill in all fields ", success :''})}
try {
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, add it!'
  }).then((result) => {
    if (result.isConfirmed) {
      const res =  axios.post('http://localhost:5000/hard/ajouthard',{
        title,type,description,categorie
      })
   //   setData({...data,err:'',success:res.data.msg})
      
      history.push("./listHard")
      
    }
  })

} catch(err)
{    Swal.fire(
  'Error!',
  'Sorry ,there is a problem',
  'error'
)
  /*err.response.data.msg && 
  setData({...data, err: err.response.data.msg, success: ''})
*/}



    }
return(

<>



<Header/>
<div class="page-banner ovbl-dark" style={{backgroundImage:"url(assets/images/banner/banner1.jpg)"}}>
          <div class="container">
              <div class="page-banner-entry">
                  <h1 class="text-white">Hard skills</h1>
       </div>
          </div>
      </div>
{/*<div class="container">
<h1 className="text-center py-4">Add hard skills</h1>

<form onSubmit={handleSubmit}>
<div class="form-group">
    <label for="email">Title :</label>
    <input type="text" class="form-control"  onChange={handleChange} id="email"name="title"/>
  </div>
  <div class="form-group">
    <label for="categorie">Categorie :</label>
    <input type="text" class="form-control"  onChange={handleChange} id="categorie" name="categorie"/>
  </div>
  <div class="form-group">
    <label for="domain">Domain :</label>
    <input type="text" class="form-control"  onChange={handleChange} id="domain" name="type"/>
  </div>
  <div class="form-group">
    <label for="pwd">Description:</label>
    <textarea  class="form-control" id="pwd"  onChange={handleChange} name="description"></textarea>
  </div>
 
  <button type="submit" class="btn btn-default">Submit</button>
</form>
</div>*/}


<main class="ttr-wrapper" style={{marginLeft:"5px"}}>
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
    <label for="categorie">Categorie</label>
    <input type="text" class="form-control"  onChange={handleChange} id="categorie" name="categorie"/>
  </div>
    <div class="form-group">
        <label for="subject">Description </label>
        <br></br>
        <textarea id="subject"  style={{marginLeft:"50px",marginTop:"100px"}}  class="form-control" name="description"  onChange={handleChange} placeholder="Write something.." style={{height:200}}></textarea>
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
<Footer/>

</>





)

}