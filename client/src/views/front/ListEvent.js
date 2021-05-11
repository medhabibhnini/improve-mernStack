import React,{useState, useEffect} from 'react'
import Header from "../../components/header/Header"
import Footer from "../../components/footer/Footer"
import axios from 'axios'
import { Button } from 'react-bootstrap';
import Moment from 'react-moment';

import {Link} from 'react-router-dom'
import { event } from 'jquery';

export default function ListEvent  (){
  const [events,getEvents] =useState([]);
 
  useEffect(()=>{
    getAllEvents();},[]);
    const getAllEvents =()=>{
    axios.get('/event/events')
    .then((response)=>{
    const allEvents =response.data;
    getEvents(allEvents);
    }).catch(error=>console.error(`Error :${error}`));
    
    
    }
  
  
  return (
        <>
            <Header/>
         
			<div class="page-banner ovbl-dark" style={{backgroundImage:"url(assets/images/banner/banner3.jpg)"}}>

<div class="container">
	<div class="page-banner-entry">
		<h1 class="text-white">Our Events</h1>
	 </div>
</div>

</div>
<div class="section-area section-sp1">
	<div class="container">
		 <div class="row">
			<div class="col-lg-3 col-md-4 col-sm-12 m-b30">
				<div class="widget courses-search-bx placeani">
					<div class="form-group">
						<div class="input-group">
							<label>Search Courses</label>
							<input name="dzName" type="text" required class="form-control"/>
						</div>
					</div>
				</div>
				<div class="widget widget_archive">
					<h5 class="widget-title style-1">All Courses</h5>
					<ul>
						<li class="active"><a href="#">General</a></li>
						<li><a href="#">IT & Software</a></li>
						<li><a href="#">Photography</a></li>
						<li><a href="#">Programming Language</a></li>
						<li><a href="#">Technology</a></li>
					</ul>
				</div>
				<div class="widget">
					<a href="#"><img src="assets/images/adv/adv.jpg" alt=""/></a>
				</div>
				<div class="widget recent-posts-entry widget-courses">
					<h5 class="widget-title style-1">Recent Courses</h5>
					<div class="widget-post-bx">
						<div class="widget-post clearfix">
							<div class="ttr-post-media"> <img src="assets/images/blog/recent-blog/pic1.jpg" width="200" height="143" alt=""/> </div>
							<div class="ttr-post-info">
								<div class="ttr-post-header">
									<h6 class="post-title"><a href="#">Introduction EduChamp</a></h6>
								</div>
								<div class="ttr-post-meta">
									<ul>
										<li class="price">
											<del>$190</del>
											<h5>$120</h5>
										</li>
										<li class="review">03 Review</li>
									</ul>
								</div>
							</div>
						</div>
						<div class="widget-post clearfix">
							<div class="ttr-post-media"> <img src="assets/images/blog/recent-blog/pic3.jpg" width="200" height="160" alt=""/> </div>
							<div class="ttr-post-info">
								<div class="ttr-post-header">
									<h6 class="post-title"><a href="#">English For Tommorow</a></h6>
								</div>
								<div class="ttr-post-meta">
									<ul>
										<li class="price">
											<h5 class="free">Free</h5>
										</li>
										<li class="review">07 Review</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

<div class="col-lg-9 col-md-8 col-sm-12">


<div class="row">
{ events.map( event =>(   

<div class="col-md-6 col-lg-4 col-sm-6 m-b30">
  <div class="cours-bx">
	<div class="action-box">
	<div class="event-time" position="fixed">

	  <img src={event.avatar} alt="event.png"/>

	<div class="event-date"><Moment format="DD" >{event.date}</Moment></div>
	<div class="event-month"><Moment format="MM/YYYY" >{event.date}</Moment></div>
   <Link  to={`/detailevent/${event._id}`}>
	  <button class="btn btn-red"  style={{color:'white'}}> event detail</button>
	  </Link>
	</div>
	</div>

	<div class="info-bx text-center">
	  <h5><a href="#">{event.title} </a></h5>
	  <span>{event.type} </span>
	</div>
	<div class="cours-more-info">
	  <div class="review">
		<h6>{event.state}</h6>
		<span>{event.etatevent}</span>
	  </div>
	  <div class="price">
		<del>{event.price+event.price*0.5} </del>
		<h5>{event.price}$</h5>
	  </div>
	</div>
  </div>
  
</div> 
))}
</div>
</div>
</div>
</div>
</div>
     
<Footer/>


</>
)
}
