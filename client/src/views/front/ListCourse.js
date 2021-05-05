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
    
     
               <div class="page-banner ovbl-dark" style={{backgroundImage:"url(assets/images/banner/banner3.jpg)"}}>

            <div class="container">
                <div class="page-banner-entry">
                    <h1 class="text-white">Our Courses</h1>
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
          { courses.map( course =>(   

            <div class="col-md-6 col-lg-4 col-sm-6 m-b30">
              <div class="cours-bx">
                <div class="action-box">
                  <img src={course.image} alt=""/>
               <Link  to={`/detailcourse/${course._id}`}>
                  <button class="btn btn-red"  style={{color:'white'}}> Course detail</button>
                  </Link>
                </div>
                <div class="info-bx text-center">
                  <h5><a href="#">{course.title} </a></h5>
                  <span>{course.type} </span>
                </div>
                <div class="cours-more-info">
                  <div class="review">
                    <h5>{course.category}</h5>
                  </div>
                  <div class="price">
                    <del>{course.price+course.price*0.5} </del>
                    <h5>{course.price}$</h5>
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
      {/*

              
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
            
          */}       
<Footer/>


        </>
    )
}

