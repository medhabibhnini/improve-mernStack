import React, {useState, useEffect} from 'react'
import Header from "../../components/header/Header"
import Footer from "../../components/footer/Footer"
import { Button } from 'react-bootstrap';

import image from "./soft.jpg"
import {useParams, useHistory} from 'react-router-dom'
import axios from 'axios'
import "../../components/body/home/home.css"

export default function DetailCourse()
{
  const {id} = useParams()
  const history = useHistory()
  const [courses,getCourses] =useState([]);
  const getAllCourses =()=>{
    axios.get(`http://localhost:5000/api/courses/${id}`)
    .then((response)=>{
    const allCourses =response.data;
    getCourses(allCourses)
  
    
    }).catch(error=>console.error(`Error :${error}`));
    
    
    }



useEffect(()=>{
    getAllCourses() },[])
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


<div class="card mb-3" style={{marginTop:"20px", marginLeft:"50px",marginRight:"50px",backgrounColor:"blue"}}>
  <img class="card-img-top" src={courses.image} alt="Card image cap" style={{ marginLeft:"300px",height:"400px" ,width:"800px"}}/>
  <div class="card-body" style={{backgrounColor:"black"}}>
  <h2 class="card-title" style={{marginLeft:'30%',marginBottom:'0%',fontFamily:'Georgia, serif',fontStyle:'oblique',fontSize: '25px'}} > Title Of The Course:  {courses.title}</h2>

    <h5 class="card-title"  style={{marginLeft:'30%',marginBottom:'0%',fontFamily:'Georgia, serif',fontSize: '20px'}}>Category: {courses.category}</h5>
    <p class="card-text"  style={{marginLeft:'30%',marginBottom:'0%',fontFamily:'Georgia, serif',fontStyle:'oblique',fontSize: '15px'}}>{courses.description}</p>
    <Button className="btn btn-yellow" style={{marginLeft:"60%", marginTop:"20px"}}>Take This Course</Button>
    <p class="card-text"><small class="text-muted"></small></p>
  </div>
</div>



<Footer/>

</>





)

}