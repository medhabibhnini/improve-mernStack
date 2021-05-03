import React, {useState, useEffect} from 'react'
import Header from "../../components/header/Header"
import Footer from "../../components/footer/Footer"
import { Button } from 'react-bootstrap';
import { isEmpty } from "../../components/utils/validation/Validation";
import Swal from 'sweetalert2'

import image from "./soft.jpg"
import {useParams, useHistory} from 'react-router-dom'
import axios from 'axios'
import "../../components/body/home/home.css"
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
<br></br>
    <br></br>
    <br></br>
    <br></br>
  
<div  className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center" style={{minHeight: '600px' ,backgroundImage: 'url(https://www.eleapsoftware.com/wp-content/uploads/2018/02/education-and-business-background-1.jpg)', backgroundSize: 'cover', backgroundPosition: 'center top'}}>
<span className="mask bg-gradient-default opacity-8"></span>
<h1 class="titre" style={{marginLeft:"500px",fontSize:"100",color:"white"}}>imProve your skills </h1>
<div class="overlay"></div>
<div className="container-fluid d-flex align-items-center">
  <div className="row">
    <div className="col-lg-7 col-md-10">
    </div>
  </div>
</div>
</div>
<div class="container">
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
</div>
<Footer/>

</>





)

}