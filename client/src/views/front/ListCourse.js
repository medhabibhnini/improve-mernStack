import React,{useState, useEffect} from 'react'
import Header from "../../components/header/Header"
import Footer from "../../components/footer/Footer"
import axios from 'axios'
import { Button } from 'react-bootstrap';

import {Link} from 'react-router-dom'

export default function ListSoft  (){
  const [courses,getCourses] =useState([]);
 
  useEffect(()=>{
    getAllCourses();},[]);
    const getAllCourses =()=>{
    axios.get('http://localhost:5000/api/courses')
    .then((response)=>{
    const allCourses =response.data;
    getCourses(allCourses);
    }).catch(error=>console.error(`Error :${error}`));
    
    
    }
  
  
  return (
        <>
            <Header/>
            <br></br>
    <br></br>
    <br></br>
    <br></br>
<div  className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center" style={{minHeight: '600px' ,backgroundImage: 'url(https://www.eleapsoftware.com/wp-content/uploads/2018/02/education-and-business-background-1.jpg)', backgroundSize: 'cover', backgroundPosition: 'center top'}}>
<span className="mask bg-gradient-default opacity-8"></span>
<h1 class="titre" style={{marginLeft:"500px",fontSize:"100",color:"white"}}>Our Courses </h1>
<div class="overlay"></div>
<div className="container-fluid d-flex align-items-center">
  <div className="row">
    <div className="col-lg-7 col-md-10">
    </div>
  </div>
</div>
</div>



<div className="container mt-5" id="about">
               <h1 className="text-center py-4">Welcome to imProve</h1>
              
              <div className="row text-center mt-5">
          
          {   courses.map( course =>(         
                <div className="col-md-3" style={{marginBottom:'20px'}}>
                 <div className="card shadow">
                  <div className="card-body">
                  <div className="py-3 text-center">

                  <div style={{minHeight: '140px' ,backgroundImage: `url(${course.image})` , backgroundSize: 'cover', backgroundPosition: 'center top'}}/>
                 </div>
                  <div className="card-body">
                    <h4 className="card-title">{course.category}  : {course.title}</h4>
                    <p className="card-text">{course.description} </p>
                    <label>Price:</label>
                    <p className="card-text">{course.price} </p>
                    </div>
                  </div>
  <Link to={`/detailcourse/${course._id}`}> <Button className="btn bg-gradient-primary"> More details</Button></Link>
                </div>
                </div>
           ) )}
              </div>
            </div>
       
<Footer/>


        </>
    )
}

