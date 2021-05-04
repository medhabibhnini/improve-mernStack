import React, {useState, useEffect} from 'react'
import Header from "../../components/header/Header"
import Footer from "../../components/footer/Footer"
import { Button } from 'react-bootstrap';

import image from "./soft.jpg"
import {useParams, useHistory} from 'react-router-dom'
import axios from 'axios'
import "../../components/body/home/home.css"

export default function DetailEvent()
{
  const {id} = useParams()
  const history = useHistory()
  const [events,getEvents] =useState([]);
  const getAllEvents =()=>{
    axios.get(`http://localhost:5000/event/getevent/${id}`)
    .then((response)=>{
    const allEvents =response.data;
    getEvents(allEvents)
  
    
    }).catch(error=>console.error(`Error :${error}`));
    
    
    }



useEffect(()=>{
    getAllEvents() },[])
return(

<>



<Header/>
<br></br>
    <br></br>
    <br></br>
    <br></br>
  
<div  className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center" style={{minHeight: '600px' ,backgroundImage: 'url(https://www.eleapsoftware.com/wp-content/uploads/2018/02/education-and-business-background-1.jpg)', backgroundSize: 'cover', backgroundPosition: 'center top'}}>
<span className="mask bg-gradient-default opacity-8"></span>
<h1 class="titre" style={{marginLeft:"500px",fontSize:"100",color:"white"}}>Events </h1>
<div class="overlay"></div>
<div className="container-fluid d-flex align-items-center">
  <div className="row">
    <div className="col-lg-7 col-md-10">
    </div>
  </div>
</div>
</div>


<div class="card mb-3" style={{marginTop:"20px", marginLeft:"50px",marginRight:"50px",backgrounColor:"blue"}}>
  <img class="card-img-top" src={events.avatar} alt="Card image cap" style={{ marginLeft:"300px",height:"400px" ,width:"800px"}}/>
  <div class="card-body" style={{backgrounColor:"black"}}>
  <h2 class="card-title" style={{marginLeft:'30%',marginBottom:'0%',fontFamily:'Georgia, serif',fontStyle:'oblique',fontSize: '40px'}} > Title :  {events.title}</h2>

    <h5 class="card-title"  style={{marginLeft:'30%',marginBottom:'0%',fontFamily:'Georgia, serif',fontSize: '30px'}}>{events.type}</h5>
    <p class="card-text"  style={{marginLeft:'30%',marginBottom:'0%',fontFamily:'Georgia, serif',fontStyle:'oblique',fontSize: '15px'}}>{events.description}</p>
    

    <Button className="btn btn-green" style={{marginLeft:"20%", marginTop:"20px"}}>Participation</Button>
    <Button className="btn btn-danger" style={{marginLeft:"40%", marginTop:"0px"}}>Cancel participation </Button>

    <p class="card-text"><small class="text-muted"></small></p>
  </div>
</div>



<Footer/>

</>





)

}