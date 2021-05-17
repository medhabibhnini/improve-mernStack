import React, {useState, useEffect} from 'react'
import Header from "../../components/header/Header"
import Footer from "../../components/footer/Footer"
import { Button } from 'react-bootstrap';
import StripeCheckoutButton from '../../components/stripe-button/stripe.button.component';

import image from "./soft.jpg"
import {useParams, useHistory} from 'react-router-dom'
import axios from 'axios'

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
    const totalPrice = events.price;
    const redirLink = events.link;
return(

<>



<Header/>
<div class="page-content bg-white">
        <div class="page-banner ovbl-dark" style={{backgroundImage:"url(assets/images/banner/banner2.jpg)"}}>
            <div class="container">
                <div class="page-banner-entry">
                    <h1 class="text-white">Events Details</h1>
				 </div>
            </div>
        </div>
		<div class="breadcrumb-row">
			<div class="container">
				<ul class="list-inline">
					<li><a href="#">Home</a></li>
					<li>Events Details</li>
				</ul>
			</div>
		</div>
	
		<div class="content-block">
            
			<div class="section-area section-sp1">
                <div class="container">

					 <div class="row d-flex flex-row-reverse">
						<div class="col-lg-3 col-md-4 col-sm-12 m-b30">
							<div class="course-detail-bx">
								<div class="course-price">
									<del>{events.price+events.price*0.5}</del>
									<h4 class="price">${events.price}</h4>
								</div>	
								<div class="course-buy-now text-center">
                <StripeCheckoutButton price={totalPrice} style={{marginLeft:'40%'}}/>
								</div>
								<div class="teacher-bx">
									<div class="teacher-info">
										<div class="teacher-thumb">
											<img src="assets/images/testimonials/pic1.jpg" alt=""/>
										</div>
										<div class="teacher-name">
											<h5>{events.intructor}</h5>
											
										</div>
									</div>
								</div>
								<div class="cours-more-info">
									<div class="review">
										<span>3 Review</span>
										<ul class="cours-star">
											<li class="active"><i class="fa fa-star"></i></li>
											<li class="active"><i class="fa fa-star"></i></li>
											<li class="active"><i class="fa fa-star"></i></li>
											<li><i class="fa fa-star"></i></li>
											<li><i class="fa fa-star"></i></li>
										</ul>
									</div>
									<div class="price categories">
										<span>Categories</span>
										<h5 class="text-primary">{events.category}</h5>
									</div>
								</div>
								<div class="course-info-list scroll-page">
									<ul class="navbar">
										<li><a class="nav-link" href="#overview"><i class="ti-zip"></i>Overview</a></li>
										<li><a class="nav-link" href="#curriculum"><i class="ti-bookmark-alt"></i>Curriculum</a></li>
										<li><a class="nav-link" href="#instructor"><i class="ti-user"></i>Instructor</a></li>
										<li><a class="nav-link" href="#reviews"><i class="ti-comments"></i>Reviews</a></li>
									</ul>
								</div>
							</div>
						</div>
					
						<div class="col-lg-9 col-md-8 col-sm-12">
							<div class="courses-post">
								<div class="ttr-post-media media-effect">
									<a href="#"><img src={events.avatar} alt=""/></a>
								</div>
								<div class="ttr-post-info">
									<div class="ttr-post-title ">
										<h2 class="post-title">{events.title}</h2>
									</div>
									<div class="ttr-post-text">
										<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
									</div>
								</div>
							</div>
							<div class="courese-overview" id="overview">
								<h4>Overview</h4>
								<div class="row">
									<div class="col-md-12 col-lg-4">
										<ul class="course-features">
											<li><i class="ti-book"></i> <span class="label">Place</span> <span class="value">{events.etatevent}</span></li>
											<li><i class="ti-help-alt"></i> <span class="label">Quizzes</span> <span class="value">1</span></li>
											<li><i class="ti-smallcap"></i> <span class="label">Language</span> <span class="value">English</span></li>
											<li><i class="ti-check-box"></i> <span class="label">Assessments</span> <span class="value">Yes</span></li>
										</ul>
									</div>
									<div class="col-md-12 col-lg-8">
										<h5 class="m-b5">Course Description</h5>
										<p>{events.description}</p>
										<h5 class="m-b5">Certification</h5>
										<p>Certification is the formal attestation or confirmation of certain characteristics of an object, person, or organization. This confirmation is often, but not always, provided by some form of external review, education, assessment, or audit. Accreditation is a specific organization's process of certification. According to the U.S. National Council on Measurement in Education, a certification test is a credentialing test used to determine whether individuals are knowledgeable enough in a given occupational area to be labeled "competent to practice" in that area.
                      So take your chance and enroll to this course
                    </p>

									</div>
								</div>
							</div>
		
							<div class="" id="instructor">
								<h4>Instructor</h4>
								
								<div class="instructor-bx">
									<div class="instructor-author">
										<img src="assets/images/testimonials/pic2.jpg" alt=""/>
									</div>
									<div class="instructor-info">
                  <h6>{events.instructor} </h6>
										<span>{events.instructor}</span>
										<ul class="list-inline m-tb10">
											<li><a href="#" class="btn sharp-sm facebook"><i class="fa fa-facebook"></i></a></li>
											<li><a href="#" class="btn sharp-sm twitter"><i class="fa fa-twitter"></i></a></li>
											<li><a href="#" class="btn sharp-sm linkedin"><i class="fa fa-linkedin"></i></a></li>
											<li><a href="#" class="btn sharp-sm google-plus"><i class="fa fa-google-plus"></i></a></li>
										</ul>
										<p class="m-b0">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries</p>
									</div>
								</div>
							</div>
					
							
						</div>
						
					</div>
				</div>
            </div>
        </div>
</div>
<Footer/>

</>





)

}